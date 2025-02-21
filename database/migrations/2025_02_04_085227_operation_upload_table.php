<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class OperationUploadTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('operation_upload', function (Blueprint $table) {
            $table->increments('id');
            $table->string('id_op');
            $table->string('mois');
            $table->string('annee');
            $table->enum('confirm', ['O', 'N']); 
            $table->date('dateop');
            $table->longText('file');
            $table->integer('user_id')->index();
           // $table->integer('id_mvt')->index();
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
        Schema::dropIfExists('operation_upload');
    }
}
