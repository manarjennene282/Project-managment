<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conge extends Model
{
    protected $fillable = [
        'user_id',            
        'nbtotal_conge',     
        'conge_reste',        
        'conge_utilise',    
    ];

    public function user()
    {
        return $this->belongsTo(User::class); 
    }
}
