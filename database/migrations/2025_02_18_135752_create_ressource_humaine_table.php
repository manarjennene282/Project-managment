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
            $table->string('matricule');
            $table->string('email');
            $table->string('contrat');
            $table->string('ressource');
            $table->string('lieuxtravail');
            $table->string('bucollaborateur');
            $table->string('buaffectation');
            $table->date('datedebut');
            $table->date('datefin');
            $table->integer('duree');
            $table->string('activite');
            $table->string('commercial');
            $table->string('nouvellmission');
            $table->string('secteuractrivite');
            $table->string('fermeoptionnel');
            $table->string('localisation');
            $table->string('teletravail');
            $table->string('zoneA');
            $table->string('zoneB');
            $table->string('zoneC');
            $table->text('commentaire');
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
