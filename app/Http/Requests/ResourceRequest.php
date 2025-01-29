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
            'cin' => 'required|string',
            'matricule' => 'required|string',
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'alias' => 'required|string',
            'email' => 'required|email',
            'gsm' => 'required|string',
            'id_grp' => 'required|exists:groupe_ressources,id_grp',
        ];
    }
}
