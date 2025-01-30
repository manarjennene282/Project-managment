import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import JobService from "../../services/JobService" // Assurez-vous de créer ce service pour l'API
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

import AddJobModal from "./AddJobModal"; // Pour ajouter un job
import EditJobModal from "./EditJobModal"; // Pour modifier un job

const Creationjob = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  // Récupérer les jobs depuis le serveur
  const fetchJobs = async () => {
    try {
      const response = await JobService.getJobs();
      setJobs(response.data);  // Assurez-vous que la réponse de l'API est bien structurée.
      setLoading(false);
    } catch (err) {
      setError("Erreur lors de la récupération des jobs.");
      setLoading(false);
    }
  };

  // Supprimer un job
  const handleDelete = async (id_job) => {
    try {
      await JobService.deleteJob(id_job);
      // Rafraîchir la liste après la suppression
      setJobs((prevJobs) => prevJobs.filter((job) => job.id_job !== id_job));
    } catch (err) {
      console.error("Erreur lors de la suppression du job :", err);
      setError("Erreur lors de la suppression du job.");
    }
  };

  // Ouvrir le modal d'édition
  const handleEdit = (job) => {
    setCurrentJob(job);
    setOpenEditModal(true);
  };

  // Ajouter un job
  const handleAddJob = async (newJob) => {
    try {
      const response = await JobService.addJob(newJob);  // Ajouter un job via le service API
      setJobs((prevJobs) => [...prevJobs, response.data]);  // Ajouter le job à la liste après création
    } catch (err) {
      console.error("Erreur lors de l'ajout du job :", err);
      setError("Erreur lors de l'ajout du job.");
    }
  };

  // Mettre à jour un job
  const handleUpdateJob = async (updatedJob) => {
    try {
      const response = await JobService.updateJob(updatedJob);  // Mettre à jour via le service API
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id_job === updatedJob.id_job ? response.data : job))
      );
    } catch (err) {
      console.error("Erreur lors de la mise à jour du job :", err);
      setError("Erreur lors de la mise à jour du job.");
    }
  };

  // Colonnes pour le DataGrid
  const columns = [
    { field: "id_job", headerName: "ID Job", flex: 1, align: "center", headerAlign: "center" },
    { field: "prt_idJob", headerName: "Parent Job ID", flex: 1, align: "center", headerAlign: "center" },
    { field: "libelle_job", headerName: "Libellé", flex: 1, align: "center", headerAlign: "center" },
    { field: "description_job", headerName: "Description", flex: 1.5, align: "center", headerAlign: "center" },
    { field: "Date_debut_prev", headerName: "Début Prévu", flex: 1, align: "center", headerAlign: "center" },
    { field: "Date_fin_prevu", headerName: "Fin Prévue", flex: 1, align: "center", headerAlign: "center" },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box display="flex" gap="10px" justifyContent="center">
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row)}
            sx={{
              backgroundColor: colors.blueAccent[500],
              "&:hover": { backgroundColor: colors.blueAccent[600] },
              textTransform: "none",
            }}
          >
            Modifier
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id_job)}
            sx={{
              backgroundColor: colors.redAccent[500],
              "&:hover": { backgroundColor: colors.redAccent[600] },
              textTransform: "none",
            }}
          >
            Supprimer
          </Button>
        </Box>
      ),
    },
  ];

  // Récupérer les jobs au chargement du composant
  useEffect(() => {
    fetchJobs();
  }, []);

  // Filtrer les jobs selon la recherche
  const filteredJobs = jobs.filter((job) =>
    job.libelle_job.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box m="20px">
      <AddJobModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAddJob={handleAddJob}
      />

      {currentJob && (
        <EditJobModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          job={currentJob}
          onUpdate={(updatedJob) => {
            handleUpdateJob(updatedJob);
            setOpenEditModal(false);
          }}
        />
      )}

      <Box display="flex" justifyContent="flex-end" mb="20px">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddModal(true)}
          sx={{
            backgroundColor: colors.greenAccent[500],
            "&:hover": { backgroundColor: colors.greenAccent[600] },
          }}
        >
          Ajouter un Job
        </Button>
      </Box>

      <Header title="Liste des Jobs" subtitle="Gestion des jobs" />

      <Box display="flex" justifyContent="flex-start" mb="20px">
        <TextField
          label="Rechercher un job"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "400px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
              "&:hover fieldset": { borderColor: colors.blueAccent[500] },
            },
          }}
        />
      </Box>

      {loading ? (
        <Typography>Chargement...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box height="60vh">
          <DataGrid
            rows={filteredJobs}
            columns={columns}
            rowHeight={50}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};

export default Creationjob;
