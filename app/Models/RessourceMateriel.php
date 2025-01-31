<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class RessourceMateriel extends Model
{
    protected $fillable = [
        'id_ressouM',
        'liblle',
        'ID_Machine',
        'Type_equip',
        'Date_acquisition',
        'Date_mise_en_service',
        'Etat',
        'Notes'
    ];

    public function typeEquip() // Correction ici
    {
        return $this->belongsTo(Typeequipement::class, 'id_typeequipement','id');
    }
}