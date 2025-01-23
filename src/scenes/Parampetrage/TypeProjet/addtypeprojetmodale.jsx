import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { tokens } from "../../../theme"; // Assurez-vous que ce chemin est correct
import Parametrageservice from "../../../services/ParametrageService"; // Assurez-vous que ce chemin est correct

function AddTypeProjetModal({ open, onClose, onAddProject }) {
  const colors = tokens((theme) => theme.palette.mode); // Utilisez votre thème

  // États pour gérer les valeurs du formulaire
  const [formData, setFormData] = useState({
    libelle: "",
    description: "",
  });

  const [loading, setLoading] = useState(false); // État pour gérer le chargement
  const [error, setError] = useState(""); // État pour gérer les erreurs
  const [openSnackbar, setOpenSnackbar] = useState(false); // État pour gérer la popup de confirmation

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
    setError(null);

    try {
      // Appel au service pour ajouter un projet
      await Parametrageservice.addTypeProjet(formData);
      onAddProject(formData); // Ajouter le projet à la liste
      setFormData({
        libelle: "",
        description: "",
      });
      setOpenSnackbar(true); // Afficher la popup de confirmation
      onClose(); // Fermer le modal
    } catch (err) {
      console.error("Erreur lors de l'ajout du type projet :", err);
      setError("Une erreur est survenue lors de l'ajout du type projet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modal pour ajouter un type de projet */}
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

      {/* Popup de confirmation (Snackbar) */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Durée d'affichage de la popup (3 secondes)
        onClose={() => setOpenSnackbar(false)} // Fermer la popup
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position en haut à droite
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: colors.greenAccent[500], // Couleur verte personnalisée
            color: "white", // Texte en blanc
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Ombre pour plus de visibilité
          }}
        >
          Le type de projet a été ajouté avec succès !
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddTypeProjetModal;