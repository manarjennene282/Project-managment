<?php

namespace App\Http\Resources;

class NatureStructureResource
{
    protected $naturestructure;

    public function __construct($naturestructure)
    {
        $this->naturestructure = $naturestructure;
    }

    public static function collection($naturestructure)
    {
        return array_map(function ($naturestructure) {
            return (new self($naturestructure))->toArray();
        }, $naturestructure->toArray());
    }

    public function toArray()
    {
        return [
            'id' => $this->naturestructure['id'],
            'id_natureStruct' => $this->naturestructure['id_natureStruct'],
            'libelle' => $this->naturestructure['libelle'],  
            'created_at' => $this->naturestructure['created_at'],
            'updated_at' => $this->naturestructure['updated_at'],
        ];
    }
}
