<?php

namespace App\Http\Resources;

class StatutResource
{
    protected $statut;

    public function __construct($statut)
    {
        $this->statut = $statut;
    }

    public static function collection($statuts)
    {
        return array_map(function ($statut) {
            return (new self($statut))->toArray();
        }, $statuts->toArray());
    }

    public function toArray()
    {
        return [
            'id' => $this->statut['id'],
            'id_statut' => $this->statut['id_statut'],
            'libelle' => $this->statut['libelle'],  // This should display the correct 'liblle' value
            'created_at' => $this->statut['created_at'],
            'updated_at' => $this->statut['updated_at'],
        ];
    }
}
