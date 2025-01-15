<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    protected $fillable = [
        'user_id',           
        'date',               
        'presence_matin',  
        'presence_apresmidi' ,
        'heurestravaillees',
        'heuresabsence'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
