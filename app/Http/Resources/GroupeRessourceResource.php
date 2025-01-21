<?php

namespace App\Http\Resources;

class GroupeRessourceResource
{
    protected $grouperessource;

    public function __construct($grouperessource)
    {
        $this->grouperessource = $grouperessource;
    }

    public static function collection($grouperessources)
    {
        return array_map(function ($grouperessource) {
            return (new self($grouperessource))->toArray();
        }, $grouperessources->toArray());
    }

    public function toArray()
    {
        return [
            'id' => $this->grouperessource['id'],
            'id_grp' => $this->grouperessource['id_grp'],
            'libelle' => $this->grouperessource['libelle'],
            'created_at' => $this->grouperessource['created_at'],
            'updated_at' => $this->grouperessource['updated_at'],
        ];
    }
}
