<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Conge;

class UpdateUserConge extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'conge:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ajoute 1,8 jour de congé chaque mois pour chaque utilisateur.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Mise à jour des soldes de congés...');

        // Récupérer tous les congés existants
        $usersConge = Conge::all();

        foreach ($usersConge as $conge) {
            // Ajouter 1,8 jour au solde
            $conge->nbtotal_conge += 1.8;
            $conge->conge_reste += 1.8;

            // Sauvegarder les modifications
            $conge->save();
        }

        $this->info('Mise à jour terminée avec succès !');
    }
}
