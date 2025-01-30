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
  DialogTitle,
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

import AddTypeProjetModal from "./addtypeprojetmodale"; // Adjust the path as necessary
import ModifieTypeProjet from "./modifetypeprojet";

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

  // Dialog de confirmation de suppression
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Fonction pour supprimer un type de projet
  const handleDelete = async (id) => {
    try {
      await Parametrageservice.deleteTypeProjet(id);
      setTypeProjets((prevTypeProjets) =>
        prevTypeProjets.filter((typeProjet) => typeProjet.id !== id)
      );
      setOpenDeleteDialog(false); // Fermer le dialog après la suppression
    } catch (err) {
      console.error("Erreur lors de la suppression du type projet :", err);
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

  // Fonction pour mettre à jour un type de projet
  const handleUpdateProject = (updatedProject) => {
    setTypeProjets((prevTypeProjets) =>
      prevTypeProjets.map((typeProjet) =>
        typeProjet.id === updatedProject.id ? updatedProject : typeProjet
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
          <Tooltip title="Modifier un type de projet" arrow>
            <IconButton
              onClick={() => handleEdit(params.row)}
              sx={{
                backgroundColor: '#9932CC',  // Vert professionnel
                color: 'white',  // Icônes blanches
                borderRadius: '50%',  // Forme circulaire
                width: 30,
                height: 30,
                display: 'flex',  // Pour centrer l'icône
                alignItems: 'center',
                justifyContent: 'center',
                "&:hover": {
                  backgroundColor: '#E0B0FF',  // Vert plus foncé au survol
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          {/* Bouton Supprimer */}
          <Tooltip title="Supprimer un type de projet" arrow>
            <IconButton
              onClick={() => {
                setProjectToDelete(params.row); // Définir le projet à supprimer
                setOpenDeleteDialog(true); // Ouvrir la boîte de dialogue
              }}
              sx={{
                backgroundColor: '#d32f2f',  // Rouge pour "Supprimer"
                color: 'white',  // Icônes blanches
                borderRadius: '50%',  // Forme circulaire
                width: 30,
                height: 30,
                display: 'flex',  // Pour centrer l'icône
                alignItems: 'center',
                justifyContent: 'center',
                "&:hover": {
                  backgroundColor: '#e57373',  // Rouge plus foncé au survol
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
    typeProjet.libelle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box m="20px">
      <AddTypeProjetModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAddProject={handleAddProject}
      />

      {currentProject && (
        <ModifieTypeProjet
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          project={currentProject}
          onUpdate={(updatedProject) => {
            handleUpdateProject(updatedProject);
            setOpenEditModal(false);
          }}
        />
      )}

      <Box display="flex" justifyContent="flex-end" mb="20px">
        <Tooltip title="Ajouter un type de projet" arrow>
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
              Ajouter Type projet
            </Typography>
            <AddIcon sx={{ marginLeft: '8px' }} /> {/* Espace entre l'icône et le texte */}

          </IconButton>
        </Tooltip>
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

      {/* Dialog de confirmation de suppression */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
            Voulez-vous vraiment supprimer ce type de projet ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            color="primary"
          >
            Annuler
          </Button>
          <Button
            onClick={() => handleDelete(projectToDelete.id)}
            color="error"
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AfficheTypeProjet;
