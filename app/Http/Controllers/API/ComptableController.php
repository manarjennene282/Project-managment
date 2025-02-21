<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Comptable;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\ComptableRequest;

class ComptableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            // Récupérer toutes les ressources humaines sans tri
            $comptables = Comptable::all();
    
            return response()->json([
                'success' => true,
                'data' => $comptables,
                'message' => 'Les comptables ont été récupérés avec succès.',
            ], 200);
        } catch (\Exception $e) {
            // Gérer les erreurs et retourner une réponse appropriée
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de la récupération des comptables',
                'error' => $e->getMessage(),
            ], 500);
        }
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
    public function store(ComptableRequest $request)
    {
        try {
            $validatedData = $request->all();
    
            $comptables = Comptable::create($validatedData);
    
            return response()->json([
                'success' => true,
                'data' => $comptables,
                'message' => 'Ressource humaine ajoutée avec succès.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'ajout de la ressource humaine.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
