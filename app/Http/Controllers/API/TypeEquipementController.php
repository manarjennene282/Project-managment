<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;


use App\Models\Typeequipement;
use App\Http\Controllers\Controller;
use App\Http\Requests\TypeEquipementRequest;
use Illuminate\Support\Facades\Validator;

class TypeEquipementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            // Récupérer toutes les ressources humaines sans tri
            $typeequipements = Typeequipement::all();
    
            return response()->json([
                'success' => true,
                'data' => $typeequipements,
                'message' => 'Les types d\'équipements ont été récupérés avec succès.',
            ], 200);
        } catch (\Exception $e) {
            // Gérer les erreurs et retourner une réponse appropriée
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de la récupération des types d\'équipements.',
                'error' => $e->getMessage(),
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
    public function store(TypeEquipementRequest $request)
    {
        try {
            $validatedData = $request->all();
    
            $typeequipements = Typeequipement::create($validatedData);
    
            return response()->json([
                'success' => true,
                'data' => $typeequipements,
                'message' => 'typeequipements ajoutée avec succès.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'ajout de typeequipements.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
    public function update(Request $request, $id)
    {
        $typeequip = Typeequipement::find($id);
        
        if (!$typeequip) {
            return response()->json([
                'success' => false,
                'message' => 'Typeequipement introuvable'
            ], 404);
        }
    
        // Validation uniquement du champ libelle
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string|max:255'
        ], [
            'required' => 'Le champ :attribute est obligatoire',
            'string' => 'Le champ :attribute doit être une chaîne de caractères',
            'max' => 'Le champ :attribute ne doit pas dépasser :max caractères',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }
    
        try {
            // Mettre à jour uniquement le libelle
            $typeequip->update($request->only('libelle'));
            
            return response()->json([
                'success' => true,
                'data' => $typeequip,
                'message' => 'Mise à jour effectuée avec succès'
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de mise à jour',
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
        try {
            $typeequipement = Typeequipement::find($id);
            $typeequipement->delete();

            return response()->json([
                'success' => true,
                'message' => 'Ressource humaine supprimée avec succès.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de la suppression de la ressource humaine.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
