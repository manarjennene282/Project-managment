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
import ModifePriorite from "./ModifePriorite";
import AddPriorite from "./AddPriorite";

const AffichePriorite = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [priorites, setPriorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentPriorite, setCurrentPriorite] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedPrioriteId, setSelectedPrioriteId] = useState(null);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleDeleteClick = (id_prio) => {
    setSelectedPrioriteId(id_prio); // Use id_prio
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      console.log("Deleting Priorite with ID:", selectedPrioriteId); // Debugging
      await Parametrageservice.deletePriorite(selectedPrioriteId);
      setPriorites((prevPriorites) =>
        prevPriorites.filter((priorite) => priorite.id_prio !== selectedPrioriteId) // Use id_prio
      );
      setOpenDeleteDialog(false);
      setOpenSuccessSnackbar(true);
    } catch (err) {
      console.error("Erreur lors de la suppression de la priorité :", err);
      setOpenDeleteDialog(false);
      setOpenErrorSnackbar(true);
    }
  };

  const handleEdit = (priorite) => {
    setCurrentPriorite(priorite);
    setOpenEditModal(true);
  };

  const handleAddPriorite = (newPriorite) => {
    setPriorites((prevPriorites) => [
      ...prevPriorites,
      { id_prio: newPriorite.id_prio, liblle: newPriorite.liblle },
    ]);
  };

  const handleUpdatePriorite = (updatedPriorite) => {
    setPriorites((prevPriorites) =>
      prevPriorites.map((priorite) =>
        priorite.id_prio === updatedPriorite.id_prio ? updatedPriorite : priorite
      )
    );
  };

  const columns = [
    {
      field: "id_prio",
      headerName: "ID_priorite",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "liblle",
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
            onClick={() => handleDeleteClick(params.row.id)} // Use id_prio
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
    const fetchPriorites = async () => {
      try {
        const data = await Parametrageservice.getPriorite();
        setPriorites(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des priorités :", err);
        setError("Erreur lors de la récupération des priorités.");
        setLoading(false);
      }
    };

    fetchPriorites();
  }, []);

  const filteredPriorites = priorites.filter((priorite) =>
    Object.values(priorite).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box m="20px">
      <AddPriorite
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAddPriorite={handleAddPriorite}
      />

      {currentPriorite && (
        <ModifePriorite
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          priorite={currentPriorite}
          onUpdate={(updatedPriorite) => {
            handleUpdatePriorite(updatedPriorite);
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
            Êtes-vous sûr de vouloir supprimer cette priorité ?
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
          La priorité a été supprimée avec succès !
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
          Une erreur est survenue lors de la suppression de la priorité.
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
          Ajouter une priorité
        </Button>
      </Box>

      <Header title="Priorités" subtitle="Liste des priorités" />

      <Box display="flex" justifyContent="flex-start" mb="20px">
        <TextField
          label="Rechercher une priorité"
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
            rows={filteredPriorites}
            columns={columns}
            getRowId={(row) => row.id_prio} // Use id_prio as the unique identifier
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

export default AffichePriorite;