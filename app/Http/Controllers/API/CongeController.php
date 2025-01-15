<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Conge;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CongeController extends Controller
{
    /**
     * Afficher la liste des congés pour l'utilisateur connecté.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Récupérer l'utilisateur authentifié via JWT ou session
        $user = Auth::user();

        // Si l'utilisateur n'est pas authentifié, renvoyer une erreur
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié.'], 401);
        }

        // Chercher les congés pour cet utilisateur
        $conge = Conge::where('user_id', $user->id)->first();

        // Si aucun congé n'est trouvé pour cet utilisateur, renvoyer une erreur
        if (!$conge) {
            return response()->json(['error' => 'Aucun congé trouvé pour cet utilisateur.'], 404);
        }

        // Retourner les données de congé
        return response()->json($conge);
    }

    /**
     * Créer un nouveau congé (si nécessaire).
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // Logique pour créer un congé (si nécessaire)
    }

    /**
     * Enregistrer un nouveau congé dans la base de données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Logique pour stocker un congé (si nécessaire)
    }

    /**
     * Consommer des jours de congé pour l'utilisateur connecté.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function consume(Request $request)
    {
        // Valider que la quantité de jours soit valide
        $request->validate(['days' => 'required|numeric']);

        // Récupérer l'utilisateur authentifié
        $user = Auth::user();

        // Si l'utilisateur n'est pas authentifié, renvoyer une erreur
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié.'], 401);
        }

        // Chercher les congés pour cet utilisateur
        $conge = Conge::where('user_id', $user->id)->first();

        // Si aucun congé n'est trouvé ou si le solde est insuffisant, renvoyer une erreur
        if (!$conge || $conge->conge_reste < $request->days) {
            return response()->json(['error' => 'Solde insuffisant.'], 400);
        }

        // Consommer les jours de congé
        $conge->conge_reste -= $request->days;
        $conge->conge_utilise += $request->days;

        // Sauvegarder les modifications
        $conge->save();

        // Retourner un message de succès avec les données mises à jour
        return response()->json(['message' => 'Congé consommé avec succès.', 'data' => $conge]);
    }

    /**
     * Supprimer un congé (si nécessaire).
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Logique pour supprimer un congé (si nécessaire)
    }
}
