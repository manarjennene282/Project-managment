<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePresencesTable extends Migration
{
    public function up()
    {
      /*   Schema::create('presences', function (Blueprint $table) {
            $table->engine = 'InnoDB';  // Force l'utilisation d'InnoDB
            $table->increments('id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->date('date');
            $table->boolean('presence_matin')->default(false);
            $table->boolean('presence_apresmidi')->default(false);
            $table->timestamps();
        }); */
        
    }

    public function down()
    {
        Schema::dropIfExists('presences');
    }
}
