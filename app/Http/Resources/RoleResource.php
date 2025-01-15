<?php

namespace App\Http\Resources;

class RoleResource
{
    protected $role;

    public function __construct($role)
    {
        $this->role = $role;
    }

    public static function collection($roles)
    {
        return array_map(function ($role) {
            return (new self($role))->toArray();
        }, $roles->toArray());
    }

    public function toArray()
    {
        return [
            'id' => $this->role['id'],
            'role' => $this->role['role'],
            'created_at' => $this->role['created_at'],
            'updated_at' => $this->role['updated_at'],
        ];
    }
}
