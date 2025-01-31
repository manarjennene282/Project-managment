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

const Modifetypeequipement = ({ open, onClose, typeEquipement, onUpdate }) => {
  const colors = tokens((theme) => theme.palette.mode);

  // State to manage form values
  const [formData, setFormData] = useState({
    id_typeequipement: typeEquipement?.id_typeequipement || "",
    libelle: typeEquipement?.libelle || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Update form when typeEquipement changes
  useEffect(() => {
    if (typeEquipement) {
      setFormData({
        id_typeequipement: typeEquipement.id_typeequipement,
        libelle: typeEquipement.libelle,
      });
    }
  }, [typeEquipement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await Parametrageservice.updatetypeequipement(typeEquipement.id, formData); // Call service to update typeEquipement
      onUpdate({ ...typeEquipement, ...formData }); // Update the typeEquipements list
      setOpenSnackbar(true); // Show success notification
      onClose(); // Close the modal
    } catch (err) {
      console.error("Error updating typeEquipement:", err);
      setError("Failed to update. Please try again.");
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
            Modifier le Type d'Équipement
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

export default Modifetypeequipement;
