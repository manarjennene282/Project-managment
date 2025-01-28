import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Modal,
  Snackbar,
  Alert,
} from '@mui/material';
import { tokens } from '../../../theme'; // Adjust the import path as needed
import Parametrageservice from '../../../services/ParametrageService'; // Adjust the import path as needed

function AddGroupe({ open, onClose, onAddGroup }) {
  const colors = tokens((theme) => theme.palette.mode); // Use your theme

  // State to manage form values
  const [formData, setFormData] = useState({
    id_grp: "",
    liblle: "",
  });

  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for errors
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for confirmation popup

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call the service to add a groupe de ressource
      await Parametrageservice.AddGroupe(formData);
      onAddGroup(formData); // Add the group of society to the list
      setFormData({
        id_grp: "",
        liblle: "",
      });
      setOpenSnackbar(true); // Show confirmation popup
      onClose(); // Close the modal
    } catch (err) {
      console.error("Erreur lors de l'ajout du groupe ressource :", err);
      setError("Une erreur est survenue lors de l'ajout de la groupe ressource.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modal for adding a groupe ressource */}
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Ajouter un groupe
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* ID groupe ressource Field */}
            <TextField
              fullWidth
              label="ID Groupe ressource"
              name="id_grp"
              value={formData.id_grp}
              onChange={handleChange}
              margin="normal"
              required
            />

            {/* Libellé Field */}
            <TextField
              fullWidth
              label="Libellé"
              name="liblle"
              value={formData.liblle}
              onChange={handleChange}
              margin="normal"
              required
            />

            {/* Error Handling */}
            {error && (
              <Typography color="error" mt={2}>
                {error}
              </Typography>
            )}

            {/* Cancel and Add Buttons */}
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                onClick={onClose}
                variant="contained"
                sx={{
                  backgroundColor: colors.redAccent[500],
                  color: "white",
                  "&:hover": {
                    backgroundColor: colors.redAccent[600],
                  },
                }}
                disabled={loading}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  color: "white",
                  "&:hover": {
                    backgroundColor: colors.greenAccent[600],
                  },
                }}
                disabled={loading}
              >
                {loading ? "Ajout..." : "Ajouter"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Confirmation Popup (Snackbar) */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Display duration (3 seconds)
        onClose={() => setOpenSnackbar(false)} // Close the popup
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position at top-right
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: colors.greenAccent[500], // Custom green color
            color: "white", // White text
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Shadow for better visibility
          }}
        >
          Le groupe ressource a été ajoutée avec succès !
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddGroupe;