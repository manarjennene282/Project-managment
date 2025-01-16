import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const EditProjectModal = ({ open, onClose, project, onUpdate }) => {
  const [formData, setFormData] = useState({
    nom: project?.nom || "",
    datedebut: project?.datedebut || "",
    datefinestime: project?.datefinestime || "",
    datefinreelle: project?.datefinreelle || "",
    departement: project?.departement || "",
  });

  // Gestion des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion de la soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ id: project.id, ...formData });
    onClose();
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
          <TextField
            label="Nom du Projet"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Date de Début"
            name="datedebut"
            value={formData.datedebut}
            onChange={handleChange}
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            label="Date de Fin Estimée"
            name="datefinestime"
            value={formData.datefinestime}
            onChange={handleChange}
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            label="Date de Fin Réelle"
            name="datefinreelle"
            value={formData.datefinreelle}
            onChange={handleChange}
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            label="Département"
            name="departement"
            value={formData.departement}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Enregistrer
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Annuler
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditProjectModal;
