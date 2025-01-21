<?php

namespace App\Http\Resources;

class NatureJobResource
{
    protected $naturejob;

    public function __construct($naturejob)
    {
        $this->naturejob = $naturejob;
    }

    public static function collection($naturejobs)
    {
        return array_map(function ($naturejob) {
            return (new self($naturejob))->toArray();
        }, $naturejobs->toArray());
    }

    public function toArray()
    {
        return [
            'id' => $this->naturejob['id'],
            'id_natureJob' => $this->naturejob['id_natureJob'],
            'libelle' => $this->naturejob['libelle'],  
            'created_at' => $this->naturejob['created_at'],
            'updated_at' => $this->naturejob['updated_at'],
        ];
    }
}
