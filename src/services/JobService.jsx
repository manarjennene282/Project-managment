import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api";

const JobService = {
  /**
   * Récupérer tous les jobs.
   * @returns {Promise} - Promesse contenant les données des jobs.
   */
  getAllJobs: async () => {
    try {
      const response = await axios.get(`${API_URL}/getjob`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des jobs :", error);
      throw error;
    }
  },

  /**
   * Ajouter un job.
   * @param {Object} jobData - Données du job à ajouter.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  addJob: async (jobData) => {
    try {
      const response = await axios.post(`${API_URL}/addjob`, jobData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout du job :", error);
      throw error;
    }
  },

  /**
   * Mettre à jour un job.
   * @param {number} jobId - ID du job à mettre à jour.
   * @param {Object} jobData - Données mises à jour du job.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  updateJob: async (jobId, jobData) => {
    try {
      const response = await axios.put(`${API_URL}/updatejob/${jobId}`, jobData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du job :", error);
      throw error;
    }
  },

  /**
   * Supprimer un job.
   * @param {number} jobId - ID du job à supprimer.
   * @returns {Promise} - Promesse contenant la réponse de l'API.
   */
  deleteJob: async (jobId) => {
    try {
      const response = await axios.delete(`${API_URL}/deletejob/${jobId}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression du job :", error);
      throw error;
    }
  },
};

export default JobService;
