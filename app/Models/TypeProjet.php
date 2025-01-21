<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeProjet extends Model
{
    protected $fillable = [
        'libelle',
        'description'
    ];
    
}
