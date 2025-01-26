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
import AddNatureRelation from "./AddNatureRelation";
import ModifeNatureRelation from "./ModifeNatureRelation";

const AfficheNatureRelation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [naturerelations, setNatureRelations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentNatureRelation, setCurrentNatureRelation] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedNatureRelationId, setSelectedNatureRelationId] = useState(null);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleDeleteClick = (id_natureRel) => {
    setSelectedNatureRelationId(id_natureRel);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await Parametrageservice.deletenaturerelation(selectedNatureRelationId);
      setNatureRelations((prev) => 
        prev.filter(relation => relation.id_natureRel !== selectedNatureRelationId)
      );
      setOpenDeleteDialog(false);
      setOpenSuccessSnackbar(true);
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      setOpenDeleteDialog(false);
      setOpenErrorSnackbar(true);
    }
  };

  const handleEdit = (relation) => {
    setCurrentNatureRelation(relation);
    setOpenEditModal(true);
  };

  const handleAddNatureRelation = (newRelation) => {
    setNatureRelations(prev => [...prev, {
      id_natureRel: newRelation.id_natureRel,
      libelle: newRelation.libelle
    }]);
  };

  const handleUpdateNatureRelation = (updatedRelation) => {
    setNatureRelations(prev => 
      prev.map(relation => 
        relation.id_natureRel === updatedRelation.id_natureRel ? updatedRelation : relation
      )
    );
  };

  const columns = [
    {
      field: "id_natureRel",
      headerName: "ID Relation",
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
            sx={{ backgroundColor: colors.blueAccent[500], color: "white" }}
          >
            Modifier
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteClick(params.row.id_natureRel)}
            sx={{ backgroundColor: colors.redAccent[500], color: "white" }}
          >
            Supprimer
          </Button>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Parametrageservice.getNatureRelation();
        setNatureRelations(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Erreur de chargement :", err);
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredRelations = naturerelations.filter(relation =>
    Object.values(relation).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box m="20px">
      <AddNatureRelation
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={handleAddNatureRelation}
      />

      {currentNatureRelation && (
        <ModifeNatureRelation
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          relation={currentNatureRelation}
          onUpdate={handleUpdateNatureRelation}
        />
      )}

      {/* Dialog et Snackbars restent similaires avec ajustement des textes */}
      
      <Box display="flex" justifyContent="flex-end" mb="20px">
        <Button
          variant="contained"
          onClick={() => setOpenAddModal(true)}
          sx={{ backgroundColor: colors.greenAccent[500], color: "white" }}
        >
          Ajouter une Relation
        </Button>
      </Box>

      <Header 
        title="Gestion des Relations" 
        subtitle="Liste des types de relations" 
      />

      <Box mb="20px">
        <TextField
          label="Rechercher une relation"
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
        <Box height="75vh" sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-columnHeaders": { 
            backgroundColor: colors.blueAccent[700],
            borderBottom: `2px solid ${colors.blueAccent[500]}`
          },
        }}>
          <DataGrid
            rows={filteredRelations}
            columns={columns}
            getRowId={(row) => row.id_natureRel}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};

export default AfficheNatureRelation;