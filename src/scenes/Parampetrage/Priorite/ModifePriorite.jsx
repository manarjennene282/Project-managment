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

function ModifePriorite({ open, onClose, priorite, onUpdate }) {
  const colors = tokens((theme) => theme.palette.mode);

  const [formData, setFormData] = useState({
    id_prio: priorite?.id_prio || "",
    liblle: priorite?.liblle || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Parametrageservice.updatePriorite(priorite.id, formData);
      onUpdate({ id: priorite.id, ...formData });
      onClose();
    } catch (err) {
      console.error("Erreur lors de la mise à jour du type de projet :", err);
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
            Modifier une Priorité
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="ID Priorité"
              name="id_prio"
              value={formData.id_prio}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Libellé"
              name="liblle"
              value={formData.liblle}
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
          La priorité a été modifiée avec succès !
        </Alert>
      </Snackbar>
    </>
  );
}

export default ModifePriorite;