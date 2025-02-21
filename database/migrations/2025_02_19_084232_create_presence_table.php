<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePresenceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('presences', function (Blueprint $table) {
            $table->engine = 'InnoDB';  
            $table->increments('id');
            $table->unsignedBigInteger('user_id')->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Ajout de la contrainte
            $table->date('date');
            $table->boolean('presence_matin')->default(false);
            $table->boolean('presence_apresmidi')->default(false);
            $table->integer('heurestravaillees')->default(0);
            $table->integer('heuresabsence')->default(0);
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
        Schema::dropIfExists('presences');

    }
}
