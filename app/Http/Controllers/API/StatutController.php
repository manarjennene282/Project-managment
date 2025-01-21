<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\StatutResource;
use App\Models\Statut;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StatutRequest;


class StatutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $statuts = Statut::all(); // Récupère tous les rôles
        $statutsResource = StatutResource::collection($statuts); // Transforme les rôles en ressources
    
        return response()->json($statutsResource, 200); // Retourne la réponse en JSON
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
    public function store(StatutRequest $request)
    {

        $statut = Statut::create([
            'id_statut' => $request->input('id_statut'),  // Ensure id_prio is provided
            'libelle' => $request->input('libelle'),  // Ensure this is included in the request
        ]);
        
        return response()->json(new StatutResource($statut), 201); // Retourne la ressource créée en JSON
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
    public function update(StatutRequest $request, $id)
    {
        $statut = Statut::findOrFail($id); // Find the record by ID
        $statut->update([
            'id_statut' => $request->input('id_statut'),
            'libelle' => $request->input('libelle'),
        ]);
    
        // Wrap the resource in a JSON response
        return response()->json(new StatutResource($statut), 200);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $statut = Statut::findOrFail($id); // Find the role by ID
        $statut->delete(); // Delete the role
        return response()->json(['message' => 'statut deleted successfully'], 200);
    }
}
