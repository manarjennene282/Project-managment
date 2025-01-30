<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRessourceMaterielTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ressourcemateriels', function (Blueprint $table) {
            $table->increments('id'); // La clé primaire auto-incrémentée
            $table->string('id_ressouM'); // Champ id_ressouM
            $table->string('liblle'); // Champ liblle
            $table->string('ID_Machine'); // Champ ID_Machine
            $table->string('Type_equip'); // Champ Type_equip
            $table->date('Date_acquisition'); // Champ Date_acquisition
            $table->date('Date_mise_en_service'); // Champ Date_mise_en_service
            $table->string('Etat'); // Champ Etat
            $table->text('Notes')->nullable(); // Champ Notes, nullable pour pouvoir laisser vide
            $table->timestamps(); // Pour les timestamps created_at et updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ressourcemateriels');
    }
}
