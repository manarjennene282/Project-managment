



import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
import { tokens } from "../../../theme";
import Parametrageservice from "../../../services/ParametrageService";

function ModifeNatureStruuctureModal({ open, onClose, naturestruct, onUpdate }) {
  const colors = tokens((theme) => theme.palette.mode);

  // État pour gérer les valeurs du formulaire
  const [formData, setFormData] = useState({
    id_natureStruct: naturestruct?.id_natureStruct || "", // Initialiser avec la valeur de la nature de structure sélectionnée
    libelle: naturestruct?.libelle || "", // Initialiser avec la valeur de la nature de structure sélectionnée
  });

  const [loading, setLoading] = useState(false); // État pour gérer le chargement
  const [error, setError] = useState(""); // État pour gérer les erreurs
  const [openSnackbar, setOpenSnackbar] = useState(false); // État pour la popup de confirmation

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion de la soumission du formulaire

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Parametrageservice.updateNatureStruct(naturestruct.id, formData);
      onUpdate({ id: naturestruct.id, ...formData });
      onClose();
    } catch (err) {
      console.error("Erreur lors de la mise à jour du type de projet :", err);
    }
  };

  return (
    <>
      {/* Modal pour modifier une nature de structure */}
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
            Modifier une Nature de Structure
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Champ ID Nature de Structure */}
            <TextField
              fullWidth
              label="ID Nature de Structure"
              name="id_natureStruct"
              value={formData.id_natureStruct}
              onChange={handleChange}
              margin="normal"
            />

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

            {/* Gestion des erreurs */}
            {error && (
              <Typography color="error" mt={2}>
                {error}
              </Typography>
            )}

            {/* Boutons Annuler et Enregistrer */}
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
                {loading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Popup de confirmation (Snackbar) */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Durée d'affichage (3 secondes)
        onClose={() => setOpenSnackbar(false)} // Fermer la popup
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position en haut à droite
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: colors.greenAccent[500], // Couleur verte personnalisée
            color: "white", // Texte blanc
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Ombre pour une meilleure visibilité
          }}
        >
          La nature de structure a été modifiée avec succès !
        </Alert>
      </Snackbar>
    </>
  );
}

export default ModifeNatureStruuctureModal;