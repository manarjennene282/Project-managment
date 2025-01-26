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


 /**
   * Récupérer toutes les priorités.
   * @returns {Promise} - Promesse contenant les données des priorités.
   */
 getPriorites: async () => {
  const token = localStorage.getItem("token"); 
  if (!token) {
    throw new Error("Token Vide Ou Invalide");
  }

  try {
    const response = await axios.get(`${API_URL}/parametrage/priorite`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des priorités :", error);
    throw error;
  }
},

/**
 * Ajouter une priorité.
 * @param {Object} priorite - Données de la priorité à ajouter.
 * @returns {Promise} - Promesse contenant la réponse de l'API.
 */
addPriorite: async (priorite) => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.post(`${API_URL}/parametrage/priorite`, priorite, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la priorité :", error);
    throw error;
  }
},

/**
 * Mettre à jour une priorité.
 * @param {number} id - ID de la priorité à mettre à jour.
 * @param {Object} priorite - Données de la priorité mises à jour.
 * @returns {Promise} - Promesse contenant la réponse de l'API.
 */
updatePriorite: async (id, priorite) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token :", token); // Debugging
    console.log("Données envoyées :", priorite); // Debugging

    const response = await axios.put(`${API_URL}/parametrage/priorite/${id}`, priorite, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log("Réponse du backend :", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la priorité :", error);
    throw error;
  }
},

/**
 * Supprimer une priorité.
 * @param {number} id - ID de la priorité à supprimer.
 * @returns {Promise} - Promesse contenant la réponse de l'API.
 */
deletePriorite: async (id) => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.delete(`${API_URL}/parametrage/priorite/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la priorité :", error);
    throw error;
  }
},

//modele Nature Structure 


/**
   * Récupérer toutes les priorités.
   * @returns {Promise} - Promesse contenant les données des priorités.
   */
getNaturestruct: async () => {
  const token = localStorage.getItem("token"); 
  if (!token) {
    throw new Error("Token Vide Ou Invalide");
  }

  try {
    const response = await axios.get(`${API_URL}/parametrage/naturestruc`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des priorités :", error);
    throw error;
  }
},

/**
 * Ajouter une priorité.
 * @param {Object} priorite - Données de la priorité à ajouter.
 * @returns {Promise} - Promesse contenant la réponse de l'API.
 */
addNatuireStruct: async (natutrstruc) => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.post(`${API_URL}/parametrage/naturestruc`, natutrstruc, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la natutrstruc :", error);
    throw error;
  }
},

/**
 * Mettre à jour une priorité.
 * @param {number} id - ID de la priorité à mettre à jour.
 * @param {Object} priorite - Données de la priorité mises à jour.
 * @returns {Promise} - Promesse contenant la réponse de l'API.
 */
updateNatureStruct: async (id, natutrstruc) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Données envoyées :", natutrstruc); // Debugging

    const response = await axios.put(`${API_URL}/parametrage/naturestruc/${id}`, natutrstruc, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la natutrstruc :", error);
    throw error;
  }
},

/**
 * Supprimer une priorité.
 * @param {number} id - ID de la priorité à supprimer.
 * @returns {Promise} - Promesse contenant la réponse de l'API.
 */
deletenatutrstruc: async (id) => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.delete(`${API_URL}/parametrage/naturestruc/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la natutrstruc :", error);
    throw error;
  }
},

// parametre Narture Relation 

getNatureRelation: async () => {
  const token = localStorage.getItem("token"); 
  if (!token) {
    throw new Error("Token Vide Ou Invalide");
  }

  try {
    const response = await axios.get(`${API_URL}/parametrage/naturerelation`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des naturerelation :", error);
    throw error;
  }
},

/**
 * Ajouter une priorité.
 * @param {Object} priorite - Données de la priorité à ajouter.
 * @returns {Promise} - Promesse contenant la réponse de l'API.
 */
addNatureRelation: async (natutrstruc) => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.post(`${API_URL}/parametrage/naturerelation`, natutrstruc, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la naturerelation :", error);
    throw error;
  }
},

/**
 * Mettre à jour une priorité.
 * @param {number} id - ID de la priorité à mettre à jour.
 * @param {Object} priorite - Données de la priorité mises à jour.
 * @returns {Promise} - Promesse contenant la réponse de l'API.
 */
updateNatureRelation: async (id, natutrstruc) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Données envoyées :", natutrstruc); // Debugging

    const response = await axios.put(`${API_URL}/parametrage/naturerelation/${id}`, natutrstruc, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la naturerelation :", error);
    throw error;
  }
},

/**
 * Supprimer une priorité.
 * @param {number} id - ID de la priorité à supprimer.
 * @returns {Promise} - Promesse contenant la réponse de l'API.
 */
deleteNatureRelation: async (id) => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.delete(`${API_URL}/parametrage/naturerelation/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la naturerelation :", error);
    throw error;
  }
},








};















export default Parametrageservice;
