import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Projetservice from "../../services/Projetservice";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddProjectModal from "./addprojetmodale";
import ModifeProjet from "./modifeprojet";
import EditProjectModal from "./modifeprojet";

const Projet = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null); // Projet sélectionné pour modification

  // Fonction pour supprimer un projet
  const handleDelete = async (id) => {
    try {
      await Projetservice.deleteProjet(id);
      setProjets((prevProjets) => prevProjets.filter((projet) => projet.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression du projet :", err);
    }
  };

  // Fonction pour ouvrir le modal d'édition
  const handleEdit = (project) => {
    setCurrentProject(project); // Sélectionne le projet à modifier
    setOpenEditModal(true); // Ouvre le modal d'édition
  };

  // Fonction pour ajouter un projet
  const handleAddProject = (newProject) => {
    setProjets((prevProjets) => [...prevProjets, { id: projets.length + 1, ...newProject }]);
  };

  // Fonction pour mettre à jour un projet existant
  const handleUpdateProject = (updatedProject) => {
    setProjets((prevProjets) =>
      prevProjets.map((projet) =>
        projet.id === updatedProject.id ? updatedProject : projet
      )
    );
  };

  // Colonnes pour le DataGrid
  const columns = [
    {
      field: "nom",
      headerName: "Nom du Projet",
      flex: 1,
    },
    {
      field: "datedebut",
      headerName: "Date de Début",
      flex: 1,
    },
    {
      field: "departement",
      headerName: "Département",
      flex: 1,
    },
    {
      field: "datefinestime",
      headerName: "Date de Fin Estimée",
      flex: 1,
    },
    {
      field: "datefinreelle",
      headerName: "Date de Fin Réelle",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon style={{ color: colors.blueAccent[400] }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon style={{ color: colors.redAccent[400] }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Récupérer les projets depuis le serveur
  useEffect(() => {
    const fetchProjets = async () => {
      try {
        const data = await Projetservice.getProjets();
        setProjets(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des projets :", err);
        setError("Erreur lors de la récupération des projets.");
        setLoading(false);
      }
    };

    fetchProjets();
  }, []);

  return (
    <Box m="20px">
      {/* Modal pour ajouter un projet */}
      <AddProjectModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAddProject={handleAddProject}
      />

      {/* Modal pour modifier un projet */}
      {currentProject && (
  <EditProjectModal
    open={openEditModal}
    onClose={() => setOpenEditModal(false)}
    project={currentProject}
    onUpdate={(updatedProject) => {
      handleUpdateProject(updatedProject);
      setOpenEditModal(false);
    }}
  />
)}


      {/* Bouton Ajouter un projet */}
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
          Ajouter un projet
        </Button>
      </Box>

      <Header title="Projets" subtitle="Liste des projets" />

      {loading ? (
        <Typography>Chargement...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            checkboxSelection
            rows={Array.isArray(projets) ? projets : []}
            columns={columns}
          />
        </Box>
      )}
    </Box>
  );
};

export default Projet;
