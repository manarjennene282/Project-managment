import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import Parametrageservice from "../../../services/ParametrageService"; // Importez le service

const ModifieTypeProjet = ({ open, onClose, project, onUpdate }) => {
  // État pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    libelle: project?.libelle || "",
    description: project?.description || "",
  });

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Appeler la fonction updateTypeProjet du service
      await Parametrageservice.updateTypeProjet(project.id, formData);

      // Mettre à jour l'état parent avec les nouvelles données
      onUpdate({ id: project.id, ...formData });

      // Fermer le modal
      onClose();
    } catch (err) {
      console.error("Erreur lors de la mise à jour du type de projet :", err);
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
          Modifier le projet
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Champ Libellé */}
          <TextField
            label="Libellé"
            name="libelle"
            value={formData.libelle}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          {/* Champ Description */}
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />

          {/* Boutons Enregistrer et Annuler */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                backgroundColor: "#4cceac",
                color: "white",
                "&:hover": {
                  backgroundColor: "#3da58a",
                },
              }}
            >
              Enregistrer
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
              sx={{
                borderColor: "#db4f4a",
                color: "#db4f4a",
                "&:hover": {
                  borderColor: "#af3f3b",
                },
              }}
            >
              Annuler
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ModifieTypeProjet;