<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateComptableTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comptables', function (Blueprint $table) {
            $table->increments('id');
           // $table->string('id_mvt');
            $table->string('id_op');
            $table->string('id_ressh');  
            $table->float('jhtrav');    
            $table->float('mnt_base'); 
            $table->float('mnt_brut'); 
            $table->float('mnt_cnss'); 
            $table->float('mnt_salaireImp'); 
            $table->float('mnt_irrp'); 
            $table->float('mnt_css');
            $table->float('mnt_acpt');
            $table->float('mnt_pret');
            $table->float('mnt_net');
            $table->float('mnt_01707');
            $table->float('mnt_0034'); // Remplacer le point par un underscore
            $table->float('mnt_130');
            $table->float('mnt_scr');
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
        
        Schema::dropIfExists('comptables');
    }
}
