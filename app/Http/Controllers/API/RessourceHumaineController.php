<?php

namespace App\Http\Controllers\API;

use App\Models\RessourceHumaine;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\ResourceRequest;

use Illuminate\Support\Facades\Log;

class RessourceHumaineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
{
    try {
        // Récupérer toutes les ressources humaines
        $ressourcesHumaines = RessourceHumaine::with('grouperessource')->get();

        return response()->json([
            'success' => true,
            'data' => $ressourcesHumaines,
            'message' => 'Liste des ressources humaines récupérée avec succès.',
        ], 200);
    } catch (\Exception $e) {
        // Gérer les erreurs et retourner une réponse appropriée
        return response()->json([
            'success' => false,
            'message' => 'Une erreur est survenue lors de la récupération des ressources humaines.',
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
    public function store(ResourceRequest $request)
    {
        try {
            $validatedData = $request->all();
    
            $ressourceHumaine = RessourceHumaine::create($validatedData);
    
            return response()->json([
                'success' => true,
                'data' => $ressourceHumaine,
                'message' => 'Ressource humaine ajoutée avec succès.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'ajout de la ressource humaine.',
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
 * @param  \App\Models\RessourceHumaine  $rh
 * @return \Illuminate\Http\Response
 */
public function update(Request $request, RessourceHumaine $rh)
{
    try {
        // Trouver la ressource humaine à mettre à jour
        $ressourceHumaine = RessourceHumaine::find($request->id);

        // Vérifier si la ressource existe
        if (!$ressourceHumaine) {
            return response()->json([
                'success' => false,
                'message' => 'Ressource humaine non trouvée.',
            ], 404);
        }

        // Mettre à jour les données de la ressource humaine
        $ressourceHumaine->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $ressourceHumaine,
            'message' => 'Ressource humaine mise à jour avec succès.',
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Une erreur est survenue lors de la mise à jour de la ressource humaine.',
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
             $ressourceHumaine = RessourceHumaine::find($id);
             $ressourceHumaine->delete();
 
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
