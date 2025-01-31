<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\RessourceMaterielRequest;
use App\Models\RessourceMateriel;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\ResourceRequest;




class RessourceMaterielController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $data = RessourceMateriel::all();
        return response()->json([$data,], 200);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        // Définir les règles de validation
        $rules = [
            'id_ressouM' => 'required|string',
            'liblle' => 'required|string',
            'ID_Machine' => 'required|string',
            'Type_equip' => 'required|exists:typeequipements,id_typeequipement',
            'Date_acquisition' => 'required|date',
            'Date_mise_en_service' => 'required|date',
            'Etat' => 'required|string', // Utilisez "string" pour l'état, pas "email"
            'Notes' => 'required|string',
        ];

        // Appliquer la validation avec le Facade Validator
        $validator = Validator::make($request->all(), $rules);

        // Si la validation échoue, renvoyer une réponse avec les erreurs
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Les données envoyées ne sont pas valides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Si la validation réussit, procéder à la création de la ressource matérielle
            $validatedData = $validator->validated(); // Récupère les données validées

            $ressourceMateriel = RessourceMateriel::create($validatedData);

            return response()->json([
                'success' => true,
                'data' => $ressourceMateriel,
                'message' => 'Ressource matériel ajoutée avec succès.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'ajout de la Ressource matériel.',
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
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RessourceMateriel  $rh
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RessourceMateriel $rh)
    {
        try {
            // Trouver la Ressource materiel à mettre à jour
            $RessourceMateriel = RessourceMateriel::find($request->id);

            // Vérifier si la ressource existe
            if (!$RessourceMateriel) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ressource materiel non trouvée.',
                ], 404);
            }

            // Mettre à jour les données de la Ressource materiel
            $RessourceMateriel->update($request->all());

            return response()->json([
                'success' => true,
                'data' => $RessourceMateriel,
                'message' => 'Ressource materiel mise à jour avec succès.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de la mise à jour de la Ressource materiel.',
                'error' => $e->getMessage(),
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
            $RessourceMateriel = RessourceMateriel::find($id);
            $RessourceMateriel->delete();

            return response()->json([
                'success' => true,
                'message' => 'Ressource materiel supprimée avec succès.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de la suppression de la Ressource materiel.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
