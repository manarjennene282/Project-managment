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

const CreationMateriel = () => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({
    id_ressouM: "",
    libelle: "",
    id_machine: "",
    type_equip: "",
    date_acquisition: "",
    date_mise_en_service: "",
    etat: "",
    notes: "",
  });

  // Gestion des champs du formulaire
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Gestion de l'ajout d'une nouvelle ressource matérielle
  const handleAdd = () => {
    if (formValues.id_ressouM && formValues.libelle) {
      const newResource = { id: resources.length + 1, ...formValues };
      setResources([...resources, newResource]);
      setFormValues({
        id_ressouM: "",
        libelle: "",
        id_machine: "",
        type_equip: "",
        date_acquisition: "",
        date_mise_en_service: "",
        etat: "",
        notes: "",
      });
      setOpenModal(false);
    }
  };

  // Gestion de la suppression
  const handleDelete = (id) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  // Gestion de la recherche
  const filteredResources = resources.filter(
    (resource) =>
      resource.id_ressouM.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.libelle.toLowerCase().includes(searchTerm.toLowerCase())
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
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => console.log("Éditer :", params.row.id)}>
            <EditIcon style={{ color: colors.blueAccent[400] }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon style={{ color: colors.redAccent[400] }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      {/* Modal pour ajouter une Ressource Matérielle */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            width: 600,
            margin: "100px auto",
            padding: 4,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
            Ajouter une Ressource Matérielle
          </Typography>
          {["id_ressouM", "libelle", "id_machine", "type_equip"].map((field, index) => (
            <TextField
              key={index}
              label={field.replace(/_/g, " ").toUpperCase()}
              name={field}
              value={formValues[field]}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          ))}
          <TextField
            label="Date Acquisition"
            name="date_acquisition"
            type="date"
            value={formValues.date_acquisition}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Date Mise en Service"
            name="date_mise_en_service"
            type="date"
            value={formValues.date_mise_en_service}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="État"
            name="etat"
            value={formValues.etat}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Notes"
            name="notes"
            value={formValues.notes}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              sx={{
                backgroundColor: colors.greenAccent[500],
                "&:hover": {
                  backgroundColor: colors.greenAccent[600],
                },
              }}
            >
              Ajouter
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Bouton Ajouter */}
      <Box display="flex" justifyContent="flex-end" mb="20px">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
          startIcon={<AddCircleIcon />}
          sx={{
            backgroundColor: colors.greenAccent[500],
            color: "white",
            "&:hover": {
              backgroundColor: colors.greenAccent[600],
            },
          }}
        >
          Ajouter une Ressource Matérielle
        </Button>
      </Box>

      {/* Header */}
      <Header title="Ressource Matérielle" subtitle="Liste des Ressources Matérielles" />

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
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default CreationMateriel;
