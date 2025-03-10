<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Typeequipement extends Model
{
    protected $fillable = [
        'id_typeequipement',
        'libelle',
    ];

    public function ressourcesmateriel()
    {
        return $this->hasMany(Typeequipement::class, 'id_typeequipement');
    }
}

