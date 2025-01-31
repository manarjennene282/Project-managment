import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; 
const RessourceMService = {
  /**
   * Récupérer toutes les ressources matérielles
   * @returns {Promise} - Promesse contenant les données des ressources matérielles
   */
  getRessourcesMateriel: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token Vide Ou Invalide");
    }

    try {
      const response = await axios.get(`${API_URL}/ressourcemateriel/getrm`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des ressources matérielles :", error);
      throw error;
    }
  },

  /**
   * Ajouter une ressource matérielle
   * @param {Object} ressourceMateriel - Données de la ressource matérielle à ajouter
   * @returns {Promise} - Promesse contenant la réponse de l'API
   */
  addRessourceMateriel: async (ressourceMateriel) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token Vide Ou Invalide");
    }

    try {
      const response = await axios.post(`${API_URL}/addressourcemateriel`, ressourceMateriel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de la ressource matérielle :", error);
      throw error;
    }
  },

  /**
   * Mettre à jour une ressource matérielle
   * @param {number} id - ID de la ressource à mettre à jour
   * @param {Object} ressourceMateriel - Données mises à jour de la ressource
   * @returns {Promise} - Promesse contenant la réponse de l'API
   */
  updateRessourceMateriel: async (id, ressourceMateriel) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token Vide Ou Invalide");
    }

    try {
      const response = await axios.put(`${API_URL}/updateressourcemateriel/${id}`, ressourceMateriel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la ressource matérielle :", error);
      throw error;
    }
  },

  /**
   * Supprimer une ressource matérielle
   * @param {number} id - ID de la ressource à supprimer
   * @returns {Promise} - Promesse contenant la réponse de l'API
   */
  deleteRessourceMateriel: async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token Vide Ou Invalide");
    }

    try {
      const response = await axios.delete(`${API_URL}/deleteressourcemateriel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression de la ressource matérielle :", error);
      throw error;
    }
  },
};

export default RessourceMService;
