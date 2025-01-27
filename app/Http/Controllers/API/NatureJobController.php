<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\NatureJobResource;
use App\Models\NatureJob;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\NatureJobRequest;
use Illuminate\Support\Facades\Validator;

class NatureJobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $naturejob = NatureJob::all();
        return response()->json([
            'success' => true,
            'data' => $naturejob,
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
    public function update(Request $request, $id)
    {
        $naturejob = NatureJob::find($id);
        
        if (!$naturejob) {
            return response()->json([
                'success' => false,
                'message' => 'NatureJob introuvable'
            ], 404);
        }
    
        $validator = Validator::make($request->all(), [
            'id_natureJob' => 'required|string|unique:nature_jobs,id_natureJob,'.$id.',id',
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
            $naturejob->update($request->all());
            
            return response()->json([
                'success' => true,
                'data' => $naturejob,
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
        $naturejob = NatureJob::findOrFail($id); // Find the role by ID
        $naturejob->delete(); // Delete the role
        return response()->json(['message' => 'job deleted successfully'], 200);
    }
}
