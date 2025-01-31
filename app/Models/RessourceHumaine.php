<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RessourceHumaine extends Model
{
    protected $fillable = [ // Correction ici
        'id_ressh',
        'cin',
        'matricule',
        'contrat',
        'ressource',
        'nom',
        'prenom',
        'alias',
        'email',
        'gsm',
        'id_grp'
    ];

    public function grouperessource() // Correction ici
    {
        return $this->belongsTo(GroupeRessource::class, 'id_grp','id');
    }
}
