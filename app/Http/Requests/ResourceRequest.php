<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResourceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id_ressh' => 'required|string',
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'matricule' => 'required|string',
            'email' => 'required|string',
            'contrat' => 'required|string',
            'ressource' => 'string',
            'lieuxtravail' => 'string',

            'cin' => 'required|string',
            'gsm' => 'required|string|regex:/^\+?[0-9]{8,15}$/',

            // Informations professionnelles
            'bucollaborateur' => 'string',
            'buaffectation' => 'string',
            'activite' => 'string',
            'commercial' => 'string',
            'nouvellmission' => 'string',
            'secteuractrivite' => 'string',
            'fermeoptionnel' => 'string',
            'localisation' => 'string',
            'teletravail' => 'string',
            'zoneA' => 'string',
            'zoneB' => 'string',
            'zoneC' => 'string',
            'commentaire' => 'string',

            // Dates et durées
            'datedebut' => 'date',
            'datefin' => 'date|after_or_equal:datedebut',
            'duree' => 'integer|min:0',
            //cléetrangere 
            'id_grp' => 'required|exists:groupe_ressources,id_grp',
        ];
    }
}
