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
import AddTypeProjetModal from "./addtypeprojetmodale";
import ModifeTypeProjet from "./modifetypeprojet";

const AfficheTypeProjet = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [typeProjets, setTypeProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false); // Popup de succès
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false); // Popup d'erreur

  // Fonction pour ouvrir la boîte de dialogue de suppression
  const handleDeleteClick = (id) => {
    setSelectedProjectId(id);
    setOpenDeleteDialog(true);
  };

  // Fonction pour confirmer la suppression
  const handleDeleteConfirm = async () => {
    try {
      await Parametrageservice.deleteTypeProjet(selectedProjectId);
      setTypeProjets((prevTypeProjets) =>
        prevTypeProjets.filter((typeProjet) => typeProjet.id !== selectedProjectId)
      );
      setOpenDeleteDialog(false);
      setOpenSuccessSnackbar(true); // Afficher la popup de succès
    } catch (err) {
      console.error("Erreur lors de la suppression du type projet :", err);
      setOpenDeleteDialog(false);
      setOpenErrorSnackbar(true); // Afficher la popup d'erreur
    }
  };

  // Fonction pour ouvrir le modal d'édition
  const handleEdit = (typeProjet) => {
    setCurrentProject(typeProjet);
    setOpenEditModal(true);
  };

  // Fonction pour ajouter un type de projet
  const handleAddProject = (newTypeProject) => {
    setTypeProjets((prevTypeProjets) => [
      ...prevTypeProjets,
      { id: typeProjets.length + 1, ...newTypeProject },
    ]);
  };

  const handleUpdateTypeProject = (updatedTypeProject) => {
    setTypeProjets((prevProjets) =>
      prevProjets.map((projet) =>
        projet.id === updatedTypeProject.id ? updatedTypeProject : projet
      )
    );
  };

  // Colonnes pour le DataGrid
  const columns = [
    {
      field: "libelle",
      headerName: "Libelle",
      flex: 1,
      align: "center", // Centrer le texte dans les cellules
      headerAlign: "center", // Centrer le texte dans l'en-tête
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      align: "center", // Centrer le texte dans les cellules
      headerAlign: "center", // Centrer le texte dans l'en-tête
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center", // Centrer le texte dans les cellules
      headerAlign: "center", // Centrer le texte dans l'en-tête
      renderCell: (params) => (
        <Box display="flex" gap="10px" justifyContent="center">
          {/* Bouton Modifier */}
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row)}
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: "white",
              "&:hover": {
                backgroundColor: colors.blueAccent[600],
              },
              textTransform: "none",
            }}
          >
            Modifier
          </Button>
  
          {/* Bouton Supprimer */}
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteClick(params.row.id)}
            sx={{
              backgroundColor: colors.redAccent[500],
              color: "white",
              "&:hover": {
                backgroundColor: colors.redAccent[600],
              },
              textTransform: "none",
            }}
          >
            Supprimer
          </Button>
        </Box>
      ),
    },
  ];

  // Récupérer les types de projets depuis le serveur
  useEffect(() => {
    const fetchTypeProjets = async () => {
      try {
        const data = await Parametrageservice.getTypeprojet();
        setTypeProjets(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des types de projets :", err);
        setError("Erreur lors de la récupération des types de projets.");
        setLoading(false);
      }
    };

    fetchTypeProjets();
  }, []);

  // Filtrer les types de projets selon la recherche
  const filteredTypeProjets = typeProjets.filter((typeProjet) =>
    Object.values(typeProjet).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box m="20px">
      <AddTypeProjetModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAddProject={handleAddProject}
      />

      {currentProject && (
        <ModifeTypeProjet
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          project={currentProject}
          onUpdate={(updatedProject) => {
            handleUpdateTypeProject(updatedProject);
            setOpenEditModal(false);
          }}
        />
      )}

      {/* Boîte de dialogue de confirmation de suppression */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer ce type de projet ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Popup de succès */}
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000} // Durée d'affichage de la popup (3 secondes)
        onClose={() => setOpenSuccessSnackbar(false)} // Fermer la popup
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position en haut à droite
      >
        <Alert
          onClose={() => setOpenSuccessSnackbar(false)}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: colors.greenAccent[500], // Couleur verte personnalisée
            color: "white", // Texte en blanc
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Ombre pour plus de visibilité
          }}
        >
          Le type de projet a été supprimé avec succès !
        </Alert>
      </Snackbar>

      {/* Popup d'erreur */}
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000} // Durée d'affichage de la popup (3 secondes)
        onClose={() => setOpenErrorSnackbar(false)} // Fermer la popup
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position en haut à droite
      >
        <Alert
          onClose={() => setOpenErrorSnackbar(false)}
          severity="error"
          sx={{
            width: "100%",
            backgroundColor: colors.redAccent[500], // Couleur rouge personnalisée
            color: "white", // Texte en blanc
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Ombre pour plus de visibilité
          }}
        >
          Une erreur est survenue lors de la suppression du type de projet.
        </Alert>
      </Snackbar>

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
          Ajouter un type de projet
        </Button>
      </Box>

      <Header title="Types de projets" subtitle="Liste des types de projets" />

      <Box display="flex" justifyContent="flex-start" mb="20px">
        <TextField
          label="Rechercher un type de projet"
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
              color: colors.grey[300],
            },
            "& .MuiInputBase-input": {
              color: colors.grey[100],
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
              border: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              borderBottom: `2px solid ${colors.blueAccent[500]}`,
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              textTransform: "uppercase",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${colors.grey[800]}`,
              fontSize: "13px",
              color: colors.grey[100],
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
            rows={filteredTypeProjets}
            columns={columns}
            rowHeight={50}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection={false}
            disableSelectionOnClick
            sx={{
              "& .MuiDataGrid-iconSeparator": {
                display: "none",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default AfficheTypeProjet;