<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ComptableRequest extends FormRequest
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
            'id_op' => 'required',
            'id_ressh' => 'required',
            'jhtrav' => 'required',
            'mnt_base' => 'required',
            'mnt_brut' => 'required',
            'mnt_cnss' => 'required',
            'mnt_salaireImp' => 'required',
            'mnt_irrp' => 'required',
            'mnt_css' => 'required',
            'mnt_acpt' => 'required',
            'mnt_pret' => 'required',
            'mnt_net' => 'required',
            'mnt_01707' => 'required',
            'mnt_0034' => 'required',
            'mnt_130' => 'required',
            'mnt_scr' => 'required',
        ];
    }
}
