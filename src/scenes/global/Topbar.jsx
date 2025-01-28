import { Box, IconButton, useTheme, Menu, MenuItem } from "@mui/material";
import { useState, useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useNavigate } from "react-router-dom"; // Pour la redirection après déconnexion

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  // État pour gérer l'ouverture et la fermeture du menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Ouvrir le menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Fermer le menu
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  // Gérer la déconnexion
  const handleLogout = () => {
    // Supprimer le token et les données utilisateur du localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Rediriger vers la page de connexion
    navigate('/login');
  };

  // Vérifier si le menu est ouvert
  const isMenuOpen = Boolean(anchorEl);

  return (
    <Box display="flex" justifyContent="right" p={2}>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        
        {/* Profile Icon and Menu */}
        <IconButton onClick={handleProfileMenuOpen}>
          <PersonOutlinedIcon />
        </IconButton>

        {/* Menu pour déconnexion */}
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleProfileMenuClose}
        >
          <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
