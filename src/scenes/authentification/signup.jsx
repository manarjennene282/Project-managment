import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Avatar,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  Stack,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/material/styles';
import { registerUser } from '../../services/ApiUser'; // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom'; // Utilisation de useNavigate

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export default function SignUp() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    cin: '',
    matricule: '',
    contrat: '',
    role: '',
    datenaissance: '',
    scr: '',
    password: '',
    password_confirmation: '',
  });
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const [rolesLoading, setRolesLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false); // État pour contrôler l'ouverture du dialog
  const [alertSuccess, setAlertSuccess] = useState(false); // État pour contrôler l'alerte de succès
  const navigate = useNavigate(); // Utilisation de useNavigate

  // Fonction pour récupérer les rôles
  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/role', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRoles(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Non autorisé - Veuillez vous connecter.');
      } else {
        setError('Impossible de récupérer les rôles');
      }
    } finally {
      setRolesLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    // Envoi de role_id au lieu de role
    const updatedFormData = { ...formData, role_id: formData.role };
    delete updatedFormData.role; // Supprimer le champ role

    try {
      const response = await registerUser(updatedFormData);
      console.log('Utilisateur inscrit:', response);

      // Affichage du dialogue de confirmation
      setAlertSuccess(true); // Activer l'alerte de succès
      setTimeout(() => {
        setAlertSuccess(false); // Désactiver l'alerte après un délai
      }, 5000);
    } catch (err) {
      setError("Erreur lors de l'inscription: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/login'); // Redirection vers la page de connexion après la fermeture du dialogue
  };

  return (
    <StyledContainer component="main" maxWidth="sm">
      <CssBaseline />
      <StyledAvatar>
        <LockOutlinedIcon />
      </StyledAvatar>
      <Typography component="h1" variant="h5">
        Create Account
      </Typography>
      <StyledForm onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="nom"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="Nom"
              value={formData.nom}
              onChange={handleChange}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="lname"
              name="prenom"
              variant="outlined"
              required
              fullWidth
              id="prenom"
              label="Prenom"
              value={formData.prenom}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Adresse Email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="cin"
              name="cin"
              variant="outlined"
              required
              fullWidth
              id="cin"
              label="CIN"
              value={formData.cin}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="matricule"
              name="matricule"
              variant="outlined"
              required
              fullWidth
              id="matricule"
              label="Matricule"
              value={formData.matricule}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel id="contrat-label">Contrat</InputLabel>
              <Select
                labelId="contrat-label"
                id="contrat"
                name="contrat"
                label="Contrat"
                value={formData.contrat}
                onChange={handleChange}
              >
                <MenuItem value="CIVP">CIVP</MenuItem>
                <MenuItem value="CDI">CDI</MenuItem>
                <MenuItem value="CDD">CDD</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" required>
  <InputLabel id="role-label">Role</InputLabel>
  <Select
    labelId="role-label"
    id="role"
    name="role"
    label="Role"
    value={formData.role || ""} // Assurez-vous que ce n'est jamais undefined
    onChange={handleChange}
  >
    {rolesLoading ? (
      <MenuItem disabled>Chargement des rôles...</MenuItem>
    ) : (
      roles.length > 0 ? (
        roles.map((role) => (
          <MenuItem key={role.id} value={role.id}>
            {role.role} {/* Utilisez le nom correct ici */}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>Aucun rôle disponible</MenuItem>
      )
    )}
  </Select>
</FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="datenaissance"
              name="datenaissance"
              variant="outlined"
              required
              fullWidth
              id="datenaissance"
              label="Date of Birth"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.datenaissance}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="scr"
              name="scr"
              variant="outlined"
              required
              fullWidth
              id="scr"
              label="Social Security Number"
              value={formData.scr}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password_confirmation"
              label="Confirm Password"
              type="password"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions, and updates via email."
            />
          </Grid>
        </Grid>
        {error && <Typography color="error">{error}</Typography>}
        <StyledButton type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
          {loading ? 'Chargement...' : 'Sign Up'}
        </StyledButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="#" variant="body2">
             Sign in
            </Link>
          </Grid>
        </Grid>
      </StyledForm>
      <Box mt={5}>
        <Copyright />
      </Box>

      {/* Alerte de succès */}
      {alertSuccess && (
  <Stack
    sx={{
      position: 'absolute', // Positionnement absolu
      top: 16, // Distance du haut de la page
      right: 16, // Distance de la droite de la page
      zIndex: 1300, // Assurez-vous que l'alerte soit au-dessus des autres éléments
      width: 'auto', // La largeur de l'alerte
    }}
    spacing={2}
  >
    <Alert variant="filled" severity="success">
      Inscription réussie ! Vous pouvez maintenant vous connecter.
    </Alert>
  </Stack>
)}


      {/* Dialog de confirmation */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Inscription réussie</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
}
