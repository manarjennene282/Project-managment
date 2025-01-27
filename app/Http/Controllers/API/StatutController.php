<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\StatutResource;
use App\Models\Statut;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StatutRequest;
use Illuminate\Support\Facades\Validator;


class StatutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $statut = Statut::all();
        return response()->json([
            'success' => true,
            'data' => $statut,
        ],200);
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
    public function store(StatutRequest $request)
    {

        $statut = Statut::create([
            'id_statut' => $request->input('id_statut'),  // Ensure id_prio is provided
            'libelle' => $request->input('libelle'),  // Ensure this is included in the request
        ]);
        
        return response()->json(new StatutResource($statut), 201); // Retourne la ressource créée en JSON
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Statut $statut)
    {
    
        try {
            // Vérification que l'objet existe
            if (!$statut) {
                return response()->json([
                    'success' => false,
                    'message' => 'statut introuvable'
                ], 404);
            }
    
           
    
            // Validation des données
            $rules = [
                'id_statut' => 'required|string',
                'libelle' => 'required|string|'
            ];
    
            $messages = [
                'required' => 'Le champ :attribute est obligatoire',
                'string' => 'Le champ :attribute doit être une chaîne de caractères'
            ];
    
            $validator = Validator::make($request->all(), $rules, $messages);
    
            if ($validator->fails()) {
                Log::warning('Échec validation', [
                    'errors' => $validator->errors(),
                    'data' => $request->all()
                ]);
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }
    
            // Mise à jour de l'entité
            $statut->update([
                'id_statut' => $request->input('id_statut'),
                'libelle' => $request->input('libelle')
            ]);
    
            // Rafraîchir les données depuis la base
            $statut->refresh();    
            return response()->json([
                'success' => true,
                'data' => $statut,
                'message' => 'Mise à jour effectuée avec succès'
            ], 200);
    
        } catch (Exception $e) {
            Log::error('Erreur critique', [
                'message' => $e->getMessage(),
                'fichier' => $e->getFile(),
                'ligne' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Erreur interne du serveur'
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
    
        // Find the Priorite by ID
        $statut = Statut::find($id);
    
        // If the Priorite does not exist, return a 404 response
        if (!$statut) {
            return response()->json(['message' => 'statut not found'], 404);
        }
    
        // Delete the Priorite
        $statut->delete();
    
        // Return a success response
        return response()->json(['message' => 'statut deleted successfully'], 200);
    }
}
