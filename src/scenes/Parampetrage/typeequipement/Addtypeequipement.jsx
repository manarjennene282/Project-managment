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
import { tokens } from '../../../theme';
import Parametrageservice from '../../../services/ParametrageService';

function Addtypeequipement({ open, onClose, onAddTypeEquipement }) {
  const colors = tokens((theme) => theme.palette.mode);

  // État pour gérer les valeurs du formulaire
  const [formData, setFormData] = useState({
    id_typeequipement: "", 
    libelle: "", 
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await Parametrageservice.addtypeequipement(formData); // Appel du service pour ajouter un type équipement
      onAddTypeEquipement(formData); // Ajouter le type équipement à la liste
      setFormData({
        id_typeequipement: "",
        libelle: "",
      });
      setOpenSnackbar(true); // Afficher la popup de confirmation
      onClose(); // Fermer le modal
    } catch (err) {
      console.error("Erreur lors de l'ajout du type équipement :", err);
      setError("Une erreur est survenue lors de l'ajout du type équipement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            Ajouter un Type Equipement
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="ID Type Equipement"
              name="id_typeequipement"
              value={formData.id_typeequipement}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Libellé"
              name="libelle"
              value={formData.libelle}
              onChange={handleChange}
              margin="normal"
              required
            />

            {error && (
              <Typography color="error" mt={2}>
                {error}
              </Typography>
            )}

            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                onClick={onClose}
                variant="contained"
                sx={{
                  backgroundColor: colors.redAccent[500],
                  color: "white",
                  "&:hover": { backgroundColor: colors.redAccent[600] },
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
                  "&:hover": { backgroundColor: colors.greenAccent[600] },
                }}
                disabled={loading}
              >
                {loading ? "Ajout..." : "Ajouter"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: colors.greenAccent[500],
            color: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          Le type équipement a été ajouté avec succès !
        </Alert>
      </Snackbar>
    </>
  );
}

export default Addtypeequipement;
