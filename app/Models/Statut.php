<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Statut extends Model
{
    protected $fillable = [
        'id_statut',
        'libelle',
    ];
}
