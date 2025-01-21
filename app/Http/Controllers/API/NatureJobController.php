<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\NatureJobResource;
use App\Models\NatureJob;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\NatureJobRequest;

class NatureJobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $naturerelation = NatureJob::all(); // Récupère tous les rôles
        $naturejobressource = NatureJobResource::collection($naturejobs); // Transforme les rôles en ressources
    
        return response()->json($naturejobressource, 200); // Retourne la réponse en JSON
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
    public function store(NatureJobRequest $request)
    {

        $naturejob = NatureJob::create([
            'id_natureJob' => $request->input('id_natureJob'),  // Ensure id_prio is provided
            'libelle' => $request->input('libelle'),  // Ensure this is included in the request
        ]);
        
        return response()->json(new NatureJobResource($naturejob), 201); // Retourne la ressource créée en JSON
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
    public function update(NatureJobRequest $request, $id)
    {
        $naturejob = NatureJob::findOrFail($id); // Find the record by ID
        $naturejob->update([
            'id_natureJob' => $request->input('id_natureJob'),
            'libelle' => $request->input('libelle'),
        ]);
    
        // Wrap the resource in a JSON response
        return response()->json(new NatureJobResource($naturejob), 200);
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $naturejob = NatureJob::findOrFail($id); // Find the role by ID
        $naturejob->delete(); // Delete the role
        return response()->json(['message' => 'job deleted successfully'], 200);
    }
}
