import axios from "axios";

const API_URL = 'http://localhost:8000/api';

const RessourceHumaineService = {
  /**
   * Récupérer les ressources humaines.
   * @returns {Promise} - Promesse contenant les données des ressources humaines.
   */
  getRessourceHumaine: async () => {  
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${API_URL}/ressourcehumaine/getrh`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des ressources humaines :", error);
      throw error;
    }
  },

  /**
   * Ajouter une ressource humaine.
   * @param {Object} rh - Données de la ressource humaine à ajouter.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  addRessourcehumaine: async (ressourcehumaine) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/ressourcehumaine/addrh`, ressourcehumaine, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de la ressource humaine :", error);
      throw error;
    }
  },

  /**
   * Mettre à jour une ressource humaine.
   * @param {number} id - ID de la ressource humaine à mettre à jour.
   * @param {Object} ressourcehumaine - Données de la ressource humaine mises à jour.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  updateRessourcehumaine: async (id, ressourcehumaine) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/ressourcehumaine/updaterh/${id}`, ressourcehumaine, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la ressource humaine :", error);
      throw error;
    }
  },

  /**
   * Supprimer une ressource humaine.
   * @param {number} id - ID de la ressource humaine à supprimer.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  deleteRessourcehumaine: async (id) => {
    try {
      const token = localStorage.getItem("token"); // Récupération du token
      const response = await axios.delete(`${API_URL}/ressourcehumaine/deleterh/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression de la ressource humaine :", error);
      throw error;
    }
  },
};

export default RessourceHumaineService;
