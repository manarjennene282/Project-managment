<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OperationUpload extends Model
{
    protected $fillable = [
        'id_op',            
        'mois',     
        'annee',        
        'date',  
        'confirm'  ,
        
    ];
}
