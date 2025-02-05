<?php

namespace App\Http\Controllers\API;


use App\Models\Comptable;
use App\Models\OperationUpload;
Use App\User;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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

    //fonction import fichier 


   
    public function importFile(Request $request){
        try{

          //  $user = Auth::user();
            $mvt_id = $request->id;
            $name = $request->name;
            if(isset($request->file)) {
                $data = $request->file;
                $image_parts = explode(";base64,",$data);
                $file = base64_decode($image_parts[1]);
                
                // Utilisation de pathinfo pour extraire l'extension
                $ext = pathinfo($name, PATHINFO_EXTENSION);
                $filenameWithoutExt = pathinfo($name, PATHINFO_FILENAME);
                
                // Formatage de la date et heure pour le nom du fichier
                $timestamp = date('ymd-His');
                $imageName = $filenameWithoutExt . "_" . $timestamp . '.' . $ext;
                $imagePath = public_path()."/files/".$imageName;
                $size = file_put_contents($imagePath, $file);
    
                $file_data = new OperationUpload();
                $file_data->mvt_id = $mvt_id;
                $file_data->user_id = $user->id;
                $file_data->file = $imageName;
                $file_data->size = $size;
                $file_data->save();
                $comptable = Comptable::find($mvt_id);
                //$comptable = new Collections($comptable, TicketResource::class);
                return response()->json([
                    'success' => true,
                    'comptable' => $comptable->toArray(),
                    'file' => $file_data,
                    'message' => "your file was saved successfully",
                ],200);
            }else{
                return response()->json([
                    'success' => false,
                    'message' => "no file",
                ],200);
            }
        } catch (Exception $e){
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ],400);
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
    public function store(Request $request)
{
    $comptables = $request->input('comptables');

    if (!is_array($comptables)) {
        return response()->json(['error' => 'Format de données invalide'], 400);
    }

    foreach ($comptables as $data) {
        \App\Models\Comptable::create($data);
    }

    return response()->json(['message' => 'Données enregistrées avec succès']);
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
