import axios from "axios";

const API_URL = 'http://localhost:8000/api'; // Remplacez par l'URL de votre API backend Laravel

const PresenceService = {
  /**
   * Ajouter des présences.
   * @param {Array} presences - Tableau contenant les données des présences.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  addPresence: async (presences) => {
    try {
      const token = localStorage.getItem("token"); // ou obtenez le token de la session actuelle
      const response = await axios.post(`${API_URL}/presence/addpresence`, 
        { data: presences },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajoutez le token d'authentification
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout des présences :", error);
      throw error;
    }
  },
  
  /**
   * Récupérer les présences.
   * @returns {Promise} - Promesse contenant les données des présences.
   */
  getPresences: async () => {
    const token = localStorage.getItem("token"); // ou obtenez le token de la session actuelle

    try {


      const response = await axios.get(`${API_URL}/presence/getpresence`,  { data: response },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ajoutez le token d'authentification
        }
      });
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des présences :", error);
      throw error;
    }
  },


  /**
   * Mettre à jour une présence spécifique.
   * @param {number} id - Identifiant de la présence à mettre à jour.
   * @param {Object} presence - Données à mettre à jour (ex: presence_matin, presence_apresmidi).
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  updatePresence: async (id, presence) => {
    try {
      const token = localStorage.getItem("token"); // ou obtenez le token de la session actuelle
      const response = await axios.put(`${API_URL}/presence/updatepresence/${id}`, presence, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajoutez le token d'authentification
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la présence :", error);
      throw error;
    }
  },

};

export default PresenceService;
