<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\RelationProjetResource;
use App\Models\RelationProjet;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\RelationProjetRequest;


class RelationProjetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $relationprojets = RelationProjet::all(); // Récupère tous les rôles
        $relationprojetresource = RelationProjetResource::collection($relationprojets); // Transforme les rôles en ressources
    
        return response()->json($relationprojetresource, 200); // Retourne la réponse en JSON
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
    public function update(RelationProjetRequest $request, $id)
    {
        $relationprojet = RelationProjet::findOrFail($id); // Find the record by ID
        $relationprojet->update([
            'id_RelProjet' => $request->input('id_RelProjet'),
            'libelle' => $request->input('libelle'),
        ]);
    
        // Wrap the resource in a JSON response
        return response()->json(new RelationProjetResource($relationprojet), 200);
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
