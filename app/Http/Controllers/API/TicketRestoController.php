<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\TicketResto;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon; // Import the Carbon class

class TicketRestoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user(); 

        $currentMonth = Carbon::now()->format('Y-m');
        $tickets = TicketResto::where('user_id', $user->id)
            ->where('date', 'like', "{$currentMonth}%")
            ->get();

        $ticketsUtilises = $tickets->sum('ticket_utilise');
        $ticketsRestants = max(0, 22 - $ticketsUtilises); 

        return response()->json([
            'tickets_utilises' => $ticketsUtilises,
            'tickets_restants' => $ticketsRestants,
            'total_mensuel' => 22,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function consume(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
        ]);

        $user = $request->user();

        $ticket = TicketResto::firstOrCreate(
            [
                'user_id' => $user->id,
                'date' => $request->date,
            ],
            [
                'ticket_utilise' => 0,
            ]
        );

        if ($ticket->ticket_utilise >= 1) {
            return response()->json(['error' => 'Le ticket a déjà été consommé pour cette journée.'], 400);
        }

        $ticket->increment('ticket_utilise');

        return response()->json(['message' => 'Ticket consommé avec succès.', 'data' => $ticket]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
