<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', 'API\UserController@AuthRouteAPI');


Route::post('register', 'API\AuthController@register')->middleware(['cors', 'api']);
Route::post('auth', 'API\AuthController@logInDataBase')->middleware(['cors', 'api']);
Route::get('getrole', 'API\AuthController@getUserRole')->middleware(['cors', 'api']);

Route::group(['middleware' => ['api', 'cors', 'token'], 'namespace' => 'API', 'prefix' => 'auth'], function () {

    Route::get('expirationtoken', 'AuthController@getTokenExpiration');

    Route::post('refreshtoken', 'AuthController@refreshToken');

});


Route::group(['middleware' => ['cors', 'api','token'], 'namespace' => 'API'], function(){

    Route::apiResource('role', 'RoleController');
});

Route::group(['middleware' => ['api','cors','token'],'namespace' => 'API','prefix' => 'presence'],function(){

    Route::post('addpresence','PresenceController@calculateAndSaveWorkHours');
    Route::get('getpresence','PresenceController@getPresences');
    Route::put('updatepresence','PresenceController@update');
    Route::post('calculheures','PresenceController@calculateAndSaveWorkHours');
    Route::post('calculabsence','PresenceController@calculateAbsenceHours');




 });
 Route::group(['middleware' => ['api','cors','token'],'namespace' => 'API','prefix' => 'projet'],function(){

    Route::get('getprojet','ProjetController@index');
    Route::post('addprojet','ProjetController@store');
    Route::put('updateprojet/{project}', 'ProjetController@update');  // Utilisez PUT pour mettre à jour
    Route::delete('deleteprojet/{id}', 'ProjetController@destroy');
 });


 Route::group(['middleware' => ['api','cors','token'],'namespace' => 'API','prefix' => 'conge'],function(){
    Route::get('show', 'CongeController@index');      
    Route::put('consume/{userId}', 'CongeController@consume');
});

Route::group(['middleware' => ['api','cors','token'],'namespace' => 'API','prefix' => 'ticketresto'],function(){
    Route::get('show', 'TicketRestoController@index');       
    Route::post('consume', 'TicketRestoController@consume');
});


