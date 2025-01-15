<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
    {
        // Vous devez spécifier la table 'roles' à créer et utiliser $table à l'intérieur de la fonction de callback
        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('role'); // Colonne pour stocker le nom du rôle (par exemple: admin, utilisateur, etc.)
            $table->timestamps(); // Crée les colonnes 'created_at' et 'updated_at'
        });
    }
 
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');
    } 
}
