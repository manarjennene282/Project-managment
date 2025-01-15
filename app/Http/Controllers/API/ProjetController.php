<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Projet;
use App\Http\Controllers\Controller; // Importation correcte



use Illuminate\Support\Facades\Validator;

class ProjetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = Projet::all();
        return response()->json([
            'success' => true,
            'data' => $projects,
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
            // Messages d'erreur personnalisés pour chaque champ
            $messages = [
                'nom.required' => 'Le nom du projet est requis.',
                'datedebut.required' => 'La date de début est requise.',
                'departement.required' => 'Le département est requis.',
                'datefinestime.required' => 'La date de fin estimée est requise.',
                'datefinreelle.required' => 'La date de fin réelle est requise.',
            ];

            // Validation des champs d'entrée
            $validator = Validator::make($inputs, [
                'nom' => 'required|string|max:255',  // Validation pour 'nom'
                'datedebut' => 'required',      // Validation pour 'datedebut'
                'departement' => 'required|string|max:255', // Validation pour 'departement'
                'datefinestime' => 'required',  // Validation pour 'datefinestime'
                'datefinreelle' => 'required',  // Validation pour 'datefinreelle'
            ], $messages);

            // Si la validation échoue
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first(),
                ], 200);
            } else {
                // Création d'un nouveau projet
                $project = Projet::create([
                    'user_id' => auth()->user()->id,  // Assurez-vous que l'utilisateur est connecté
                    'nom' => $request->nom,
                    'datedebut' => $request->datedebut,
                    'departement' => $request->departement,
                    'datefinestime' => $request->datefinestime,
                    'datefinreelle' => $request->datefinreelle,
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
    public function update(Request $request, Projet $project)
    {
        $inputs = $request->all();
    
        try {
            // Messages d'erreur personnalisés pour chaque champ
            $messages = [
                'nom.required' => 'Le nom du projet est requis.',
                'datedebut.required' => 'La date de début est requise.',
                'departement.required' => 'Le département est requis.',
                'datefinestime.required' => 'La date de fin estimée est requise.',
                'datefinreelle.required' => 'La date de fin réelle est requise.',
            ];
    
            // Validation des champs d'entrée
            $validator = Validator::make($inputs, [
                'nom' => 'required|string|max:255',  // Validation pour 'nom'
                'datedebut' => 'required',      // Validation pour 'datedebut'
                'departement' => 'required|string|max:255', // Validation pour 'departement'
                'datefinestime' => 'required',  // Validation pour 'datefinestime'
                'datefinreelle' => 'required',  // Validation pour 'datefinreelle'
            ], $messages);
    
            // Si la validation échoue
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first(),
                ], 200);
            } else {
                // Mettre à jour le projet avec les nouvelles données
                $project->update([
                    'nom' => $request->nom,
                    'datedebut' => $request->datedebut,
                    'departement' => $request->departement,
                    'datefinestime' => $request->datefinestime,
                    'datefinreelle' => $request->datefinreelle,
                ]);
    
                // Retourner une réponse JSON avec les données du projet mis à jour
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
            $project = Projet::findOrFail($id);
    
            // Supprimer le projet
            $project->delete();
    
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
