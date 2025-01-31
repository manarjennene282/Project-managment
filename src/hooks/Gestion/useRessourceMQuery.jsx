import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/api";

// Get the token from localStorage
const token = localStorage.getItem("token");

// Create a config object for Axios headers
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

// Fetch function to retrieve all projects
const fetchAllRessourceM = async () => {
    const { data } = await axios.get(`${baseUrl}/ressourcemateriel/getrm`, config);
    console.log("ressourceM", data);
    return data;
};

// Export the hook as default
const useRessourceMQuery = () => {
    return useQuery(['allRessourcesM'], fetchAllRessourceM);
};

export default useRessourceMQuery;
