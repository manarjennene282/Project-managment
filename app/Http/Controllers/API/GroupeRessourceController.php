<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\GroupeRessource;
use App\Http\Controllers\Controller;

use Validator;

class GroupeRessourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $grouperessource = GroupeRessource::all();
        return response()->json([
            'success' => true,
            'data' => $grouperessource,
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
                'id_grp.required' => 'La id_grp est requise.',
                'libelle.required' => 'Le libelle est requis.',
               
            ];

            // Validation des champs d'entrée
            $validator = Validator::make($inputs, [
                'id_grp' => 'required',  // Validation pour 'nom'
                'libelle' => 'required',      // Validation pour 'datedebut'
                
            ], $messages);

            // Si la validation échoue
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first(),
                ], 200);
            } else {
                // Création d'un nouveau projet
                $grouperessource = GroupeRessource::create([
                    'id_grp' => $request->id_grp,
                    'libelle' => $request->libelle,
                ]);

                // Retourner une réponse JSON avec les données du projet
                return response()->json([
                    'success' => true,
                    'data' => $grouperessource,
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
    public function update(Request $request, GroupeRessource $grouperessource)
    {
        $inputs = $request->all();
    
        try {
            // Messages d'erreur personnalisés pour chaque champ
            $messages = [
                'id_grp.required' => 'Le id_grp est requis.',
                'libelle.required' => 'Le libellé est requis.',
            ];
    
            // Validation des champs d'entrée
            $validator = Validator::make($inputs, [
                'id_grp' => 'required',      
                'libelle' => 'required',  
            ], $messages);
    
            // Si la validation échoue
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first(),
                ], 200);
            } 
    
            // Mettre à jour le type de projet avec les nouvelles données
            $grouperessource->update([
                'id_grp' => $request->id_grp, 
                'libelle' => $request->libelle,
            ]);
    
            // Retourner une réponse JSON avec les données mises à jour
            return response()->json([
                'success' => true,
                'data' => $grouperessource,
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
            // Trouver le grpressource par son ID
            $grpressource = GroupeRessource::findOrFail($id);
    
            // Supprimer le grpressource
            $grpressource->delete();
    
            return response()->json([
                'success' => true,
                'message' => 'Le grpressource a été supprimé avec succès.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }}
}
