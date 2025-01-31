import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  useTheme,
  InputAdornment,
  Snackbar,
  Alert,
  Tooltip,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ImportExportIcon from "@mui/icons-material/ImportExport"; // Pour l'icône d'importation
import ComptableService from "../../services/ComptableService";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const AfficheComptable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [comptables, setComptables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [file, setFile] = useState(null); // Pour gérer le fichier

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ComptableService.getComptable();
        setComptables(response);
        setLoading(false);
      } catch (err) {
        console.error("Erreur de chargement :", err);
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: "id_mvt", headerName: "ID Mouvement", flex: 1 },
    { field: "id_op", headerName: "ID Opération", flex: 1 },
    { field: "id_ressh", headerName: "ID Ressource", flex: 1 },
    { field: "jhtrav", headerName: "Jours Travaillés", flex: 1 },
    { field: "mnt_base", headerName: "Montant Base", flex: 1 },
    { field: "mnt_brut", headerName: "Montant Brut", flex: 1 },
    { field: "mnt_cnss", headerName: "CNSS", flex: 1 },
    { field: "mnt_salaireImp", headerName: "Salaire Imposable", flex: 1 },
    { field: "mnt_irrp", headerName: "IRRP", flex: 1 },
    { field: "mnt_css", headerName: "CSS", flex: 1 },
    { field: "mnt_acpt", headerName: "ACPT", flex: 1 },
    { field: "mnt_pret", headerName: "Prêt", flex: 1 },
    { field: "mnt_net", headerName: "Salaire Net", flex: 1 },
    { field: "mnt01707", headerName: "Montant 01707", flex: 1 },
    { field: "mnt_0.034", headerName: "Montant 0.034", flex: 1 },
    { field: "mnt_130", headerName: "Montant 130", flex: 1 },
    { field: "mnt_scr", headerName: "Montant SCR", flex: 1 },
  ];

  const filteredComptables = Array.isArray(comptables)
    ? comptables.filter((comp) =>
        Object.values(comp).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  // Gestionnaire pour l'importation du fichier
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleImport = () => {
    if (file) {
      // Vous pouvez traiter le fichier ici. Par exemple, si c'est un fichier CSV,
      // vous pouvez le parser et ajouter les données au tableau.
      console.log("Fichier importé:", file);
    } else {
      alert("Veuillez sélectionner un fichier à importer.");
    }
  };

  return (
    <Box m="20px">
      <Header title="Comptabilité" subtitle="Liste des données comptables" />

      <Box mb="20px" display="flex" alignItems="center" gap="20px">
        <TextField
          label="Rechercher"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: "400px" }}
        />

        {/* Bouton d'importation aligné à droite */}
        <Button
          variant="contained"
          color="secondary" // Couleur secondaire pour un bouton plus joli
          startIcon={<ImportExportIcon />}
          onClick={handleImport}
          sx={{
            padding: "10px 20px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "5px",
            marginLeft: "auto", // Cela pousse le bouton à droite
            '&:hover': {
              backgroundColor: colors.blueAccent[700], // Couleur de survol
            },
          }}
        >
          Importer un fichier
        </Button>

        {/* Input de type file caché */}
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-upload"
        />
      </Box>

      {loading ? (
        <Typography>Chargement en cours...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box
          m="40px 0 0 0"
          height="60vh"
          sx={{
            "& .MuiDataGrid-root": {
              borderLeft: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "12px",
              fontWeight: "bold",
              textAlign: "center",
              padding: "5px",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${colors.grey[800]}`,
              fontSize: "12px",
              padding: "5px",
            },
            "& .MuiDataGrid-row": {
              maxHeight: "50px",
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
            rows={filteredComptables}
            columns={columns}
            getRowId={(row) => row.id_mvt}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Box>
      )}
    </Box>
  );
};

export default AfficheComptable;
