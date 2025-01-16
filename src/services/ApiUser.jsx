// ApiUser.js
import axios from 'axios';

// Définir l'URL de base de l'API
const API_URL = 'http://localhost:8000/api'; // Remplacez par l'URL de votre API backend Laravel

// Fonction pour l'inscription
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Erreur inconnue';
  }
};

// Fonction pour la connexion
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Erreur inconnue';
  }
};

// Fonction pour récupérer les informations de l'utilisateur (authentifié)
export const getUserInfo = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Erreur inconnue';
  }
};

// Fonction pour récupérer le rôle de l'utilisateur connecté 
export const getUserRole = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/getrole`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.role;  // Retourner seulement le rôle
    } catch (error) {
      throw error.response ? error.response.data : 'Erreur inconnue';
    }
  };
  
