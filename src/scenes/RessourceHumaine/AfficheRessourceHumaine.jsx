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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddRessourceHumaine from "./AddRessourceHumaine";
import ModifeRessourceHumaine from "./ModifeRessourceHumaine";
import RessourceHumaineService from "../../services/RessourceHumaineService";

import { tokens } from "../../theme";
import Header from "../../components/Header";

const AfficheRessourceHumaine = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [ressourcesHumaines, setRessourcesHumaines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentRessource, setCurrentRessource] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [ressourceToDelete, setRessourceToDelete] = useState(null);

  const [actionMessage, setActionMessage] = useState("");

  // Function to handle updating a resource
  const handleUpdateRessource = (updatedRessource) => {
    setRessourcesHumaines((prevRessources) =>
      prevRessources.map((ressource) =>
        ressource.id_ressh === updatedRessource.id_ressh ? updatedRessource : ressource
      )
    );
    setOpenEditModal(false); // Close the modal after update
    setActionMessage("Modification réussie !"); // Set success message for modification
    setOpenSuccessSnackbar(true); // Trigger success snackbar
  };

  // Function to handle deletion of a resource
  const handleDelete = async () => {
    if (ressourceToDelete) {
      try {
        await RessourceHumaineService.deleteRessourcehumaine(ressourceToDelete.id);
        setRessourcesHumaines((prevRessources) =>
          prevRessources.filter((ressource) => ressource.id_ressh !== ressourceToDelete.id_ressh)
        );
        setOpenDeleteDialog(false);
        setActionMessage("Suppression réussie !"); // Set success message for deletion
        setOpenSuccessSnackbar(true); // Show success snackbar after deletion
      } catch (err) {
        console.error("Error while deleting resource:", err);
        setOpenErrorSnackbar(true); // Show error snackbar if deletion fails
      }
    }
  };

  // Function to open edit modal
  const handleEdit = (ressource) => {
    setCurrentRessource(ressource);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (internalId) => {
    setSelectedId(internalId);
    setOpenDeleteDialog(true);
  };

  // Function to add a resource
  const handleAddRessource = async (newRessource) => {
    try {
      setRessourcesHumaines((prevRessources) => [...prevRessources, newRessource]);
      setOpenAddModal(false); // Close modal after adding resource
    } catch (error) {
      console.error("Error while adding resource:", error);
    }
  };

  // Columns for the DataGrid
  const columns = [
    {
      field: "id_ressh",
      headerName: "Id_ressource",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "nom",
      headerName: "Nom",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "prenom",
      headerName: "Prénom",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "cin",
      headerName: "CIN",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "matricule",
      headerName: "Matricule",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "alias",
      headerName: "Alias",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "gsm",
      headerName: "Telephone",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "id_grp",
      headerName: "Groupe ID",
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px", // Taille du cercle
            height: "40px", // Taille du cercle
            borderRadius: "50%", // Pour rendre le cercle
            backgroundColor: colors.blueAccent[500], // Couleur du cercle
            cursor: "pointer",
            "&:hover": {
              backgroundColor: colors.blueAccent[600], // Couleur au survol
            },
          }}
          onClick={() => handleEdit(params.row)}
        >
          <EditIcon sx={{ color: "#fff", fontSize: 24 }} />
        </Box>
      
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px", // Taille du cercle
            height: "40px", // Taille du cercle
            borderRadius: "50%", // Pour rendre le cercle
            backgroundColor: colors.redAccent[500], // Couleur du cercle
            cursor: "pointer",
            "&:hover": {
              backgroundColor: colors.redAccent[600], // Couleur au survol
            },
          }}
          onClick={() => {
            setRessourceToDelete(params.row);
            setOpenDeleteDialog(true);
          }}
        >
          <DeleteIcon sx={{ color: "#fff", fontSize: 24 }} />
        </Box>
      </Box>
      
      ),
    },
  ];

  // Fetch the resources
  useEffect(() => {
    const fetchRessourcesHumaines = async () => {
      try {
        const data = await RessourceHumaineService.getRessourceHumaine();
        setRessourcesHumaines(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error while fetching resources:", err);
        setError("Error while fetching resources.");
        setLoading(false);
      }
    };

    fetchRessourcesHumaines();
  }, []);

  // Filter resources based on search query
  const filteredRessourcesHumaines = ressourcesHumaines.filter((ressource) =>
    ressource.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ressource.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ressource.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box m="20px">
      <AddRessourceHumaine
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAddRessourceHumaine={handleAddRessource}
      />

      {currentRessource && (
        <ModifeRessourceHumaine
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          ressource={currentRessource}
          onUpdate={handleUpdateRessource}
        />
      )}

      <Box display="flex" justifyContent="flex-end" mb="20px">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddModal(true)}
          sx={{
            backgroundColor: colors.greenAccent[500],
            color: "white",
            "&:hover": {
              backgroundColor: colors.greenAccent[600],
            },
          }}
        >
          Ajouter une ressource humaine
        </Button>
      </Box>

      <Header title="Ressources humaines" subtitle="Liste des ressources humaines" />

      <Box display="flex" justifyContent="flex-start" mb="20px">
        <TextField
          label="Rechercher une ressource"
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
  rows={filteredRessourcesHumaines}
  columns={columns}
  pageSize={5}
  rowsPerPageOptions={[5]}
  disableSelectionOnClick
/>

        </Box>
      )}

<Snackbar
  open={openSuccessSnackbar}
  autoHideDuration={3000}
  onClose={() => setOpenSuccessSnackbar(false)}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
  sx={{
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#4caf50", // Couleur verte de fond
      color: "#fff", // Couleur du texte
      borderRadius: "10px", // Coins arrondis
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Ombre légère
      fontWeight: "bold", // Texte en gras
    },
  }}
>
  <Alert onClose={() => setOpenSuccessSnackbar(false)} severity="success" sx={{ padding: "10px 20px" }}>
    {actionMessage}
  </Alert>
</Snackbar>

<Snackbar
  open={openErrorSnackbar}
  autoHideDuration={3000}
  onClose={() => setOpenErrorSnackbar(false)}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
  sx={{
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#f44336", // Couleur rouge de fond
      color: "#fff", // Couleur du texte
      borderRadius: "10px", // Coins arrondis
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Ombre légère
      fontWeight: "bold", // Texte en gras
    },
  }}
>
  <Alert onClose={() => setOpenErrorSnackbar(false)} severity="error" sx={{ padding: "10px 20px" }}>
    Erreur lors de l'action !
  </Alert>
</Snackbar>


      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">{"Êtes-vous sûr de vouloir supprimer cette ressource ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Cette action est irréversible. Voulez-vous continuer ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AfficheRessourceHumaine;
