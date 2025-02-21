<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RessourceHumaine extends Model
{
    protected $fillable = [
        'nom',
        'matricule',
        'email',
        'contrat',
        'ressource',
        'lieuxtravail',
        'bucollaborateur',
        'buaffectation',
        'datedebut',
        'datefin',
        'duree',
        'activite',
        'commercial',
        'nouvellmission',
        'secteuractrivite',
        'fermeoptionnel',
        'localisation',
        'teletravail',
        'zoneA',
        'zoneB',
        'zoneC',
        'commentaire',
        'gsm',
        'id_grp'
    ];

    public function grouperessource()
{
    return $this->belongsTo(GroupeRessource::class, 'id_grp', 'id_grp');
}

}
