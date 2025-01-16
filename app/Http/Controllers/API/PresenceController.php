<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Presence;
use App\Http\Controllers\Controller; // Importation correcte

use Illuminate\Support\Facades\Validator;


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
        'data.*.date' => 'required',
        'data.*.presence_matin' => 'required|boolean',
        'data.*.presence_apresmidi' => 'required|boolean',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $validatedData = $validator->getData(); // This retrieves the validated data.

    $userId = auth()->id();

    foreach ($validatedData['data'] as $presenceData) {
        Presence::updateOrCreate(
            ['user_id' => $userId, 'date' => $presenceData['date']],
            [
                'presence_matin' => $presenceData['presence_matin'],
                'presence_apresmidi' => $presenceData['presence_apresmidi']
            ]
        );
    }

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
    
            // Calcul des heures d'absence
            $totalHoursAbsent = 0;  // Initialiser le total des heures d'absence
            $dailyHours = [];
    
            foreach ($presences as $presence) {
                // Récupérer les heures travaillées déjà enregistrées
                $dailyHoursForDay = $presence->heurestravaillees;
    
                // Calcul des heures d'absence (40 heures - heures travaillées)
                $hoursAbsentForDay = 40 - $dailyHoursForDay;
                $totalHoursAbsent += $hoursAbsentForDay;
    
                // Mettre à jour la base de données avec les heures d'absence
                $presence->update(['heuresabsence' => $hoursAbsentForDay]);
    
                $dailyHours[] = [
                    'date' => $presence->date,
                    'hours_absent' => $hoursAbsentForDay,
                ];
            }
    
            return response()->json([
                'message' => 'Heures d\'absence calculées et enregistrées avec succès',
                'total_hours_absent' => $totalHoursAbsent,
                'daily_hours' => $dailyHours,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors du calcul ou de l\'enregistrement des heures d\'absence',
                'error' => $e->getMessage(),
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
