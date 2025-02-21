<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class Cors
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
        $response = $next($request);
    
        if ($response instanceof Response || $response instanceof JsonResponse) {
            return $response
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Auth-Token, Authorization, Origin')
                ->header('Access-Control-Allow-Credentials', 'true');
        }
    
        // Pour les réponses de type Symfony, on utilise la méthode setHeaders
        if (method_exists($response, 'headers')) {
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
            $response->headers->set('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Auth-Token, Authorization, Origin');
            $response->headers->set('Access-Control-Allow-Credentials', 'true');
        }
    
        return $response;
    }
    
}
