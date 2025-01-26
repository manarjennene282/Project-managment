<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\NatureRelationResource;
use App\Models\NatureRelation;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\NatureRelationRequest;

class NatureRelationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $naturerela = NatureRelation::all();
        return response()->json([
            'success' => true,
            'data' => $naturerela,
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
    public function store(NatureRelationRequest $request)
    {

        $naturerelation = NatureRelation::create([
            'id_natureRel' => $request->input('id_natureRel'),  // Ensure id_prio is provided
            'libelle' => $request->input('libelle'),  // Ensure this is included in the request
        ]);
        
        return response()->json(new NatureRelationResource($naturerelation), 201); // Retourne la ressource créée en JSON
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
    public function update(Request $request, NatureRelation $naturerelation)
    {
    
        try {
            // Vérification que l'objet existe
            if (!$naturerelation) {
                return response()->json([
                    'success' => false,
                    'message' => 'naturerelation introuvable'
                ], 404);
            }
    
           
    
            // Validation des données
            $rules = [
                'id_natureRel' => 'required|string',
                'libelle' => 'required|string|max:255'
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
            $naturerelation->update([
                'id_natureRel' => $request->input('id_natureRel'),
                'libelle' => $request->input('libelle')
            ]);
    
            // Rafraîchir les données depuis la base
            $naturerelation->refresh();    
            return response()->json([
                'success' => true,
                'data' => $naturerelation,
                'message' => 'Mise à jour effectuée avec succès'
            ], 200);
    
        } catch (Exception $e) {
            Log::error('Erreur critique', [
                'message' => $e->getMessage(),
                
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
        $naturerelation = NatureRelation::find($id);
    
        // If the Priorite does not exist, return a 404 response
        if (!$naturerelation) {
            return response()->json(['message' => 'naturestruct not found'], 404);
        }
    
        // Delete the Priorite
        $naturerelation->delete();
    
        // Return a success response
        return response()->json(['message' => 'naturerelation deleted successfully'], 200);
    }
}
