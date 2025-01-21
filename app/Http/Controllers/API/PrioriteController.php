<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\PrioriteResource;
use App\Models\Priorite;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\PrioriteRequest;


use Validator;

class PrioriteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $priorites = Priorite::all(); // Récupère tous les rôles
        $prioritesResource = PrioriteResource::collection($priorites); // Transforme les rôles en ressources
    
        return response()->json($prioritesResource, 200); // Retourne la réponse en JSON
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
    public function store(PrioriteRequest $request)
    {

        $priorite = Priorite::create([
            'id_prio' => $request->input('id_prio'),  // Ensure id_prio is provided
            'liblle' => $request->input('liblle'),  // Ensure this is included in the request
        ]);
        
        return response()->json(new PrioriteResource($priorite), 201); // Retourne la ressource créée en JSON
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
