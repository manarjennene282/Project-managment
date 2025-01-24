import React, { useState } from "react";
import { Box, Button, Typography, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";

const NatureJob = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({ idNatureJob: "", libelle: "" });

  // Gestion des champs du formulaire
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Gestion de l'ajout d'un nouveau Nature Job
  const handleAdd = () => {
    if (formValues.idNatureJob && formValues.libelle) {
      const newJob = { id: jobs.length + 1, ...formValues };
      setJobs([...jobs, newJob]);
      setFormValues({ idNatureJob: "", libelle: "" });
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
      job.idNatureJob.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.libelle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Colonnes pour le DataGrid
  const columns = [
    { field: "idNatureJob", headerName: "ID Nature Job", flex: 1 },
    { field: "libelle", headerName: "Libellé", flex: 1 },
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
      {/* Modal pour ajouter un Nature Job */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            width: 400,
            margin: "100px auto",
            padding: 4,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
            Ajouter un Nature Job
          </Typography>
          <TextField
            label="ID Nature Job"
            name="idNatureJob"
            value={formValues.idNatureJob}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Libellé"
            name="libelle"
            value={formValues.libelle}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
          Ajouter un Nature Job
        </Button>
      </Box>

      {/* Header */}
      <Header title="Nature Jobs" subtitle="Liste des Nature Jobs" />

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

export default NatureJob;