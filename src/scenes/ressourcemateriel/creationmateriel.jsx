import React, { useState, useEffect } from "react";
import { Box, Button, TextField, useTheme, InputAdornment, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme"; // Assuming you're using the same theme
import Header from "../../components/Header";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

import AddResourceModal from "./AddResourceModal";
import EditResourceModal from "./EditResourceModal";
import RessourceMService from "../../services/RessourceMService";  // Importez le service

const CreationMateriel = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentResource, setCurrentResource] = useState(null);
  const [ressourceMateriel, setressourceMateriel] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to delete a resource
  const handleDelete = async (id) => {
    try {
      await RessourceMService.deleteRessourceMateriel(id);  // Appel à l'API pour supprimer
      setResources((prev) => prev.filter((res) => res.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression de la ressource :", err);
      setError("Erreur lors de la suppression de la ressource.");
    }
  };

  // Function to edit a resource
  const handleEdit = (resource) => {
    setCurrentResource(resource);
    setOpenEditModal(true);
  };

  // Function to add a new resource
  const handleAddResource = async (newResource) => {
    try {
      const addedResource = await RessourceMService.addRessourceMateriel(newResource);  // Appel à l'API pour ajouter
      setResources((prev) => [...prev, addedResource]);
    } catch (err) {
      console.error("Erreur lors de l'ajout de la ressource :", err);
      setError("Erreur lors de l'ajout de la ressource.");
    }
  };

  // Fetch resources from server (fetch API)
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await RessourceMService.getRessourcesMateriel();  // Appel à l'API pour récupérer les ressources
        setResources(res);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des ressources :", err);
        setError("Erreur lors de la récupération des ressources.");
        setLoading(false);
      }
    };
    
    fetchResources();
  }, []);

  const filteredResources = ressourceMateriel.filter((ressourceMateriel) =>
    Object.values(ressourceMateriel).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Columns definition
  const columns = [
    { field: "id_ressouM", headerName: "ID Ressource", flex: 1, align: "center", headerAlign: "center" },
    { field: "libelle", headerName: "Libellé", flex: 1, align: "center", headerAlign: "center" },
    { field: "id_machine", headerName: "ID Machine", flex: 1, align: "center", headerAlign: "center" },
    { field: "type_equip", headerName: "Type Équipement", flex: 1, align: "center", headerAlign: "center" },
    { field: "date_acquisition", headerName: "Date Acquisition", flex: 1, align: "center", headerAlign: "center" },
    { field: "etat", headerName: "État", flex: 1, align: "center", headerAlign: "center" },
    {
      field: "action",
      headerName: "Actions",
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
            onClick={() => handleDelete(params.row.id)}
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

  return (
    <Box m="20px">
      <AddResourceModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={handleAddResource}
      />
      {currentResource && (
        <EditResourceModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          resource={currentResource}
          onEdit={(updatedResource) => {
            setResources((prev) => prev.map((res) => (res.id === updatedResource.id ? updatedResource : res)));
            setOpenEditModal(false);
          }}
        />
      )}

      <Header title="Ressource Matérielle" subtitle="Liste des ressources matérielles" />

      <Box display="flex" justifyContent="flex-end" mb="20px">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={() => setOpenAddModal(true)}
          sx={{
            backgroundColor: colors.greenAccent[500],
            "&:hover": { backgroundColor: colors.greenAccent[600] },
          }}
        >
          Ajouter une Ressource
        </Button>
      </Box>

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
            rows={filteredResources}
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

export default CreationMateriel;
