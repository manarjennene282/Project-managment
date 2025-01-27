<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\RelationProjetResource;
use App\Models\RelationProjet;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\RelationProjetRequest;
use Illuminate\Support\Facades\Validator;


class RelationProjetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $relprojet = RelationProjet::all();
        return response()->json([
            'success' => true,
            'data' => $relprojet,
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
    public function store(RelationProjetRequest $request)
    {

        $relationprojet = RelationProjet::create([
            'id_RelProjet' => $request->input('id_RelProjet'),  // Ensure id_prio is provided
            'libelle' => $request->input('libelle'),  // Ensure this is included in the request
        ]);
        
        return response()->json(new RelationProjetResource($relationprojet), 201); // Retourne la ressource créée en JSON
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
        $relprojet = RelationProjet::find($id);
        
        if (!$relprojet) {
            return response()->json([
                'success' => false,
                'message' => 'RelationProjet introuvable'
            ], 404);
        }
    
        // Correct the table name and column name in the validation rule
        $validator = Validator::make($request->all(), [
            'id_RelProjet' => 'required|string|unique:relation_projets,id_RelProjet,'.$id.',id',
            'libelle' => 'required|string|max:255'
        ], [
            'required' => 'Le champ :attribute est obligatoire',
            'unique' => 'Cette valeur existe déjà'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }
    
        try {
            $relprojet->update($request->all());
            
            return response()->json([
                'success' => true,
                'data' => $relprojet,
                'message' => 'Mise à jour effectuée avec succès'
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de mise à jour: ' . $e->getMessage() // Include the error message for debugging
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
        $relationprojet = RelationProjet::findOrFail($id); // Find the role by ID
        $relationprojet->delete(); // Delete the role
        return response()->json(['message' => 'relationprojet deleted successfully'], 200);
    }
}
