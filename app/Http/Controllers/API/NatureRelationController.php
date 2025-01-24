<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\NatureRelationResource;
use App\Models\NatureRelation;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\NatureRelationRequest;

class NatureRelationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $naturerelation = NatureRelation::all(); 
        $naturerelationressource = NatureRelationResource::collection($naturerelation); // Transforme les rôles en ressources
    
        return response()->json($naturerelationressource, 200); 
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
    public function update(NatureRelationRequest $request, $id)
    {
        $naturerelation = NatureRelation::findOrFail($id); 
        $naturerelation->update([
            'id_natureRel' => $request->input('id_natureRel'),
            'libelle' => $request->input('libelle'),
        ]);
    
        return response()->json(new NatureRelationResource($naturerelation), 200);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $naturerelation = NatureRelation::findOrFail($id); // Find the role by ID
        $naturerelation->delete(); // Delete the role
        return response()->json(['message' => 'naturerelation deleted successfully'], 200);
    }
}
