<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
//use Tymon\JWTAuth\JWTAuth -> redefinir authenticate();

class VerifyToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            //dd(JWTAuth::decode(JWTAuth::parseToken()->getToken()));
            JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response()->json(['status' => 'Token pas Valide'], 401);
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return response()->json(['status' => 'Token a expiré'], 401);
            } else {
                return response()->json(['status' => 'Token Vide Ou Invalide'], 401);
            }
        }
        return $next($request);
    }
}
