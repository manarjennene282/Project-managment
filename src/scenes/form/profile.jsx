import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const Presence = () => {
  const [userData, setUserData] = useState(null); // Pour stocker les données de l'utilisateur connecté

  useEffect(() => {
    // Charger les informations de l'utilisateur depuis localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user); // Stocke toutes les données de l'utilisateur
    }
  }, []);

  if (!userData) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6">Chargement des données utilisateur...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenue, {userData.nom} {userData.prenom} !
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Voici vos informations personnelles :
      </Typography>

      <Box sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Champ</TableCell>
              <TableCell>Valeur</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>{userData.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>{userData.nom}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Prénom</TableCell>
              <TableCell>{userData.prenom}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{userData.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CIN</TableCell>
              <TableCell>{userData.cin}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Matricule</TableCell>
              <TableCell>{userData.matricule}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Contrat</TableCell>
              <TableCell>{userData.contrat}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date de Naissance</TableCell>
              <TableCell>{userData.datenaissance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Role ID</TableCell>
              <TableCell>{userData.role_id}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Presence;
