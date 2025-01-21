<?php

namespace App\Http\Resources;

class RelationProjetResource
{
    protected $relation_projet;

    public function __construct($relation_projet)
    {
        $this->relation_projet = $relation_projet;
    }

    public static function collection($relation_projets)
    {
        return array_map(function ($relation_projet) {
            return (new self($relation_projet))->toArray();
        }, $relation_projets->toArray());
    }

    public function toArray()
    {
        return [
            'id' => $this->relation_projet['id'],
            'id_RelProjet' => $this->relation_projet['id_RelProjet'],
            'libelle' => $this->relation_projet['libelle'],  // This should display the correct 'liblle' value
            'created_at' => $this->relation_projet['created_at'],
            'updated_at' => $this->relation_projet['updated_at'],
        ];
    }
}
