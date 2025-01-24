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
        $projects = Priorite::all();
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
    \Log::info("Deleting Priorite with ID: " . $id); // Log the ID

    // Find the Priorite by ID
    $priorite = Priorite::find($id);

    // If the Priorite does not exist, return a 404 response
    if (!$priorite) {
        return response()->json(['message' => 'Priorite not found'], 404);
    }

    // Delete the Priorite
    $priorite->delete();

    // Return a success response
    return response()->json(['message' => 'Priorite deleted successfully'], 200);
}
}
