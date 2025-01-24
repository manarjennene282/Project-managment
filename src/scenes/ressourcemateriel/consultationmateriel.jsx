import React, { useState } from "react";
import { Box, Button, Typography, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Consultationmateriel = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const [resources, setResources] = useState([
      {
        id: 1,
        id_ressouM: "RM001",
        libelle: "Machine de découpe laser",
        id_machine: "MACH001",
        type_equip: "Machine",
        date_acquisition: "2023-01-15",
        date_mise_en_service: "2023-02-01",
        etat: "En service",
        notes: "Fonctionne parfaitement, maintenance effectuée régulièrement.",
      },
      {
        id: 2,
        id_ressouM: "RM002",
        libelle: "Tour CNC",
        id_machine: "MACH002",
        type_equip: "Machine",
        date_acquisition: "2022-10-10",
        date_mise_en_service: "2022-11-01",
        etat: "En maintenance",
        notes: "Maintenance prévue pour février 2025.",
      },
    ]);
    const [searchTerm, setSearchTerm] = useState("");
  
    // Filtrage des ressources en fonction du terme de recherche
    const filteredResources = resources.filter(
      (resource) =>
        resource.id_ressouM.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.id_machine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.type_equip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.etat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Colonnes pour le DataGrid
    const columns = [
      { field: "id_ressouM", headerName: "ID Ressource", flex: 1 },
      { field: "libelle", headerName: "Libellé", flex: 1 },
      { field: "id_machine", headerName: "ID Machine", flex: 1 },
      { field: "type_equip", headerName: "Type Équipement", flex: 1 },
      { field: "date_acquisition", headerName: "Date Acquisition", flex: 1 },
      { field: "date_mise_en_service", headerName: "Date Mise en Service", flex: 1 },
      { field: "etat", headerName: "État", flex: 1 },
      { field: "notes", headerName: "Notes", flex: 2 },
    ];
  
    return (
      <Box m="20px">
        {/* Header */}
        <Header title="Consultation Ressources Matérielles" subtitle="Liste et Recherche des Ressources Matérielles" />
  
        {/* Recherche */}
        <Box mb={2}>
          <TextField
            label="Rechercher"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
            }}
          />
        </Box>
  
        {/* Tableau DataGrid */}
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
            rows={filteredResources}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
          />
        </Box>
  
        {/* Footer pour affichage d'infos */}
        <Box mt={3}>
          <Typography variant="subtitle1" color={colors.grey[400]}>
            Total des ressources affichées : {filteredResources.length} / {resources.length}
          </Typography>
        </Box>
      </Box>
    );
  };
  
export default Consultationmateriel;
