<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comptable extends Model
{
    protected $fillable = [ 
       //'id_mvt',
       'id_op',
       'id_ressh',
       'jhtrav',
       'mnt_base',
       'mnt_brut',
       'mnt_cnss',
       'mnt_salaireImp',
       'mnt_irrp',
       'mnt_css',
       'mnt_acpt',
       'mnt_pret',
       'mnt_net',
       'mnt_01707',
       'mnt_0034',
       'mnt_130',
       'mnt_scr',
    ];


    public function operation()
    {
        return $this->hasMany(OperationUpload::class);
    }
 

}
