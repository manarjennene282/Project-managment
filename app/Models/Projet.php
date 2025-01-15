<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    protected $fillable = [
        'user_id',            
        'nom',     
        'datedebut',        
        'departement',    
        'datefinestime',
        'datefinreelle'
    ];

    public function user()
    {
        return $this->belongsTo(User::class); 
    }
}
