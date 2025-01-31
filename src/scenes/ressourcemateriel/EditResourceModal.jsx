import React, { useState, useEffect } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const EditResourceModal = ({ open, onClose, resource, onEdit }) => {
  const [formValues, setFormValues] = useState(resource);

  useEffect(() => {
    setFormValues(resource);
  }, [resource]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onEdit(formValues);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 500,
          margin: "100px auto",
          padding: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" mb={2}>
          Modifier une Ressource
        </Typography>
        {Object.keys(formValues).map((key) => (
          <TextField
            key={key}
            label={key.replace(/_/g, " ").toUpperCase()}
            name={key}
            value={formValues[key]}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        ))}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button onClick={onClose} sx={{ marginRight: 2 }}>
            Annuler
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Modifier
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditResourceModal;
