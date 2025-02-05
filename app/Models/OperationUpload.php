<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OperationUpload extends Model
{
    protected $fillable = [
        'id_op',
        'mois',
        'annee',
        'confirm',
        'dateop',
        'file',
        'id_mvt'
    ];

    public function comptable()
    {
        return $this->belongsTo(User::class);
    }
    public function user()
    {
        return $this->belongsTo(comptable::class);
    }


}
