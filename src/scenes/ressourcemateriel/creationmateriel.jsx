import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  Alert
} from "@mui/material";
import { tokens } from "../../theme";
import RessourceMaterielService from "../../services/RessourceMaterielService";
import Parametrageservice from "../../services/ParametrageService";

const creationmateriel = ({ open, onClose, ressource, onUpdate }) => {
  const colors = tokens((theme) => theme.palette.mode);

  const [formData, setFormData] = useState({
    id_ressh: "",
    cin: "",
    matricule: "",
    nom: "",
    prenom: "",
    alias: "",
    email: "",
    gsm: "",
    id_grp: "",
  });

  const [groupes, setGroupes] = useState([]);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

  useEffect(() => {
    if (ressource) {
      setFormData({ ...ressource });
    }
  }, [ressource]);

  useEffect(() => {
    const fetchGroupes = async () => {
      try {
        const response = await Parametrageservice.getGroupeRessource();
        setGroupes(response.data || []);
      } catch (err) {
        console.error("Erreur lors de la récupération des groupes :", err);
        setGroupes([]);
      }
    };
    fetchGroupes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RessourceMaterielService.updateRessourceMateriel(formData.id_ressh, formData);
      onUpdate(formData);
      setOpenSuccessSnackbar(true); // Affiche le message de succès
      onClose();
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
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
          width: "50%",
          maxHeight: "80vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Modifier une Ressource Materiel
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Colonne gauche */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Id Ressource"
                name="id_ressh"
                value={formData.id_ressh || ""}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="CIN"
                name="cin"
                value={formData.cin}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Matricule"
                name="matricule"
                value={formData.matricule}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>

            {/* Colonne droite */}
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="id_grp-label">Groupe</InputLabel>
                <Select
                  labelId="id_grp-label"
                  name="id_grp"
                  value={formData.id_grp}
                  onChange={handleChange}
                >
                  {groupes.map((groupe) => (
                    <MenuItem key={groupe.id_grp} value={groupe.id_grp}>
                      {groupe.id_grp}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Alias"
                name="alias"
                value={formData.alias}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="GSM"
                name="gsm"
                value={formData.gsm}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
          </Grid>
          <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              onClick={onClose}
              variant="contained"
              sx={{ backgroundColor: colors.redAccent[500], color: "white" }}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: colors.greenAccent[500], color: "white" }}
            >
              Enregistrer
            </Button>
          </Box>
        </form>

     

      </Box>
    </Modal>
  );
};

export default creationmateriel;
