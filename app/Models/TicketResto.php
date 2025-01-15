<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketResto extends Model
{
    protected $table = 'ticket_resto'; // Explicitly define the table name

    protected $fillable = [
        'user_id',
        'total_ticket',
        'ticket_utilise',
        'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
