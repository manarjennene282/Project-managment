import React, { useState, useEffect } from "react";
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

const ModifeRelProjet = ({ open, onClose, projet, onUpdate }) => {
  const colors = tokens((theme) => theme.palette.mode);

  // État pour gérer les valeurs du formulaire
  const [formData, setFormData] = useState({
    id_RelProjet: projet?.id_RelProjet || "",
    libelle: projet?.libelle || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Mettre à jour le formulaire lorsque le projet change
  useEffect(() => {
    if (projet) {
      setFormData({
        id_RelProjet: projet.id_RelProjet,
        libelle: projet.libelle,
      });
    }
  }, [projet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await Parametrageservice.updaterelprojet(projet.id, formData); // Appel du service pour mettre à jour le relation projet
      onUpdate({ ...projet, ...formData }); // Mettre à jour la liste des projets
      setOpenSnackbar(true); // Afficher la notification de succès
      onClose(); // Fermer le modal
    } catch (err) {
      console.error("Erreur lors de la modification :", err);
      setError("Échec de la modification. Veuillez réessayer.");
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
            Modifier le Relation Projet
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="ID Relation Projet"
              name="id_RelProjet"
              value={formData.id_RelProjet}
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

            <Box mt={2} display="flex" justifyContent="space-between" gap={2}>
              <Button
                onClick={onClose}
                variant="contained"
                sx={{
                  flex: 1,
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
                  flex: 1,
                  backgroundColor: colors.greenAccent[500],
                  color: "white",
                  "&:hover": { backgroundColor: colors.greenAccent[600] },
                }}
                disabled={loading}
              >
                {loading ? "En cours..." : "Enregistrer"}
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
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: colors.greenAccent[600],
            color: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          Modification effectuée avec succès !
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModifeRelProjet;