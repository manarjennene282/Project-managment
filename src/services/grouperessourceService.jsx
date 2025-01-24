import axios from "axios";

const API_URL = 'http://localhost:8000/api'; 

const GrouperessourceService = {
  /**
   * Récupérer les projets.
   * @returns {Promise} - Promesse contenant les données des projets.
   */
  getProjets: async () => {  
    const token = localStorage.getItem("token"); 
    if (!token) {
      throw new Error("Token Vide Ou Invalide");
    }
  
    try {
      const response = await axios.get(`${API_URL}/projet/getprojet`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des projets :", error);
      throw error;
    }
  },

  /**
   * Ajouter un projet.
   * @param {Object} projet - Données du projet à ajouter.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  addProjet: async (projet) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(`${API_URL}/projet/addprojet`, projet, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet :", error);
      throw error;
    }
  },

  /**
   * Mettre à jour un projet.
   * @param {number} id - ID du projet à mettre à jour.
   * @param {Object} projet - Données du projet mises à jour.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  updateProjet: async (id, projet) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.put(`${API_URL}/projet/updateprojet/${id}`, projet, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du projet :", error);
      throw error;
    }
  },

  /**
   * Supprimer un projet.
   * @param {number} id - ID du projet à supprimer.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  deleteProjet: async (id) => {
    try {
      const token = localStorage.getItem("token"); // Récupération du token
      const response = await axios.delete(`${API_URL}/projet/deleteprojet/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression du projet :", error);
      throw error;
    }
  },
};

export default GrouperessourceService;
