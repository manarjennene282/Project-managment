import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { tokens } from "../../../theme";
import Parametrageservice from "../../../services/ParametrageService"; // Importez le service

function AddTypeProjetModal({ open, onClose, onAddProject }) {
  const colors = tokens((theme) => theme.palette.mode);

  // États pour gérer les valeurs du formulaire
  const [formData, setFormData] = useState({
    libelle: "",
    description: "",
  });

  const [loading, setLoading] = useState(false); // État pour gérer le chargement
  const [error, setError] = useState(""); // État pour gérer les erreurs

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation simple
    if (!formData.libelle || !formData.description) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }

    try {
      // Appeler la fonction `addTypeProjet` du service
      const response = await Parametrageservice.addTypeProjet(formData);

      // Si l'ajout est réussi, appeler la fonction `onAddProject` pour mettre à jour l'état parent
      onAddProject(response.data);

      // Réinitialiser le formulaire et fermer le modal
      setFormData({
        libelle: "",
        description: "",
      });
      onClose();
    } catch (err) {
      console.error("Erreur lors de l'ajout du type de projet :", err);
      setError("Une erreur s'est produite lors de l'ajout du type de projet.");
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
          Ajouter un Type de Projet
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Champ Libellé */}
          <TextField
            fullWidth
            label="Libellé"
            name="libelle"
            value={formData.libelle}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Champ Description (zone de texte multiligne) */}
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline // Permettre plusieurs lignes
            rows={4} // Nombre de lignes visibles
            required
          />

          {/* Gestion des erreurs */}
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}

          {/* Boutons Annuler et Ajouter */}
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
  );
}

export default AddTypeProjetModal;