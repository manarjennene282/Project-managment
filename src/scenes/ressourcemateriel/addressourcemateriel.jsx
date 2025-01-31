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
import RessourceMaterielService from "../../services/RessourceMaterielService";


function AddRessourceMateriel({ open, onClose, onAddRessourceMateriel }) {
  const colors = tokens((theme) => theme.palette.mode);

  const [formData, setFormData] = useState({
    id_ressouM: "",
    liblle: "",
    ID_Machine: "",
    Type_equip: "",
    Date_acquisition: "",
    Date_mise_en_service: "",
    Etat: "",
    Notes: "",
  });

  const [typeequip, setTypeequip] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTypeequip = async () => {
      try {
        const response = await RessourceMaterielService.getTypeEquip();
        const data = response.data;
        setTypeequip(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur lors de la récupération des types équipement :", err);
        setTypeequip([]);
      }
    };

    fetchTypeequip();
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

    if (!formData.id_ressouM || !formData.liblle || !formData.ID_Machine || !formData.Type_equip) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const response = await RessourceMaterielService.addRessourceMateriel(formData);
      if (response && response.data) {
        onAddRessourceMateriel(response.data);
        setFormData({
            id_ressouM: "",
            liblle: "",
            ID_Machine: "",
            Type_equip: "",
            Date_acquisition: "",
            Date_mise_en_service: "",
            Etat: "",
            Notes: "",
        });
        onClose();
      } else {
        setError("La réponse de l'API est invalide.");
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout de la ressource matériel :", err);
      setError("Une erreur s'est produite lors de l'ajout de la ressource matériel.");
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
          Ajouter une Ressource matériel
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Colonne gauche (4 champs) */}
            <Grid item xs={6}>
              <TextField fullWidth label="ID Ressource" name="id_ressh" value={formData.id_ressh} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Libellé Machine" name="liblle" value={formData.liblle} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Machine" name="ID_Machine" value={formData.ID_Machine} onChange={handleChange} margin="normal" />
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="Type_equip-label">Type équipement</InputLabel>
                <Select labelId="Type_equip-label" name="Type équipement" value={formData.Type_equip} onChange={handleChange}>
                  {typeequip.map((typeequip) => (
                    <MenuItem key={typeequip.Type_equip} value={typeequip.Type_equip}>
                      {typeequip.Type_equip}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Colonne droite (5 champs) */}
            <Grid item xs={6}>
              <TextField fullWidth label="Date d'acquisition" name="Date_acquisition" value={formData.Date_acquisition} onChange={handleChange} margin="normal" required />
              <TextField fullWidth label="Date de mise en service" name="Date_mise_en_service" value={formData.Date_mise_en_service} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Notes" name="email" value={formData.Notes} onChange={handleChange} margin="normal" required />
              <TextField fullWidth label="Etat" name="Etat" value={formData.Etat} onChange={handleChange} margin="normal" required />
              
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

export default AddRessourceMateriel;
