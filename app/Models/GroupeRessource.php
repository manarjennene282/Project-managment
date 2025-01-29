<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GroupeRessource extends Model
{
    protected $fillable = [
        'id_grp',
        'libelle',
    ];

    public function ressourcesHumaines()
    {
        return $this->hasMany(GroupeRessource::class, 'id_grp');
    }

   

}
