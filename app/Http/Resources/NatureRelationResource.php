<?php

namespace App\Http\Resources;

class RelationProjetResource
{
    protected $nature_relation;

    public function __construct($nature_relation)
    {
        $this->nature_relation = $nature_relation;
    }

    public static function collection($nature_relation)
    {
        return array_map(function ($nature_relation) {
            return (new self($nature_relation))->toArray();
        }, $nature_relations->toArray());
    }

    public function toArray()
    {
        return [
            'id' => $this->nature_relation['id'],
            'id_natureRel' => $this->nature_relation['id_natureRel'],
            'libelle' => $this->nature_relation['libelle'],  // This should display the correct 'liblle' value
            'created_at' => $this->nature_relation['created_at'],
            'updated_at' => $this->nature_relation['updated_at'],
        ];
    }
}
