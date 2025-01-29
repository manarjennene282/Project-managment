<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRessourceHumaineTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ressource_humaines', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nom');
            $table->string('cin');
            $table->string('id_ressh');  
            $table->string('matricule');    
            $table->string('prenom'); 
            $table->string('alias'); 
            $table->string('email'); 
            $table->string('gsm'); 
            $table->string('id_grp')->index();
            $table->timestamps();      
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ressource_humaines');

    }
}

