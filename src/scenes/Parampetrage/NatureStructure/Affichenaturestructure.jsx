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
import AddNatureStruuctureModal from "./AddNatureStruuctureModal";
import ModifeNatureStruuctureModal from "./ModifeNatureStruuctureModal";

const AfficheNatureStruct = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [naturestructs, setNatureStructs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentNatureStruct, setCurrentNatureStruct] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedNatureStructId, setSelectedNatureStructId] = useState(null);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleDeleteClick = (id_natureStruct) => {
    setSelectedNatureStructId(id_natureStruct);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      console.log("Deleting NatureStruct with ID:", selectedNatureStructId);
      await Parametrageservice.deletenatutrstruc(selectedNatureStructId);
      setNatureStructs((prevNatureStructs) =>
        prevNatureStructs.filter(
          (naturestruct) => naturestruct.id_natureStruct !== selectedNatureStructId
        )
      );
      setOpenDeleteDialog(false);
      setOpenSuccessSnackbar(true);
    } catch (err) {
      console.error("Erreur lors de la suppression de la nature de structure :", err);
      setOpenDeleteDialog(false);
      setOpenErrorSnackbar(true);
    }
  };

  // Fonction pour ouvrir le modal d'édition
  const handleEdit = (naturestruct) => {
    setCurrentNatureStruct(naturestruct);
    setOpenEditModal(true);
  };

  const handleAddNatureStruct = (newNatureStruct) => {
    setNatureStructs((prevNatureStructs) => [
      ...prevNatureStructs,
      { id_natureStruct: newNatureStruct.id_natureStruct, libelle: newNatureStruct.libelle },
    ]);
  };

  // Mettre à jour handleUpdateNatureStruct pour utiliser l'id statique
const handleUpdateNatureStruct = (updatedNatureStruct) => {
  setNatureStructs((prevNatureStructs) =>
    prevNatureStructs.map((naturestruct) =>
      naturestruct.id === updatedNatureStruct.id // Comparer par ID statique
        ? { ...naturestruct, ...updatedNatureStruct }
        : naturestruct
    )
  );
};

  const columns = [
    {
      field: "id_natureStruct",
      headerName: "ID Nature Structure",
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

  useEffect(() => {
    const fetchNatureStructs = async () => {
      try {
        const data = await Parametrageservice.getNaturestruct();
        setNatureStructs(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des natures de structure :", err);
        setError("Erreur lors de la récupération des natures de structure.");
        setLoading(false);
      }
    };

    fetchNatureStructs();
  }, []);

  const filteredNatureStructs = naturestructs.filter((naturestruct) =>
    Object.values(naturestruct).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box m="20px">
      <AddNatureStruuctureModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAddNatureStruct={handleAddNatureStruct}
      />

      {currentNatureStruct && (
        <ModifeNatureStruuctureModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          naturestruct={currentNatureStruct}
          onUpdate={(updatedNatureStruct) => {
            handleUpdateNatureStruct(updatedNatureStruct);
            setOpenEditModal(false);
          }}
        />
      )}

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer cette nature de structure ?
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

      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSuccessSnackbar(false)}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: colors.greenAccent[500],
            color: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          La nature de structure a été supprimée avec succès !
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenErrorSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenErrorSnackbar(false)}
          severity="error"
          sx={{
            width: "100%",
            backgroundColor: colors.redAccent[500],
            color: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          Une erreur est survenue lors de la suppression de la nature de structure.
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
          Ajouter une nature de structure
        </Button>
      </Box>

      <Header title="Natures de Structure" subtitle="Liste des natures de structure" />

      <Box display="flex" justifyContent="flex-start" mb="20px">
        <TextField
          label="Rechercher une nature de structure"
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
          }}
        >
          <DataGrid
            rows={filteredNatureStructs}
            columns={columns}
  getRowId={(row) => row.id} // Utilisez l'ID statique de la base de données
            rowHeight={50}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection={false}
            disableSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};

export default AfficheNatureStruct;