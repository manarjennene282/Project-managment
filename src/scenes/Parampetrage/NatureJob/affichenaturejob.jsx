import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  useTheme,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Parametrageservice from "../../../services/ParametrageService";
import Header from "../../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddNatureJob from "./AddNatureJob";
import ModifeNatureJob from "./ModifeNatureJob";

const Affichenaturejob = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [naturejobs, setNatureJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentNatureJob, setCurrentNatureJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Parametrageservice.getNatureJob();
        const dataWithIds = response.data.map((item, index) => ({
          ...item,
          internalId: index,
        }));
        setNatureJobs(dataWithIds);
        setLoading(false);
      } catch (err) {
        console.error("Erreur de chargement :", err);
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteClick = (internalId) => {
    setSelectedId(internalId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const jobToDelete = naturejobs.find(
        (j) => j.internalId === selectedId
      );
  
      if (!jobToDelete || !jobToDelete.id_natureJob) {
        console.error("ID invalide pour la suppression !");
        setOpenErrorSnackbar(true);
        return;
      }

      await Parametrageservice.deletenaturejob(jobToDelete.id);
  
      setNatureJobs((prev) =>
        prev.filter((job) => job.internalId !== selectedId)
      );
  
      setOpenDeleteDialog(false);
      setOpenSuccessSnackbar(true);
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      setOpenErrorSnackbar(true);
    } finally {
      setSelectedId(null);
    }
  };

  const handleEdit = (job) => {
    setCurrentNatureJob(job);
    setOpenEditModal(true);
  };

  const handleAddNatureJob = (newJob) => {
    const newInternalId = naturejobs.length > 0 
      ? Math.max(...naturejobs.map(j => j.internalId)) + 1
      : 0;

    setNatureJobs((prev) => [
      ...prev,
      { ...newJob, internalId: newInternalId },
    ]);
  };

  const handleUpdateNatureJob = (updatedJob) => {
    setNatureJobs((prev) =>
      prev.map((job) =>
        job.internalId === updatedJob.internalId
          ? updatedJob
          : job
      )
    );
  };

  const columns = [
    {
      field: "id_natureJob",
      headerName: "ID_Nature_Job",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "libelle",
      headerName: "Libellé",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      align: "center",
      renderCell: (params) => (
        <Box display="flex" gap="10px">
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row)}
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: "white",
              "&:hover": { backgroundColor: colors.blueAccent[600] },
            }}
          >
            Modifier
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteClick(params.row.internalId)}
            sx={{
              backgroundColor: colors.redAccent[500],
              color: "white",
              "&:hover": { backgroundColor: colors.redAccent[600] },
            }}
          >
            Supprimer
          </Button>
        </Box>
      ),
    },
  ];

  const filteredJobs = naturejobs.filter((job) =>
    Object.values(job).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box m="20px">
      <AddNatureJob
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAddNatureJob={handleAddNatureJob}
      />

      {currentNatureJob && (
        <ModifeNatureJob
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          job={currentNatureJob}
          onUpdate={handleUpdateNatureJob}
        />
      )}

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "4px",
            width: "400px",
            backgroundColor: colors.primary[400],
            boxShadow: theme.shadows[10],
          }
        }}
      >
        <Box
          p={2}
          backgroundColor={colors.blueAccent[700]}
          color={colors.grey[100]}
        >
          <DialogTitle sx={{ p: 0 }}>
            <Typography variant="h3" fontWeight="600">
              Supprimer une Nature Job
            </Typography>
          </DialogTitle>
        </Box>

        <DialogContent sx={{ p: 3 }}>
          <DialogContentText sx={{ color: colors.grey[100] }}>
            Êtes-vous sûr de vouloir supprimer définitivement cette nature de job ?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            variant="contained"
            sx={{
              backgroundColor: colors.grey[700],
              color: "white",
              "&:hover": { backgroundColor: colors.grey[800] },
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              backgroundColor: colors.redAccent[500],
              color: "white",
              "&:hover": { backgroundColor: colors.redAccent[600] },
            }}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notifications en haut à droite */}
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 6 }}
      >
        <Alert
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: colors.greenAccent[600],
            color: "white",
          }}
        >
          Suppression effectuée avec succès !
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenErrorSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 6 }}
      >
        <Alert
          severity="error"
          sx={{
            width: "100%",
            backgroundColor: colors.redAccent[600],
            color: "white",
          }}
        >
          Erreur lors de la suppression !
        </Alert>
      </Snackbar>

      <Box display="flex" justifyContent="flex-end" mb="20px">
        <Button
          variant="contained"
          onClick={() => setOpenAddModal(true)}
          sx={{
            backgroundColor: colors.greenAccent[500],
            color: "white",
            "&:hover": { backgroundColor: colors.greenAccent[600] },
          }}
        >
          Ajouter une Nature Job
        </Button>
      </Box>

      <Header
        title=" Nature Jobs"
        subtitle="Liste des types de jobs"
      />

      <Box mb="20px">
        <TextField
          label="Rechercher une nature job"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 400 }}
        />
      </Box>

      {loading ? (
        <Typography>Chargement en cours...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: `2px solid ${colors.blueAccent[500]}`,
            },
          }}
        >
          <DataGrid
            rows={filteredJobs}
            columns={columns}
            getRowId={(row) => row.internalId}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};

export default Affichenaturejob;