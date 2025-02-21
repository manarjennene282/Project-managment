<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Presence;
use App\Http\Controllers\Controller; // Importation correcte

use Illuminate\Support\Facades\Validator;

use Carbon\Carbon;

class PresenceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getPresences()
    {
        try {
            // Récupérer l'utilisateur connecté
            $userId = auth()->id();
    
            // Récupérer les présences de l'utilisateur
            $presences = Presence::where('user_id', $userId)->get();
    
            return response()->json([
                'message' => 'Présences récupérées avec succès',
                'data' => $presences
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des présences',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'data' => 'required|array',
        'data.*.date' => 'required|date',
        'data.*.presence_matin' => 'required|boolean',
        'data.*.presence_apresmidi' => 'required|boolean',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $userId = auth()->id();

    if (is_null($userId)) {
        return response()->json(['error' => 'Utilisateur non authentifié'], 401);
    }

    $validatedData = $request->all(); // Corrigé pour éviter l'erreur

    $dates = []; // Liste des dates pour recalculer les absences

    foreach ($validatedData['data'] as $presenceData) {
        // Calcul des heures travaillées
        $heuresTravaillees = ($presenceData['presence_matin'] ? 4 : 0) + ($presenceData['presence_apresmidi'] ? 4 : 0);

        // Enregistrer ou mettre à jour les données de présence
        Presence::updateOrCreate(
            ['user_id' => $userId, 'date' => $presenceData['date']],
            [
                'presence_matin' => $presenceData['presence_matin'],
                'presence_apresmidi' => $presenceData['presence_apresmidi'],
                'heurestravaillees' => $heuresTravaillees
            ]
        );

        $dates[] = $presenceData['date']; // Stocker les dates pour le recalcul des absences
    }

    // Calculer les heures d'absence pour les dates enregistrées
    $this->calculateAbsenceHours(new Request(['dates' => $dates]));

    return response()->json(['message' => 'Présences enregistrées avec succès'], 200);
}

    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }
    public function calculateAndSaveWorkHours(Request $request)
    {
        try {
            // Validation des données de la requête
            $validator = Validator::make($request->all(), [
                'dates' => 'required|array',
                'dates.*' => 'date', // Chaque élément doit être une date valide
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
    
            $userId = auth()->id(); // ID de l'utilisateur connecté
            $selectedDates = $request->dates; // Dates sélectionnées
    
            // Récupérer les présences correspondant aux dates sélectionnées
            $presences = Presence::where('user_id', $userId)
                ->whereIn('date', $selectedDates)
                ->get();
    
            // Calcul des heures travaillées et mise à jour de la base
            $totalHoursWorked = 0;
            $dailyHours = [];
    
            foreach ($presences as $presence) {
                $dailyHoursForDay = 0;
    
                if ($presence->presence_matin) {
                    $dailyHoursForDay += 4; // 4 heures pour le matin
                }
                if ($presence->presence_apresmidi) {
                    $dailyHoursForDay += 4; // 4 heures pour l'après-midi
                }
    
                $totalHoursWorked += $dailyHoursForDay;
    
                // Mettre à jour la colonne heurestravaillees dans la base de données
                $presence->update(['heurestravaillees' => $dailyHoursForDay]);
    
                $dailyHours[] = [
                    'date' => $presence->date,
                    'hours' => $dailyHoursForDay,
                ];
            }
    
            return response()->json([
                'message' => 'Heures de travail calculées et enregistrées avec succès',
                'total_hours_worked' => $totalHoursWorked,
                'daily_hours' => $dailyHours,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors du calcul ou de l\'enregistrement des heures de travail',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function calculateAbsenceHours(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'dates' => 'required|array',
                'dates.*' => 'date',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
    
            $userId = auth()->id();
            $selectedDates = $request->dates;
    
            $presences = Presence::where('user_id', $userId)
                ->whereIn('date', $selectedDates)
                ->get();
    
            $totalHoursAbsent = 0;
            $dailyAbsences = [];
    
            foreach ($presences as $presence) {
                $dailyHoursForDay = $presence->heurestravaillees;
                $hoursAbsentForDay = 8 - $dailyHoursForDay; // Chaque jour = 8 heures max
    
                $totalHoursAbsent += $hoursAbsentForDay;
    
                $presence->update(['heuresabsence' => $hoursAbsentForDay]);
    
                $dailyAbsences[] = [
                    'date' => $presence->date,
                    'hours_absent' => $hoursAbsentForDay,
                ];
            }
    
            return response()->json([
                'message' => 'Heures d\'absence calculées et enregistrées avec succès',
                'total_hours_absent' => $totalHoursAbsent,
                'daily_absences' => $dailyAbsences,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors du calcul ou de l\'enregistrement des heures d\'absence',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function calculateWeeklyWorkHours(Request $request)
    {
        try {
            // Validation des dates optionnelles
            $validator = Validator::make($request->all(), [
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date|after_or_equal:start_date',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
    
            $userId = auth()->id();
    
            $startDate = isset($request->start_date) ? $request->start_date : date('Y-m-d', strtotime('-7 days'));
            $endDate = isset($request->end_date) ? $request->end_date : date('Y-m-d');

            // Récupérer les présences de l'utilisateur sur la période
            $presences = Presence::where('user_id', $userId)
                ->whereBetween('date', [$startDate, $endDate])
                ->orderBy('date')
                ->get(['date', 'heurestravaillees']); 
    
            if ($presences->isEmpty()) {
                return response()->json([
                    'message' => 'Aucune donnée trouvée pour cette période',
                    'weekly_hours' => []
                ], 200);
            }
    
            // Regrouper les heures travaillées par semaine
            $weeklyHours = [];
    
            foreach ($presences as $presence) {
                $timestamp = strtotime($presence->date);
                $weekYear = date('o', $timestamp); // 'o' pour éviter les erreurs de semaine à cheval
                $weekNumber = date('W', $timestamp);
                $weekKey = $weekYear . '-Semaine-' . $weekNumber;
    
                // Debug : Afficher les dates et les heures correspondantes
                \Log::info("Date: {$presence->date}, Semaine: $weekKey, Heures: {$presence->heurestravaillees}");
    
                // Initialiser la semaine si elle n'existe pas encore
                if (!isset($weeklyHours[$weekKey])) {
                    $weeklyHours[$weekKey] = 0;
                }
    
                // Ajouter les heures travaillées
                $weeklyHours[$weekKey] += (float) $presence->heurestravaillees;
            }
    
            return response()->json([
                'message' => 'Heures de travail calculées par semaine',
                'weekly_hours' => $weeklyHours
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors du calcul des heures de travail par semaine',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    

        
    
    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            // Valider les données de la requête
            $validator = Validator::make($request->all(), [
                'presence_matin' => 'required|boolean',
                'presence_apresmidi' => 'required|boolean',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
    
            // Trouver l'enregistrement de présence correspondant
            $presence = Presence::find($id);
    
            if (!$presence) {
                return response()->json(['message' => 'Présence non trouvée'], 404);
            }
    
            // Vérifier si l'utilisateur connecté est autorisé à mettre à jour
            if ($presence->user_id !== auth()->id()) {
                return response()->json(['message' => 'Accès non autorisé'], 403);
            }
    
            // Mettre à jour les données de présence
            $presence->update([
                'presence_matin' => $request->presence_matin,
                'presence_apresmidi' => $request->presence_apresmidi,
            ]);
    
            return response()->json(['message' => 'Présence mise à jour avec succès', 'data' => $presence], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour de la présence',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
