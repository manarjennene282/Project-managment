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
const fetchRessource = async () => {
    const { data } = await axios.get(`${baseUrl}/parametrage/typeequipement`, config);
    console.log("typeequipement", data);
    return data;
};

// Export the hook as default
const useTypeEquipQuery = () => {
    return useQuery(['logistique'], fetchRessource);
};

export default useTypeEquipQuery;
