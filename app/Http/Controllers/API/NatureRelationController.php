<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\NatureRelationResource;
use App\Models\NatureRelation;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\NatureRelationRequest;
use Illuminate\Support\Facades\Validator;

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
    public function update(Request $request, $id)
{
    $naturerelation = NatureRelation::find($id);
    
    if (!$naturerelation) {
        return response()->json([
            'success' => false,
            'message' => 'NatureRelation introuvable'
        ], 404);
    }

    $validator = Validator::make($request->all(), [
        'id_natureRel' => 'required|string|unique:nature_relations,id_natureRel,'.$id.',id_natureRel',
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
        $naturerelation->update($request->all());
        
        return response()->json([
            'success' => true,
            'data' => $naturerelation,
            'message' => 'Mise à jour effectuée avec succès'
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur de mise à jour'
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
