<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('projets', function (Blueprint $table) {
            $table->engine = 'InnoDB';  // Force l'utilisation d'InnoDB
            $table->increments('id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
           $table->string('nom');  // Nom du projet
            $table->date('datedebut');  // Date de début du projet
            $table->string('departement');  // Département associé au projet
            $table->date('datefinestime');  // Date de fin estimée du projet
            $table->date('datefinreelle')->nullable();  // Date de fin réelle, nullable pour quand elle n'est pas encore définie
            $table->timestamps();  // Colonnes de timestamp created_at et updated_at

            
        }); 
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projets');
    }
}
