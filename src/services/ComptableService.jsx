import axios from "axios";

const API_URL = "http://localhost:8000/api";

const ComptableService = {
  /**
   * Récupérer les ressources comptables.
   * @returns {Promise} - Promesse contenant les données comptables.
   */
  async getComptable() {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${API_URL}/comptable/getcomptable`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des données comptables :", error);
      throw error;
    }
  },
};

export default ComptableService;
