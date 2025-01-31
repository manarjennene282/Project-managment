<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTypeEquipementTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('type_equipements', function (Blueprint $table) {
            $table->increments('id'); // Clé primaire auto-incrémentée
            $table->string('id_typeequipement'); // Ajout de unique()
            $table->string('libelle');  
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
        Schema::dropIfExists('type_equipements'); // Suppression correcte
    }
}
