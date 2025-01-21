<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller; // Importation correcte
use App\Models\TypeProjet;
use Validator;


class TypeProjetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $typeprojets = TypeProjet::all();
        return response()->json([
            'success' => true,
            'data' => $typeprojets,
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
                'libelle.required' => 'Le libelle est requis.',
                'description.required' => 'La description est requise.',
               
            ];

            // Validation des champs d'entrée
            $validator = Validator::make($inputs, [
                'libelle' => 'required',  // Validation pour 'nom'
                'description' => 'required',      // Validation pour 'datedebut'
                
            ], $messages);

            // Si la validation échoue
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first(),
                ], 200);
            } else {
                // Création d'un nouveau projet
                $project = TypeProjet::create([
                    'libelle' => $request->libelle,
                    'description' => $request->description,
                    
                ]);

                // Retourner une réponse JSON avec les données du projet
                return response()->json([
                    'success' => true,
                    'data' => $project,
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
    public function update(Request $request, TypeProjet $typeprojet)
    {
        $inputs = $request->all();
    
        try {
            // Messages d'erreur personnalisés pour chaque champ
            $messages = [
                'libelle.required' => 'Le libellé est requis.',
                'description.required' => 'La description est requise.',
            ];
    
            // Validation des champs d'entrée
            $validator = Validator::make($inputs, [
                'libelle' => 'required',  
                'description' => 'required',      
            ], $messages);
    
            // Si la validation échoue
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first(),
                ], 200);
            } 
    
            // Mettre à jour le type de projet avec les nouvelles données
            $typeprojet->update([
                'libelle' => $request->libelle,
                'description' => $request->description, // Correction ici
            ]);
    
            // Retourner une réponse JSON avec les données mises à jour
            return response()->json([
                'success' => true,
                'data' => $typeprojet,
            ], 200);
    
        } catch (Exception $e) {
            // Gérer les exceptions
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
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
            // Trouver le projet par son ID
            $typeprojet = TypeProjet::findOrFail($id);
    
            // Supprimer le projet
            $typeprojet->delete();
    
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
