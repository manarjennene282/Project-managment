<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Role;
use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Role::all(); // Récupère tous les rôles
        $rolesResource = RoleResource::collection($roles); // Transforme les rôles en ressources
    
        return response()->json($rolesResource, 200); // Retourne la réponse en JSON
    }
    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\RoleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoleRequest $request)
    {
        $role = Role::create([
            'role' => $request->input('role'),
        ]);
    
        return response()->json(new RoleResource($role), 201); // Retourne la ressource créée en JSON
    }
    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = Role::findOrFail($id); // Find the role by ID
        return new RoleResource($role); // Return the role as a resource
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\RoleRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(RoleRequest $request, $id)
    {
        $role = Role::findOrFail($id); // Find the role by ID
        $role->update([
            'role' => $request->input('role'),
        ]);
        return new RoleResource($role); // Return the updated role as a resource
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = Role::findOrFail($id); // Find the role by ID
        $role->delete(); // Delete the role
        return response()->json(['message' => 'Role deleted successfully'], 200);
    }
}
