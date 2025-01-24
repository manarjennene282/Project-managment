<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\NatureStructureResource;
use App\Models\NatureStructure;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\NatureStructureRequest;

class NatureStructureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $naturestrucressource = NatureStructure::all(); // Récupère tous les rôles
        $naturestrucressource = NatureStructureResource::collection($naturestrucressource); // Transforme les rôles en ressources
    
        return response()->json($naturestrucressource, 200); // Retourne la réponse en JSON
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
    public function store(NatureStructureRequest $request)
    {

        $naturestructure = NatureStructure::create([
            'id_natureStruct' => $request->input('id_natureStruct'),  // Ensure id_prio is provided
            'libelle' => $request->input('libelle'),  // Ensure this is included in the request
        ]);
        
        return response()->json(new NatureStructureResource($naturestructure), 201); // Retourne la ressource créée en JSON
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
    public function update(NatureStructureRequest $request, $id)
    {
        $naturestruc = NatureStructure::findOrFail($id); // Find the record by ID
        $naturestruc->update([
            'id_natureStruct' => $request->input('id_natureStruct'),
            'libelle' => $request->input('libelle'),
        ]);
    
        // Wrap the resource in a JSON response
        return response()->json(new NatureStructureResource($naturestruc), 200);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $naturestructure = NatureStructure::findOrFail($id); // Find the role by ID
        $naturestructure->delete(); // Delete the role
        return response()->json(['message' => 'statut deleted successfully'], 200);
    }
}
