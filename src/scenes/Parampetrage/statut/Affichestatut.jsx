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
  Tooltip,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import { tokens } from "../../../theme";
import Parametrageservice from "../../../services/ParametrageService";
import Header from "../../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Addstatut from "./Addstatut";
import ModifeStatut from "./modifeStatut";

const Affichestatut = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [statuts, setStatuts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentStatut, setCurrentStatut] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Parametrageservice.getstatut();
        const dataWithIds = response.data.map((item, index) => ({
          ...item,
          internalId: index,
        }));
        setStatuts(dataWithIds);
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
      const statutToDelete = statuts.find(
        (s) => s.internalId === selectedId
      );

      if (!statutToDelete || !statutToDelete.id_statut) {
        console.error("ID invalide pour la suppression !");
        setOpenErrorSnackbar(true);
        return;
      }

      await Parametrageservice.deleteStattut(statutToDelete.id);

      setStatuts((prev) =>
        prev.filter((statut) => statut.internalId !== selectedId)
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

  const handleEdit = (statut) => {
    setCurrentStatut(statut);
    setOpenEditModal(true);
  };

  const handleAddStatut = (newStatut) => {
    const newInternalId = statuts.length > 0
      ? Math.max(...statuts.map(s => s.internalId)) + 1
      : 0;

    setStatuts((prev) => [
      ...prev,
      { ...newStatut, internalId: newInternalId },
    ]);
  };

  const handleUpdateStatut = (updatedStatut) => {
    setStatuts((prev) =>
      prev.map((statut) =>
        statut.internalId === updatedStatut.internalId
          ? updatedStatut
          : statut
      )
    );
  };

  const columns = [
    {
      field: "id_statut",
      headerName: "Id_Statut",
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
        <Box display="flex" gap="10px" justifyContent="center">
          <Tooltip title="Modifier un statut" arrow>
            <IconButton
              onClick={() => handleEdit(params.row)}
              sx={{
                backgroundColor: '#66bb6a',  // Vert professionnel
                color: 'white',  // Icônes blanches
                borderRadius: '50%',  // Forme circulaire
                width: 30,
                height: 30,
                display: 'flex',  // Pour centrer l'icône
                alignItems: 'center',
                justifyContent: 'center',
                "&:hover": {
                  backgroundColor: '#388e3c',  // Vert plus foncé au survol
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          {/* Bouton Supprimer */}
          <Tooltip title="Supprimer un statut" arrow>
            <IconButton
              onClick={() => {
                handleDeleteClick(params.row.id); // Définir le projet à supprimer
                setOpenDeleteDialog(true); // Ouvrir la boîte de dialogue
              }}
              sx={{
                backgroundColor: '#f44336',  // Rouge pour "Supprimer"
                color: 'white',  // Icônes blanches
                borderRadius: '50%',  // Forme circulaire
                width: 30,
                height: 30,
                display: 'flex',  // Pour centrer l'icône
                alignItems: 'center',
                justifyContent: 'center',
                "&:hover": {
                  backgroundColor: '#c62828',  // Rouge plus foncé au survol
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>

        </Box>
      ),
    },
  ];

  const filteredStatuts = statuts.filter((statut) =>
    Object.values(statut).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box m="20px">
      <Addstatut
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAddStatut={handleAddStatut}
      />

      {currentStatut && (
        <ModifeStatut
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          statut={currentStatut}
          onUpdate={handleUpdateStatut}
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
              Supprimer un Statut
            </Typography>
          </DialogTitle>
        </Box>

        <DialogContent sx={{ p: 3 }}>
          <DialogContentText sx={{ color: colors.grey[100] }}>
            Êtes-vous sûr de vouloir supprimer définitivement ce statut ?
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
          Statut supprimé avec succès !
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
        <Tooltip title="Ajouter un statut" arrow>
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => setOpenAddModal(true)}
            sx={{
              backgroundColor: '#388e3c',  // Vert pour "Ajouter"
              color: 'white',  // Icônes blanches
              borderRadius: '50px',  // Coins arrondis mais pas totalement circulaire
              padding: '8px 16px',  // Ajuste la taille pour accueillir l'icône et le texte
              display: 'flex',  // Alignement flexible pour contenu horizontal
              alignItems: 'center',  // Centrer les éléments verticalement
              justifyContent: 'center',  // Centrer les éléments horizontalement
              "&:hover": {
                backgroundColor: '#81c784',  // Vert plus clair au survol
              },
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              Ajouter Statut
            </Typography>
            <AddIcon sx={{ marginLeft: '8px' }} /> {/* Espace entre l'icône et le texte */}

          </IconButton>
        </Tooltip>
      </Box>

      <Header
        title="Gestion des Statuts"
        subtitle="Liste des statuts"
      />

      <Box mb="20px">
        <TextField
          label="Rechercher un statut"
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
              "& fieldset": {
                borderColor: colors.grey[700],
              },
              "&:hover fieldset": {
                borderColor: colors.blueAccent[500],
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.blueAccent[500],
              },
            },
            "& .MuiInputLabel-root": {
              color: colors.grey[700],
            },
            "& .MuiInputBase-input": {
              color: colors.blueAccent[500],
            },
          }}
        />
      </Box>

      {loading ? (
        <Typography>Chargement en cours...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box
          m="40px 0 0 0"
          height="60vh"
          sx={{
            "& .MuiDataGrid-root": {
              borderLeft: `none`
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              font: "Arial",
              borderBottom: `2px solid ${colors.blueAccent[500]}`,
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              textTransform: "uppercase",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${colors.grey[800]}`,
              fontSize: "13px",
              borderLeft: `2px solid ${colors.grey[200]}`,
              color: colors.grey[200],
            },
            "& .MuiDataGrid-row": {
              backgroundColor: colors.primary[700],
              "&:hover": {
                backgroundColor: colors.blueAccent[800],
              },
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: colors.blueAccent[700],
              borderTop: `2px solid ${colors.blueAccent[500]}`,
            },
            "& .MuiTablePagination-root": {
              color: colors.grey[100],
              "& .MuiIconButton-root": {
                color: colors.grey[100],
              },
              "& .Mui-disabled": {
                color: colors.grey[600],
              },
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[800],
            },
          }}
        >
          <DataGrid
            rows={filteredStatuts}
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

export default Affichestatut;