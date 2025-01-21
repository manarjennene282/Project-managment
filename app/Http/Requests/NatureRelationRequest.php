<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NatureRelationRequest extends FormRequest
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
            'id_natureRel' => 'required|string',
            'libelle' => 'required|string',  // Ensure that 'liblle' is required, or nullable if not
         ];
    }
}
