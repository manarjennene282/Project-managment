import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
const fetchAllStatut = async () => {
  const { data } = await axios.get(`${baseUrl}/parametrage/statut`, config);
  console.log("data", data);
  return data;
};

// Export the hook as default
const useStatutQuery = () => {
  return useQuery(["allstat"], fetchAllStatut);
};

export default useStatutQuery;
