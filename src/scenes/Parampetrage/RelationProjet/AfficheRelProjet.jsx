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
import AddRelProjet from "./AddRelProjet";
import ModifeRelProjet from "./ModifeRelProjet";

const AfficheRelProjet = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [relprojets, setRelProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentRelProjet, setCurrentRelProjet] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Parametrageservice.getrelprojet();
        const dataWithIds = response.data.map((item, index) => ({
          ...item,
          internalId: index,
        }));
        setRelProjets(dataWithIds);
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
      const projetToDelete = relprojets.find(
        (j) => j.internalId === selectedId
      );

      if (!projetToDelete || !projetToDelete.id_RelProjet) {
        console.error("ID invalide pour la suppression !");
        setOpenErrorSnackbar(true);
        return;
      }

      await Parametrageservice.deleterelprojet(projetToDelete.id);

      setRelProjets((prev) =>
        prev.filter((projet) => projet.internalId !== selectedId)
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

  const handleEdit = (projet) => {
    setCurrentRelProjet(projet);
    setOpenEditModal(true);
  };

  const handleAddRelProjet = (newProjet) => {
    const newInternalId = relprojets.length > 0
      ? Math.max(...relprojets.map(j => j.internalId)) + 1
      : 0;

    setRelProjets((prev) => [
      ...prev,
      { ...newProjet, internalId: newInternalId },
    ]);
  };

  const handleUpdateRelProjet = (updatedProjet) => {
    setRelProjets((prev) =>
      prev.map((projet) =>
        projet.internalId === updatedProjet.internalId
          ? updatedProjet
          : projet
      )
    );
  };

  const columns = [
    {
      field: "id_RelProjet",
      headerName: "ID_RelProjet",
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

  const filteredProjets = relprojets.filter((projet) =>
    Object.values(projet).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box m="20px">
      <AddRelProjet
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAddRelProjet={handleAddRelProjet}
      />

      {currentRelProjet && (
        <ModifeRelProjet
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          projet={currentRelProjet}
          onUpdate={handleUpdateRelProjet}
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
              Supprimer un Relation Projet
            </Typography>
          </DialogTitle>
        </Box>

        <DialogContent sx={{ p: 3 }}>
          <DialogContentText sx={{ color: colors.grey[100] }}>
            Êtes-vous sûr de vouloir supprimer définitivement ce relation projet ?
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
          Ajouter un Relation Projet
        </Button>
      </Box>

      <Header
        title="Relation Projets"
        subtitle="Liste des relations projets"
      />

      <Box mb="20px">
        <TextField
          label="Rechercher un relation projet"
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
            rows={filteredProjets}
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

export default AfficheRelProjet;