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

  // Fonction pour supprimer une ressource humaine
  const handleDelete = async () => {
    if (ressourceToDelete) {
      try {
        await RessourceHumaineService.deleteRessourcehumaine(ressourceToDelete.id);
        setRessourcesHumaines((prevRessources) =>
          prevRessources.filter((ressource) => ressource.id_ressh !== ressourceToDelete.id_ressh)
        );
        setOpenDeleteDialog(false);
        setOpenSuccessSnackbar(true); // Affiche le message de succès
      } catch (err) {
        console.error("Erreur lors de la suppression de la ressource :", err);
        setOpenErrorSnackbar(true); // Affiche le message d'erreur
      }
    }
  };


  // Fonction pour ouvrir le modal d'édition
  const handleEdit = (ressource) => {
    setCurrentRessource(ressource);
    setOpenEditModal(true);
  };


  const handleDeleteClick = (internalId) => {
    setSelectedId(internalId);
    setOpenDeleteDialog(true);
  };

  // Fonction pour ajouter une ressource humaine
  const handleAddRessource = async (newRessource) => {
    try {
      setRessourcesHumaines((prevRessources) => [...prevRessources, newRessource]);
      setOpenAddModal(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la ressource :", error);
    }
  };

  // Fonction pour mettre à jour une ressource humaine
  const handleUpdateRessource = (updatedRessource) => {
    setRessourcesHumaines((prevRessources) =>
      prevRessources.map((ressource) =>
        ressource.id_ressh === updatedRessource.id_ressh ? updatedRessource : ressource
      )
    );
  };

  // Colonnes pour le DataGrid
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
          <EditIcon
            onClick={() => handleEdit(params.row)}
            sx={{
              cursor: "pointer",
              color: colors.blueAccent[500],
              "&:hover": {
                color: colors.blueAccent[600],
              },
              fontSize: 24,
            }}
          />

          <DeleteIcon
            onClick={() => {
              setRessourceToDelete(params.row);
              setOpenDeleteDialog(true);
            }}
            sx={{
              cursor: "pointer",
              color: colors.redAccent[500],
              "&:hover": {
                color: colors.redAccent[600],
              },
              fontSize: 24,
            }}
          />
        </Box>
      ),
    },
  ];

  // Récupérer les ressources humaines depuis le serveur
  useEffect(() => {
    const fetchRessourcesHumaines = async () => {
      try {
        const data = await RessourceHumaineService.getRessourceHumaine();
        setRessourcesHumaines(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des ressources humaines :", err);
        setError("Erreur lors de la récupération des ressources humaines.");
        setLoading(false);
      }
    };

    fetchRessourcesHumaines();
  }, []);

  // Filtrer les ressources humaines selon la recherche
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
          onUpdate={(updatedRessource) => {
            handleUpdateRessource(updatedRessource);
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
            rows={filteredRessourcesHumaines}
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

      {/* Popup de confirmation de suppression */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Voulez-vous vraiment supprimer cette ressource humaine ?
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
            onClick={handleDelete}
            color="secondary"
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>



         {/* Notifications en haut à droite */}
         <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 6 }}
      >
        <Alert
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: colors.greenAccent[600],
            color: "white",
          }}
        >
          Suppression effectuée avec succès !
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenErrorSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 6 }}
      >
        <Alert
          severity="error"
          sx={{
            width: "100%",
            backgroundColor: colors.redAccent[600],
            color: "white",
          }}
        >
          Erreur lors de la suppression !
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default AfficheRessourceHumaine;
