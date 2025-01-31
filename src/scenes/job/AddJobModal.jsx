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
import JobService from "../../services/JobService";  // Assure-toi que le service existe
import Parametrageservice from "../../services/ParametrageService"; // Si tu as besoin d'autres données

function AddJobModal({ open, onClose, onAddJob }) {
  const colors = tokens((theme) => theme.palette.mode);

  const [formData, setFormData] = useState({
    id_job: "",
    prt_idJob: "",
    libelle_job: "",
    description_job: "",
    remarque_job: "",
    Date_debut_prev: "",
    Date_fin_prevu: "",
    Date_debut: "",
    Date_fin: "",
    id_statut: "",
    id_typJob: "",
    id_natureJob: "",
  });

  const [statuts, setStatuts] = useState([]);
  const [types, setTypes] = useState([]);
  const [natureJobs, setNatureJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParametrages = async () => {
      try {
        const [statutsResponse, typesResponse, natureJobsResponse] = await Promise.all([
          Parametrageservice.getStatuts(),
          Parametrageservice.getTypes(),
          Parametrageservice.getNatureJobs(),
        ]);
        setStatuts(statutsResponse.data);
        setTypes(typesResponse.data);
        setNatureJobs(natureJobsResponse.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des paramètres :", err);
      }
    };

    fetchParametrages();
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

    if (!formData.libelle_job || !formData.description_job) {
      setError("Veuillez remplir les champs obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const response = await JobService.addJob(formData);
      if (response && response.data) {
        onAddJob(response.data);
        setFormData({
          id_job: "",
          prt_idJob: "",
          libelle_job: "",
          description_job: "",
          remarque_job: "",
          Date_debut_prev: "",
          Date_fin_prevu: "",
          Date_debut: "",
          Date_fin: "",
          id_statut: "",
          id_typJob: "",
          id_natureJob: "",
        });
        onClose();
      } else {
        setError("La réponse de l'API est invalide.");
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout du job :", err);
      setError("Une erreur s'est produite lors de l'ajout du job.");
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
          Ajouter un Nouveau Job
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Colonne gauche */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="ID Job"
                name="id_job"
                value={formData.id_job}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="ID Prt Job"
                name="prt_idJob"
                value={formData.prt_idJob}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Libellé du Job"
                name="libelle_job"
                value={formData.libelle_job}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Description"
                name="description_job"
                value={formData.description_job}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>

            {/* Colonne droite */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Remarque"
                name="remarque_job"
                value={formData.remarque_job}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Date de début prévue"
                name="Date_debut_prev"
                type="date"
                value={formData.Date_debut_prev}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Date de fin prévue"
                name="Date_fin_prevu"
                type="date"
                value={formData.Date_fin_prevu}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="id_statut-label">Statut</InputLabel>
                <Select
                  labelId="id_statut-label"
                  name="id_statut"
                  value={formData.id_statut}
                  onChange={handleChange}
                >
                  {statuts.map((statut) => (
                    <MenuItem key={statut.id_statut} value={statut.id_statut}>
                      {statut.libelle_statut}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

export default AddJobModal;
