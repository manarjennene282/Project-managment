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
} from "@mui/material";
import { tokens } from "../../theme";
import RessourceHumaineService from "../../services/RessourceHumaineService";
import Parametrageservice from "../../services/ParametrageService";

function AddRessourceHumaine({ open, onClose, onAddRessourceHumaine }) {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroupes = async () => {
      try {
        const response = await Parametrageservice.getGroupeRessource();
        const data = response.data;
        setGroupes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur lors de la récupération des groupes :", err);
        setGroupes([]);
      }
    };

    fetchGroupes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.nom || !formData.prenom || !formData.email || !formData.gsm) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const response = await RessourceHumaineService.addRessourcehumaine(formData);
      if (response && response.data) {
        onAddRessourceHumaine(response.data);
        setFormData({
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
        onClose();
      } else {
        setError("La réponse de l'API est invalide.");
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout de la ressource humaine :", err);
      setError("Une erreur s'est produite lors de l'ajout de la ressource humaine.");
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
          Ajouter une Ressource Humaine
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Colonne gauche (4 champs) */}
            <Grid item xs={6}>
              <TextField fullWidth label="ID Ressource" name="id_ressh" value={formData.id_ressh} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="CIN" name="cin" value={formData.cin} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Matricule" name="matricule" value={formData.matricule} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Nom" name="nom" value={formData.nom} onChange={handleChange} margin="normal" required />
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="id_grp-label">Groupe</InputLabel>
                <Select labelId="id_grp-label" name="id_grp" value={formData.id_grp} onChange={handleChange}>
                  {groupes.map((groupe) => (
                    <MenuItem key={groupe.id_grp} value={groupe.id_grp}>
                      {groupe.id_grp}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Colonne droite (5 champs) */}
            <Grid item xs={6}>
              <TextField fullWidth label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} margin="normal" required />
              <TextField fullWidth label="Alias" name="alias" value={formData.alias} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" required />
              <TextField fullWidth label="GSM" name="gsm" value={formData.gsm} onChange={handleChange} margin="normal" required />
              
            </Grid>
          </Grid>
          {error && <Typography color="error" mt={2}>{error}</Typography>}
          <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={onClose} variant="contained" sx={{ backgroundColor: colors.redAccent[500], color: "white" }} disabled={loading}>
              Annuler
            </Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: colors.greenAccent[500], color: "white" }} disabled={loading}>
              {loading ? "Ajout..." : "Ajouter"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AddRessourceHumaine;
