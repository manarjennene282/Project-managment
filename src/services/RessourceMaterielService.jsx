import axios from "axios";

const API_URL = 'http://localhost:8000/api';

const RessourceMaterielService = {
  /**
   * Récupérer les ressources matériels.
   * @returns {Promise} - Promesse contenant les données des ressources matériels.
   */
  getRessourceMateriel: async () => {  
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${API_URL}/ressourcemateriel/create`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des ressources matériels :", error);
      throw error;
    }
  },

  /**
   * Ajouter une ressource materiel.
   * @param {Object} rh - Données de la ressource materiel à ajouter.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  addRessourceMateriel: async (RessourceMateriel) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/ressourcemateriel/addrm`, RessourceMateriel, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de la ressource materiel :", error);
      throw error;
    }
  },

  /**
   * Mettre à jour une ressource materiel.
   * @param {number} id - ID de la ressource materiel à mettre à jour.
   * @param {Object} RessourceMateriel - Données de la ressource materiel mises à jour.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  updateRessourceMateriel: async (id, RessourceMateriel) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/RessourceMateriel/updaterm/${id}`, RessourceMateriel, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la ressource materiel :", error);
      throw error;
    }
  },

  /**
   * Supprimer une ressource materiel.
   * @param {number} id - ID de la ressource materiel à supprimer.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  deleteRessourceMateriel: async (id) => {
    try {
      const token = localStorage.getItem("token"); // Récupération du token
      const response = await axios.delete(`${API_URL}/RessourceMateriel/deleterm/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression de la ressource materiel :", error);
      throw error;
    }
  },

// type equipement 

gettypeequipement: async () => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      throw new Error("Token Vide Ou Invalide");
    }
  
    try {
      const response = await axios.get(`${API_URL}/parametrage/typeequipement`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des typeequipement :", error);
      throw error;
    }
  },
  
  /**
   * Ajouter une priorité.
   * @param {Object} typeequipement - Données de la priorité à ajouter.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  addtypeequipement: async (typeequipement) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(`${API_URL}/parametrage/typeequipement`, typeequipement, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de la typeequipement :", error);
      throw error;
    }
  },
  
  /**
   * Mettre à jour une priorité.
   * @param {number} id - ID de la priorité à mettre à jour.
   * @param {Object} statut - Données de la priorité mises à jour.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  updatetypeequipement: async (id, typeequipement) => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.put(`${API_URL}/parametrage/typeequipement/${id}`, typeequipement, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la typeequipement :", error);
      throw error;
    }
  },


};

export default RessourceMaterielService;
