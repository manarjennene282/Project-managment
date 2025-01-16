import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import Projetservice from "../../services/Projetservice";

const AddProjectModal = ({ open, onClose, onAddProject }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    nom: "",
    datedebut: "",
    departement: "",
    datefinestime: "",
    datefinreelle: "",
  });

  const [loading, setLoading] = useState(false); // État pour indiquer si l'ajout est en cours
  const [error, setError] = useState(null); // État pour gérer les erreurs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Appel au service pour ajouter un projet
      await Projetservice.addProjet(formData);
      onAddProject(formData); 
      setFormData({
        nom: "",
        datedebut: "",
        departement: "",
        datefinestime: "",
        datefinreelle: "",
      });
      onClose(); // Ferme le modal
    } catch (err) {
      console.error("Erreur lors de l'ajout du projet :", err);
      setError("Une erreur est survenue lors de l'ajout du projet.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          Ajouter un Projet
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nom du Projet"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Date de Début"
            name="datedebut"
            type="date"
            value={formData.datedebut}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Département"
            name="departement"
            value={formData.departement}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Date de Fin Estimée"
            name="datefinestime"
            type="date"
            value={formData.datefinestime}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Date de Fin Réelle"
            name="datefinreelle"
            type="date"
            value={formData.datefinreelle}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          {/* Gestion des erreurs */}
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
          {/* Boutons Ajouter et Annuler */}
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
              Cancel
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
  );
};

export default AddProjectModal;
