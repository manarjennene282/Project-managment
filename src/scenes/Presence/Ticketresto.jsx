import React, { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import axios from "axios";

const TicketRestoChart = () => {
  // Déclarez un état pour stocker les données des tickets
  const [ticketData, setTicketData] = useState({
    ticketsUtilises: 0,
    ticketsRestants: 22, // Par défaut, 22 tickets
  });

  // Récupérer le token (assurez-vous de stocker et récupérer le token correctement)
  const token = localStorage.getItem("token"); // Si vous stockez le token dans localStorage

  // Récupérez les données de l'API lors du montage du composant
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/ticketresto/show", {
          headers: {
            Authorization: `Bearer ${token}`, // Utilisez le token ici
          },
        });
        setTicketData({
          ticketsUtilises: response.data.tickets_utilises,
          ticketsRestants: response.data.tickets_restants,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des tickets :", error);
      }
    };

    if (token) {
      fetchTicketData();
    } else {
      console.error("Token manquant ou invalide.");
    }
  }, [token]); // Ajoutez `token` comme dépendance du useEffect

  // Couleurs du graphique en fonction des tickets utilisés
  const getSegmentColors = () => {
    const { ticketsUtilises, ticketsRestants } = ticketData;

    // Si tous les tickets sont utilisés, changez la couleur en rouge
    if (ticketsUtilises === 22) {
      return ["red", "red", "red", "red", "red", "red"];
    }

    // Si des tickets restent, changez la couleur en vert
    if (ticketsRestants > 0) {
      return ["limegreen", "limegreen", "limegreen", "limegreen", "limegreen", "limegreen"];
    }

    // Si tout est consommé, restez avec une couleur grise
    return ["gray", "gray", "gray", "gray", "gray", "gray"];
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3>Tickets Resto</h3>

      <ReactSpeedometer
        width={400}
        needleHeightRatio={0.7}
        ringWidth={87}
        minValue={0}
        maxValue={22} // La valeur maximale est 22 tickets
        value={ticketData.ticketsUtilises} // Valeur dynamique
        customSegmentStops={[0, 5, 10, 15, 20, 22]} // 6 intervalles
        segmentColors={getSegmentColors()} // Couleurs dynamiques
        customSegmentLabels={[
          { text: "0", fontSize: "12px" },
          { text: "5", fontSize: "12px" },
          { text: "10", fontSize: "12px" },
          { text: "15", fontSize: "12px" },
          { text: "20", fontSize: "12px" },
        ]}
      />
    </div>
  );
};

export default TicketRestoChart;
