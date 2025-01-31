<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RessourceMaterielRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id_ressouM' => 'required|string',
            'liblle' => 'required|string',
            'ID_Machine' => 'required|string',
            'Type_equip' => 'required|exists:typeequipements,id_typeequipement',
            'Date_acquisition' => 'required|date',
            'Date_mise_en_service' => 'required|date',
            'Etat' => 'required|email',
            'Notes' => 'required|string',
        ];
    }
}
