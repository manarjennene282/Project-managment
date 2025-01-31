import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const EditJobModal = ({ open, onClose, job, onUpdateJob }) => {
  const [formValues, setFormValues] = useState({ ...job });

  useEffect(() => {
    setFormValues({ ...job });
  }, [job]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdateJob(formValues);
    onClose();
  };

  if (!job) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 500,
          margin: "100px auto",
          padding: 4,
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" mb={2}>
          Modifier le job
        </Typography>
        {Object.keys(formValues).map((key) => (
          <TextField
            key={key}
            label={key.replace(/_/g, " ")}
            name={key}
            value={formValues[key]}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        ))}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button onClick={onClose} sx={{ marginRight: 2 }}>
            Annuler
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Modifier
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditJobModal;
