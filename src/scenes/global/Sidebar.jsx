import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [user, setUser] = useState(null);

  const [dataOpen, setDataOpen] = useState(false); // State to toggle Data section
  const [projetOpen, setProjetOpen] = useState(false); // State to toggle Projet section
  const [ressourcesOpen, setRessourcesOpen] = useState(false); // State to toggle Ressources section
  const [administrationOpen, setAdministrationOpen] = useState(false); // State to toggle Administration section
  const [parametrageOpen, setParametrageOpen] = useState(false); // State to toggle Administration section

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  GPM.Segula
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && user && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {user.title || "Utilisateur"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Data Section */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
              <IconButton onClick={() => setDataOpen(!dataOpen)}>
                {dataOpen ? "-" : "+"}
              </IconButton>
            </Typography>
            {dataOpen && (
              <>
                <Item
                  title="Manage Team"
                  to="/team"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Contacts Information"
                  to="/contacts"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Presence"
                  to="/presence"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Invoices Balances"
                  to="/invoices"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gestion Projet"
                  to="/projet"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            {/* Projet Section */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Projet
              <IconButton onClick={() => setProjetOpen(!projetOpen)}>
                {projetOpen ? "-" : "+"}
              </IconButton>
            </Typography>
            {projetOpen && (
              <>
                <Item
                  title="Gestion Projet"
                  to="/projet"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            {/* Ressources Section */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Ressources
              <IconButton onClick={() => setRessourcesOpen(!ressourcesOpen)}>
                {ressourcesOpen ? "-" : "+"}
              </IconButton>
            </Typography>
            {ressourcesOpen && (
              <>
                <Item
                  title="Creation Ressource Materiel"
                  to="/CreationRessourceMateriel"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Consultation Ressource Materiel"
                  to="/ConsultationRessourceMateriel"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            {/* Administration Section */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Administration
              <IconButton onClick={() => setAdministrationOpen(!administrationOpen)}>
                {administrationOpen ? "-" : "+"}
              </IconButton>
            </Typography>
            {administrationOpen && (
              <>
                <Item
                  title="Gestion des droits d'accès"
                  to="/Gestionacces"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            {/* Paramétrages Section */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Paramétrages
              <IconButton onClick={() => setParametrageOpen(!parametrageOpen)}>
                {parametrageOpen ? "-" : "+"}
              </IconButton>
            </Typography>
            {parametrageOpen && (
              <>
                <Item
              title="Type Projet"
              to="/typeprojet"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Nature JOB"
              to="/naturejob"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

          <Item
              title="Priorite"
              to="/priorite"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              </>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
