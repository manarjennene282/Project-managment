import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";  // Importer le plugin datalabels

// Enregistrement des composants nécessaires de Chart.js
ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend, ChartDataLabels);

const CongeChart = () => {
  const [conge, setConge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer le token JWT de l'utilisateur connecté depuis localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Le token d'authentification est manquant.");
      return; // Si le token est manquant, on arrête l'exécution ici
    }

    // Configurer les headers pour inclure le token d'authentification
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization
      },
    };

    // Effectuer la requête API pour récupérer les données de congé pour l'utilisateur connecté
    axios
      .get("http://localhost:8000/api/conge/show", config)  // Utilisation de l'endpoint sans userId dans l'URL
      .then((response) => {
        setConge(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des congés:", error);
        setLoading(false);
      });
  }, []);

  // Afficher un message de chargement si les données ne sont pas encore récupérées
  if (loading) {
    return <div>Chargement...</div>;
  }

  // Si aucun congé n'est trouvé pour cet utilisateur
  if (!conge) {
    return <div>Aucun congé trouvé pour cet utilisateur.</div>;
  }

  // Les données pour le graphique
  const data = {
    labels: ["Pris", "Restant"],
    datasets: [
      {
        data: [conge.conge_utilise, conge.conge_reste], // Utiliser les données de l'API
        backgroundColor: ["#808080", "#4CAF50"], // Gris et vert
        hoverBackgroundColor: ["#808080", "#4CAF50"],
      },
    ],
  };

  // Options pour afficher du texte au centre du graphique
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} jours`;
          },
        },
      },
      // Plugin pour afficher du texte au centre du graphique
      datalabels: {
        display: true,
        color: "#000000", // Couleur du texte
        align: "center",
        anchor: "center",
        font: {
          weight: "bold",
          size: 18,
        },
        formatter: (value, context) => {
          // Afficher "Solde : X jours" au centre
          if (context.dataIndex === 0) { // Afficher uniquement pour l'élément au centre
            return `Solde : ${conge.nbtotal_conge} jours`;
          }
          return '';
        },
      },
    },
  };

  return (
    <div style={{ width: "300px", marginLeft: "50px" }}>
      <h3>Solde Congés</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CongeChart;
