import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  TextField,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Projetservice from "../../services/Projetservice";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddProjectModal from "./addprojetmodale";
import EditProjectModal from "./modifeprojet";

const Projet = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (id) => {
    try {
      await Projetservice.deleteProjet(id);
      setProjets((prevProjets) =>
        prevProjets.filter((projet) => projet.id !== id)
      );
    } catch (err) {
      console.error("Erreur lors de la suppression du projet :", err);
    }
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setOpenEditModal(true);
  };

  const handleAddProject = (newProject) => {
    setProjets((prevProjets) => [
      ...prevProjets,
      { id: projets.length + 1, ...newProject },
    ]);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjets((prevProjets) =>
      prevProjets.map((projet) =>
        projet.id === updatedProject.id ? updatedProject : projet
      )
    );
  };

  const columns = [
    { field: "nom", headerName: "Nom du Projet", flex: 1 },
    { field: "datedebut", headerName: "Date de Début", flex: 1 },
    { field: "departement", headerName: "Département", flex: 1 },
    { field: "datefinestime", headerName: "Date de Fin Estimée", flex: 1 },
    { field: "datefinreelle", headerName: "Date de Fin Réelle", flex: 1 },
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

  const filteredProjets = projets.filter((projet) =>
    projet.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box m="20px">
      <AddProjectModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAddProject={handleAddProject}
      />

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

      <Box display="flex" justifyContent="flex-start" mb="20px">
        <TextField
          label="Rechercher un projet"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon  />
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
            rows={filteredProjets}
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

export default Projet;