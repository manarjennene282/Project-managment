<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PrioriteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // Update this logic as needed
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
   // PrioriteRequest.php

   public function rules()
   {
       return [
           'id_prio' => 'required|string',
           'liblle' => 'required|string',  // Ensure that 'liblle' is required, or nullable if not
        ];
   }
   

}
