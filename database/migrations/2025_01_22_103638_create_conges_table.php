<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCongesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         /* Schema::create('conges', function (Blueprint $table) {
            $table->engine = 'InnoDB'; // Ajoutez cette ligne pour spécifier InnoDB
            $table->increments('id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('nbtotal_conge');
            $table->integer('conge_reste');
            $table->integer('conge_utilise');
            $table->timestamps();
        }); 
         */
    }
    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       // Schema::dropIfExists('conges');
    }
}
