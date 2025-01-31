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

Route::group(['middleware' => ['api','cors',],'namespace' => 'API','prefix' => 'presence'],function(){

    Route::post('addpresence','PresenceController@store');
    Route::get('getpresence','PresenceController@getPresences');
    Route::put('updatepresence','PresenceController@update');
    Route::post('calculheures','PresenceController@calculateAndSaveWorkHours');
    Route::post('calculabsence','PresenceController@calculateAbsenceHours');
    
 });
 Route::group(['middleware' => ['api','cors'],'namespace' => 'API','prefix' => 'projet'],function(){

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

Route::group(['middleware' => ['api','cors'],'namespace' => 'API','prefix' => 'parametrage'],function(){
    Route::get('showtypeprojet', 'TypeProjetController@index'); 
    Route::post('addtypeprojet', 'TypeProjetController@store');
    Route::put('updatetypeprojet/{typeprojet}', 'TypeProjetController@update');
    Route::delete('deletetypeprojet/{typeprojet}', 'TypeProjetController@destroy');
    //Route Groupe bressource 
    Route::apiResource('grouperessource', 'GroupeRessourceController');
    Route::apiResource('priorite', 'PrioriteController');
    Route::apiResource('statut', 'StatutController');
    Route::apiResource('relprojet', 'RelationProjetController');
    Route::apiResource('naturejob', 'NatureJobController');
    Route::apiResource('naturestruc', 'NatureStructureController');
    Route::apiResource('naturerelation', 'NatureRelationController');
    Route::apiResource('typeequipement', 'TypeEquipementController');

});

//Ressource Humaine 
Route::group(['middleware' => ['api','cors',],'namespace' => 'API','prefix' => 'ressourcehumaine'],function(){

    Route::get('getrh','RessourceHumaineController@index');
    Route::post('addrh','RessourceHumaineController@store');
    Route::put('updaterh/{id}','RessourceHumaineController@update');
    Route::delete('deleterh/{id}','RessourceHumaineController@destroy');

 });

 //Ressource Materiel 
Route::group(['middleware' => ['api','cors',],'namespace' => 'API','prefix' => 'ressourcemateriel'],function(){

    Route::get('getrm','RessourceMaterielController@index');
    Route::post('addrm','RessourceMaterielController@store');
    Route::put('updaterm/{id}','RessourceMaterielController@update');
    Route::delete('deleterm/{id}','RessourceMaterielController@destroy');
    
 });

