<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|between:2,100',
            'prenom' => 'required|string|between:2,100',
            'email' => 'required|email|unique:users,email',
            'cin' => 'nullable|string|max:100|unique:users,cin',
            'matricule' => 'required|string|max:100|unique:users,matricule',
            'contrat' => 'required|string|max:50',
            'datenaissance' => 'required|date',
            'role_id' => 'required|exists:roles,id',
            'scr' => 'nullable|string',
            'password' => 'required|string|confirmed|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'cin' => $request->cin,
            'matricule' => $request->matricule,
            'contrat' => $request->contrat,
            'datenaissance' => $request->datenaissance,
            'password' => bcrypt($request->password),
            'role_id' => $request->role_id,
            'scr' => $request->scr,
        ]);

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
        ], 201);
    }

    /**
     * Log in an existing user and return a token.
     */
    public function logInDataBase(Request $request)
    {
        try {
            $messages = [
                'email.required' => 'Please provide the email',
                'password.required' => 'Please provide the password',
            ];

            $validator = Validator::make($request->only(['email', 'password']), [
                'email' => 'required|email',
                'password' => 'required',
            ], $messages);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->errors()->first(),
                ], 400);
            }

            $credentials = $request->only(['email', 'password']);
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => "Connection Failed! Email or Password is not valid.",
                    'status_code' => 401,
                ]);
            }

            $user = Auth::user();
            $user['token'] = $token;

            return response()->json([
                'success' => true,
                'user' => $user,
                'status_code' => 200,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "An error occurred: " . $e->getMessage(),
                'status_code' => 500,
            ], 500);
        }
    }

    public function refreshToken(Request $request)
    {
        try {
            $token = JWTAuth::getToken();
            $tokenRefresh = JWTAuth::refresh($token);
            return response()->json(['token' => $tokenRefresh]);
        } catch (\Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response()->json(['status' => 'Token pas Valide'], 401);
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return response()->json(['status' => 'Token a expiré'], 401);
            } else {
                return response()->json(['status' => 'Token Vide Ou Invalide'], 401);
            }
        }
    }

    public function getTokenExpiration(Request $request)
    {
        try {
            $decodeToken = JWTAuth::decode(JWTAuth::getToken());
            return  response()->json(
                [
                    'dateNow' => date("Y-m-d H:i:s"),
                    'dateExp' => date("Y-m-d H:i:s", $decodeToken['exp'])
                ]
            );
        } catch (\Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response()->json(['status' => 'Token pas Valide'], 401);
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return response()->json(['status' => 'Token a expiré'], 401);
            } else {
                return response()->json(['status' => 'Token Vide Ou Invalide'], 401);
            }
        }
    }


    public function users(){

        try{
        $users = User::all();
        return response()->json([
            'success'=>true,
            'data'=>$users,
        ],200);
        }catch(Exception $e){
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ],500);
        }
        
    }




    public function getUserRole()
    {
        $user = Auth::user();  // Récupérer l'utilisateur authentifié

        // Si l'utilisateur existe, récupérer son rôle
        if ($user) {
            $role = $user->role;  // Cette relation renverra le rôle associé à l'utilisateur
            return response()->json(['role' => $role->role]);  // Retourner le rôle dans la réponse
        }

        return response()->json(['message' => 'User not found'], 404);
    }
}
