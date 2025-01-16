import axios from 'axios';

const API_URL = 'http://localhost:8000/api/role'; // Remplacez par l'URL de votre API backend Laravel

// Service pour récupérer les rôles
export const fetchRoles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Renvoie les rôles
  } catch (error) {
    throw new Error('Impossible de récupérer les rôles');
  }
};
