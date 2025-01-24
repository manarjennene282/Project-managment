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

const Creationjob = () => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({
    id_job: "",
    prt_idJob: "",
    libelle_job: "",
    description_job: "",
    remarque_job: "",
    Date_debut_prev: "",
    Date_fin_prevu: "",
    Date_debut: "",
    Date_fin: "",
    id_statut: "",
    id_typJob: "",
    id_natureJob: "",
  });

  // Gestion des champs du formulaire
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Gestion de l'ajout d'un nouveau job
  const handleAdd = () => {
    if (formValues.id_job && formValues.libelle_job) {
      const newJob = { id: jobs.length + 1, ...formValues };
      setJobs([...jobs, newJob]);
      setFormValues({
        id_job: "",
        prt_idJob: "",
        libelle_job: "",
        description_job: "",
        remarque_job: "",
        Date_debut_prev: "",
        Date_fin_prevu: "",
        Date_debut: "",
        Date_fin: "",
        id_statut: "",
        id_typJob: "",
        id_natureJob: "",
      });
      setOpenModal(false);
    }
  };

  // Gestion de la suppression
  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  // Gestion de la recherche
  const filteredJobs = jobs.filter(
    (job) =>
      job.id_job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.libelle_job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Colonnes pour le DataGrid
  const columns = [
    { field: "id_job", headerName: "ID Job", flex: 1 },
    { field: "prt_idJob", headerName: "Parent Job ID", flex: 1 },
    { field: "libelle_job", headerName: "Libellé", flex: 2 },
    { field: "description_job", headerName: "Description", flex: 3 },
    { field: "remarque_job", headerName: "Remarques", flex: 2 },
    { field: "Date_debut_prev", headerName: "Début Prévu", flex: 1 },
    { field: "Date_fin_prevu", headerName: "Fin Prévue", flex: 1 },
    { field: "Date_debut", headerName: "Début Réel", flex: 1 },
    { field: "Date_fin", headerName: "Fin Réelle", flex: 1 },
    { field: "id_statut", headerName: "Statut", flex: 1 },
    { field: "id_typJob", headerName: "Type de Job", flex: 1 },
    { field: "id_natureJob", headerName: "Nature", flex: 1 },
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
      {/* Modal pour ajouter un Job */}
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
            Ajouter un Job
          </Typography>
          {[
            "id_job",
            "prt_idJob",
            "libelle_job",
            "description_job",
            "remarque_job",
            "id_statut",
            "id_typJob",
            "id_natureJob",
          ].map((field, index) => (
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
          {["Date_debut_prev", "Date_fin_prevu", "Date_debut", "Date_fin"].map(
            (field, index) => (
              <TextField
                key={index}
                label={field.replace(/_/g, " ").toUpperCase()}
                name={field}
                type="date"
                value={formValues[field]}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            )
          )}
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
          Ajouter un Job
        </Button>
      </Box>

      {/* Header */}
      <Header title="Jobs" subtitle="Liste des Jobs" />

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
          rows={filteredJobs}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};


export default Creationjob;
