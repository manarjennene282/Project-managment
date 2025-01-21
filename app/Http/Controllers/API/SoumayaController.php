<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Soumaya;
use App\Http\Controllers\Controller;
use Validator;

class SoumayaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $souamaya = Soumaya::all();
        return response()->json([
            'success' => true,
            'data' => $souamaya,
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
    public function store(Request $request)
    {
        $inputs = $request->all();

        try {
            $messages = [
                'nom.required' => 'Le nom du projet est requis.',
                'prenom.required' => 'La date de début est requise.',
                'profession.required' => 'Le département est requis.',
                
            ];

            $validator = Validator ::make($inputs, [
                'nom' => 'required',  // Validation pour 'nom'
                'prenom' => 'required',      // Validation pour 'datedebut'
                'profession' => 'required', // Validation pour 'departement'
               
            ], $messages);

            // Si la validation échoue
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first(),
                ], 200);
            } else {
                // Création d'un nouveau projet
                $soumaya = Soumaya::create([
                    'nom' => $request->nom,
                    'prenom' => $request->prenom,
                    'profession' => $request->profession,   
                ]);

                return response()->json([
                    'success' => true,
                    'data' => $soumaya,
                ], 200);
            }
        } catch (Exception $e) {
            // Gérer les exceptions
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
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
    public function update(Request $request, Soumaya $sousou)
    {
        $inputs = $request->all();
    
        try {
            // Messages d'erreur personnalisés pour chaque champ
            $messages = [
                'nom.required' => 'Le nom du projet est requis.',
                'prenom.required' => 'La date de début est requise.',
                'profession.required' => 'Le département est requis.',               
            ];
    
            // Validation des champs d'entrée
            $validator = Validator::make($inputs, [
                'nom' => 'required',  // Validation pour 'nom'
                'prenom' => 'required',      // Validation pour 'datedebut'
                'profession' => 'required', // Validation pour 'departement'
                
            ], $messages);
    
            // Si la validation échoue
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first(),
                ], 200);
            } else {
                // Mettre à jour le projet avec les nouvelles données
                $sousou->update([
                    'nom' => $request->nom,
                    'prenom' => $request->prenom,
                    'profession' => $request->profession,
                    
                ]);
    
                // Retourner une réponse JSON avec les données du projet mis à jour
                return response()->json([
                    'success' => true,
                    'data' => $sousou,
                ], 200);
            }
        } catch (Exception $e) {
            // Gérer les exceptions
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }}


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            // Trouver le projet par son ID
            $sousou = Soumaya::findOrFail($id);
    
            // Supprimer le projet
            $sousou->delete();
    
            return response()->json([
                'success' => true,
                'message' => 'Le projet a été supprimé avec succès.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }}
}
