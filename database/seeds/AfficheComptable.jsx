import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ComptableService from "../../services/ComptableService";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import * as XLSX from "xlsx";

const AfficheComptable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [comptables, setComptables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [file, setFile] = useState(null);

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

  // Fonction pour enregistrer les données en base de données
  const saveDataToDatabase = async (data) => {
    try {
      await ComptableService.saveComptable(data);
      alert("Données enregistrées avec succès !");
      // Recharge les données depuis la base après l'ajout
      const updatedData = await ComptableService.getComptable();
      setComptables(updatedData);
    } catch (error) {
      console.error("Erreur d'enregistrement :", error);
      alert("Échec de l'enregistrement des données.");
    }
  };

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileContent = e.target.result;
      const workbook = XLSX.read(fileContent, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (data.length < 2) {
        console.error("Fichier invalide");
        return;
      }

      const headers = data[0].map((h) => h.trim());
      const rows = data.slice(1);

      const headerMap = {
        "ID MVT": "id_mvt",
        "Jours Travaillés": "jhtrav",
        "Montant Base": "mnt_base",
        "Montant Brut": "mnt_brut",
        "Montant CNSS": "mnt_cnss",
        "Salaire Imposable": "mnt_salaireImp",
        "IRRP": "mnt_irrp",
        "CSS": "mnt_css",
        "ACPT": "mnt_acpt",
        "Prêt": "mnt_pret",
        "Salaire Net": "mnt_net",
        "Montant 01707": "mnt01707",
        "Montant 0.034": "mnt_0.034",
        "Montant 130": "mnt_130",
        "Montant SCR": "mnt_scr",
      };

      const transformedData = rows.map((row) => {
        let rowData = {};
        headers.forEach((header, index) => {
          if (headerMap[header]) {
            rowData[headerMap[header]] = row[index] || "";
          }
        });
        return rowData;
      });

      console.log("Données transformées :", transformedData);
      setComptables(transformedData);
      
      // Enregistrer les données dans la base de données
      await saveDataToDatabase(transformedData);
      
      setLoading(false);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const columns = Object.entries({
    id_mvt: "ID Mouvement",
    jhtrav: "Jours Travaillés",
    mnt_base: "Montant Base",
    mnt_brut: "Montant Brut",
    mnt_cnss: "CNSS",
    mnt_salaireImp: "Salaire Imposable",
    mnt_irrp: "IRRP",
    mnt_css: "CSS",
    mnt_acpt: "ACPT",
    mnt_pret: "Prêt",
    mnt_net: "Salaire Net",
    mnt01707: "Montant 01707",
    mnt_0034: "Montant 0.034",
    mnt_130: "Montant 130",
    mnt_scr: "Montant SCR",
  }).map(([field, headerName]) => ({ field, headerName, flex: 1 }));

  return (
    <Box m="20px">
      <Header title="Comptabilité" subtitle="Liste des données comptables" />
      <Box mb="20px" display="flex" alignItems="center" gap="20px">
        <TextField
          label="Rechercher"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
          sx={{ width: "400px" }}
        />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ImportExportIcon />}
          onClick={() => document.getElementById("file-upload").click()}
          sx={{ ml: "auto" }}
        >
          Importer un fichier
        </Button>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="file-upload"
        />
      </Box>
      {loading ? (
        <Typography>Chargement en cours...</Typography>
      ) : (
        <Box height="60vh">
          <DataGrid rows={comptables} columns={columns} getRowId={(row) => row.id_mvt || Math.random()} pageSize={10} />
        </Box>
      )}
    </Box>
  );
};

export default AfficheComptable;
