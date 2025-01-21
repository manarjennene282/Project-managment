<?php

namespace App\Http\Resources;

class PrioriteResource
{
    protected $priorite;

    public function __construct($priorite)
    {
        $this->priorite = $priorite;
    }

    public static function collection($priorites)
    {
        return array_map(function ($priorite) {
            return (new self($priorite))->toArray();
        }, $priorites->toArray());
    }

    public function toArray()
    {
        return [
            'id' => $this->priorite['id'],
            'id_prio' => $this->priorite['id_prio'],
            'liblle' => $this->priorite['liblle'],  // This should display the correct 'liblle' value
            'created_at' => $this->priorite['created_at'],
            'updated_at' => $this->priorite['updated_at'],
        ];
    }
}
