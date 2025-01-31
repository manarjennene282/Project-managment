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
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

import Addtypeequipement from "./Addtypeequipement";
import Parametrageservice from "../../../services/ParametrageService";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import Modifetypeequipement from "./Modifetypeequipement";

const AfficheTypeEquipement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [typeEquipements, setTypeEquipements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentTypeEquipement, setCurrentTypeEquipement] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [typeEquipementToDelete, setTypeEquipementToDelete] = useState(null);

  const [actionMessage, setActionMessage] = useState("");

  // Function to handle updating a typeEquipement
  const handleUpdateTypeEquipement = (updatedTypeEquipement) => {
    setTypeEquipements((prevEquipements) =>
      prevEquipements.map((equipement) =>
        equipement.id_typeequipement === updatedTypeEquipement.id_typeequipement ? updatedTypeEquipement : equipement
      )
    );
    setOpenEditModal(false); // Close the modal after update
    setActionMessage("Modification réussie !"); // Set success message for modification
    setOpenSuccessSnackbar(true); // Trigger success snackbar
  };

  // Function to handle deletion of a typeEquipement
  const handleDelete = async () => {
    if (typeEquipementToDelete) {
      try {
        await Parametrageservice.deletetypeequipement(typeEquipementToDelete.id);

        setOpenDeleteDialog(false);
        setActionMessage("Suppression réussie !");
        setOpenSuccessSnackbar(true);
      } catch (err) {
        console.error("Error while deleting typeEquipement:", err);
        setOpenErrorSnackbar(true); // Show error snackbar if deletion fails
      }
    }
  };

  // Function to open edit modal
  const handleEdit = (equipement) => {
    setCurrentTypeEquipement(equipement);
    setOpenEditModal(true);
  };

  // Function to add a typeEquipement
  const handleAddTypeEquipement = async (newTypeEquipement) => {
    try {
      setTypeEquipements((prevEquipements) => [...prevEquipements, newTypeEquipement]);
      setOpenAddModal(false); // Close modal after adding typeEquipement
    } catch (error) {
      console.error("Error while adding typeEquipement:", error);
    }
  };

  // Columns for the DataGrid
  const columns = [
    {
      field: "id_typeequipement",
      headerName: "Id Type Equipement",
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
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box display="flex" gap="10px" justifyContent="center">
          <Tooltip title="Modifier un type d'équipement" arrow>
            <IconButton
              onClick={() => handleEdit(params.row)}
              sx={{
                backgroundColor: '#9932CC',
                color: 'white',
                borderRadius: '50%',
                width: 30,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                "&:hover": {
                  backgroundColor: '#E0B0FF',
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Supprimer un type d'équipement" arrow>
            <IconButton
              onClick={() => {
                setTypeEquipementToDelete(params.row);
                setOpenDeleteDialog(true);
              }}
              sx={{
                backgroundColor: '#d32f2f',
                color: 'white',
                borderRadius: '50%',
                width: 30,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                "&:hover": {
                  backgroundColor: '#e57373',
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

  // Fetch the typeEquipements
  useEffect(() => {
    const fetchTypeEquipements = async () => {
      try {
        const data = await Parametrageservice.gettypeequipement();
        setTypeEquipements(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error while fetching typeEquipements:", err);
        setError("Error while fetching typeEquipements.");
        setLoading(false);
      }
    };

    fetchTypeEquipements();
  }, []);

  // Filter typeEquipements based on search query
  const filteredTypeEquipements = typeEquipements.filter((equipement) =>
    equipement.libelle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box m="20px">
      <Addtypeequipement
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAddTypeEquipement={handleAddTypeEquipement}
      />

      {currentTypeEquipement && (
        <Modifetypeequipement
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          typeEquipement={currentTypeEquipement}
          onUpdate={handleUpdateTypeEquipement}
        />
      )}

      <Box display="flex" justifyContent="flex-end" mb="20px">
        <Tooltip title="Ajouter un type d'équipement" arrow>
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => setOpenAddModal(true)}
            sx={{
              backgroundColor: '#388e3c',
              color: 'white',
              borderRadius: '50px',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              "&:hover": {
                backgroundColor: '#81c784',
              },
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              Ajouter Type Equipement
            </Typography>
            <AddIcon sx={{ marginLeft: '8px' }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Header title="Types d'équipement" subtitle="Liste des types d'équipement" />

      <Box display="flex" justifyContent="flex-start" mb="20px">
        <TextField
          label="Rechercher un type d'équipement"
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
        <Typography>Chargement...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box
          m="40px 0 0 0"
          height="60vh"
          sx={{
            "& .MuiDataGrid-root": {
              borderLeft: `none`,
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
            },
          }}
        >
    <DataGrid
  rows={typeEquipements}
  columns={columns}
  pageSize={5}
  rowsPerPageOptions={[5]}
  disableSelectionOnClick
  getRowId={(row) => row.id_typeequipement}  // Tell DataGrid to use id_typeequipement as the unique id
/>

        </Box>
      )}

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer ce type d'équipement ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Annuler
          </Button>
          <Button
            onClick={handleDelete}
            color="secondary"
            variant="contained"
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessSnackbar(false)}
      >
        <Alert onClose={() => setOpenSuccessSnackbar(false)} severity="success">
          {actionMessage}
        </Alert>
      </Snackbar>

      {/* Snackbar for error message */}
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <Alert onClose={() => setOpenErrorSnackbar(false)} severity="error">
          Une erreur s'est produite
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AfficheTypeEquipement;
