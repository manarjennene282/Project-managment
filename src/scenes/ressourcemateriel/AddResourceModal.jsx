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
import { tokens } from "../../theme"; // Adapte selon ton thème
import RessourceMService from "../../services/RessourceMService";// Service pour gérer les ressources matérielles
import ParametrageService from "../../services/ParametrageService"; // Service pour récupérer des données comme les machines ou types d'équipements

const AddResourceModal = ({ open, onClose, onAddResource }) => {
  const colors = tokens((theme) => theme.palette.mode);

  const [formData, setFormData] = useState({
    id_ressouM: "",
    libelle: "",
    id_machine: "",
    type_equip: "",
    date_acquisition: "",
    etat: "",
  });

  const [machines, setMachines] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Récupérer les machines et les types d'équipements
  useEffect(() => {
    const fetchData = async () => {
      try {
        const machineResponse = await ParametrageService.getMachines();
        const equipmentResponse = await ParametrageService.getTypesEquipement();
        setMachines(machineResponse.data || []);
        setEquipments(equipmentResponse.data || []);
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setMachines([]);
        setEquipments([]);
      }
    };

    fetchData();
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

    if (!formData.libelle || !formData.id_machine || !formData.type_equip) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const response = await RessourceMService.addRessourceMateriel(formData);
      if (response && response.data) {
        onAddResource(response.data);
        setFormData({
          id_ressouM: "",
          libelle: "",
          id_machine: "",
          type_equip: "",
          date_acquisition: "",
          etat: "",
        });
        onClose();
      } else {
        setError("La réponse de l'API est invalide.");
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout de la ressource matérielle :", err);
      setError("Une erreur s'est produite lors de l'ajout de la ressource matérielle.");
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
          Ajouter une Ressource Matérielle
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Colonne gauche */}
            <Grid item xs={6}>
              <TextField fullWidth label="ID Ressource" name="id_ressouM" value={formData.id_ressouM} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Libelle" name="libelle" value={formData.libelle} onChange={handleChange} margin="normal" required />
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="id_machine-label">Machine</InputLabel>
                <Select labelId="id_machine-label" name="id_machine" value={formData.id_machine} onChange={handleChange}>
                  {machines.map((machine) => (
                    <MenuItem key={machine.id_machine} value={machine.id_machine}>
                      {machine.libelle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="type_equip-label">Type d'Équipement</InputLabel>
                <Select labelId="type_equip-label" name="type_equip" value={formData.type_equip} onChange={handleChange}>
                  {equipments.map((equip) => (
                    <MenuItem key={equip.id_type} value={equip.id_type}>
                      {equip.libelle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Colonne droite */}
            <Grid item xs={6}>
              <TextField fullWidth label="Date d'Acquisition" name="date_acquisition" value={formData.date_acquisition} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="État" name="etat" value={formData.etat} onChange={handleChange} margin="normal" required />
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
};

export default AddResourceModal;
