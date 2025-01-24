import axios from "axios";

const API_URL = 'http://localhost:8000/api'; 

const Parametrageservice = {
  /**
   * Récupérer les projets.
   * @returns {Promise} - Promesse contenant les données des projets.
   */
  getTypeprojet: async () => {  
    const token = localStorage.getItem("token"); 
    if (!token) {
      throw new Error("Token Vide Ou Invalide");
    }
  
    try {
      const response = await axios.get(`${API_URL}/parametrage/showtypeprojet`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des typeprojet :", error);
      throw error;
    }
  },

  /**
   * Ajouter un projet.
   * @param {Object} typeprojet - Données du projet à ajouter.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  addTypeProjet: async (typeprojet) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(`${API_URL}/parametrage/addtypeprojet`, typeprojet, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout du type projet :", error);
      throw error;
    }
  },

  /**
   * Mettre à jour untype  projet.
   * @param {number} id - ID du type projet à mettre à jour.
   * @param {Object} typeprojet - Données du projet mises à jour.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  updateTypeProjet: async (id, typeprojet) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.put(`${API_URL}/parametrage/updatetypeprojet/${id}`, typeprojet, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du type projet :", error);
      throw error;
    }
  },

  /**
   * Supprimer un projet.
   * @param {number} id - ID du projet à supprimer.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  deleteTypeProjet: async (id) => {
    try {
      const token = localStorage.getItem("token"); // Récupération du token
      const response = await axios.delete(`${API_URL}/parametrage/deletetypeprojet/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression du type projet :", error);
      throw error;
    }
  },
};

export default Parametrageservice;
