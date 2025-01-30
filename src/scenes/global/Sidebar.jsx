import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Collapse } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import WarningIcon from "@mui/icons-material/Warning";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import WorkIcon from '@mui/icons-material/Work';
import PageviewIcon from '@mui/icons-material/Pageview';
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";

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

const SidebarSection = ({ title, open, setOpen, children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Typography
        variant="h6"
        color={colors.grey[100]}
        sx={{ m: "15px 0 5px 20px", display: "flex", alignItems: "center" }}
      >
        {title} 
        <IconButton onClick={() => setOpen(!open)} size="small" sx={{ color: 'white' }}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Typography>
      <Collapse in={open}>
        {children}
      </Collapse>
    </>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [user, setUser] = useState(null);
  const [dataOpen, setDataOpen] = useState(false);
  const [projetOpen, setProjetOpen] = useState(false);
  const [ressourcesOpen, setRessourcesOpen] = useState(false);
  const [ressourcesHumOpen, setRessourcesHumOpen] = useState(false);
  const [administrationOpen, setAdministrationOpen] = useState(false);
  const [comptableOpen, setComptableOpen] = useState(false);
  const [parametrageOpen, setParametrageOpen] = useState(false);

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
          color: "#fff !important",
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
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} sx={{ color: 'white' }}>
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
            <SidebarSection title="Data" open={dataOpen} setOpen={setDataOpen}>
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
            </SidebarSection>

            {/* Projet Section */}
            <SidebarSection title="Projet" open={projetOpen} setOpen={setProjetOpen}>
              <Item
                title="Gestion Projet"
                to="/projet"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SidebarSection>

       {/* Ressources Section */}
<Typography
  variant="h6"
  color={colors.grey[300]}
  sx={{ m: "15px 0 5px 20px" }}
>
  Ressources Materielles
  <IconButton onClick={() => setRessourcesOpen(!ressourcesOpen)}>
    {ressourcesOpen ? "-" : "+"}
  </IconButton>
</Typography>
{ressourcesOpen && (
  <>
    <Item
      title="Creation Ressource Materiel"
      to="/CreationRessourceMateriel"
      icon={<BuildOutlinedIcon />} // Icône pour création
      selected={selected}
      setSelected={setSelected}
    />
    <Item
      title="Consultation Ressource Materiel"
      to="/ConsultationRessourceMateriel"
      icon={<PageviewIcon />} 
      selected={selected}
      setSelected={setSelected}
    />
  </>
)}

            {/* Ressources Humaines Section */}
            <SidebarSection title="Ressources Humaines" open={ressourcesHumOpen} setOpen={setRessourcesHumOpen}>
              <Item
                title="Gestion Ressources Humaines"
                to="/gestionrh"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Consultation Ressources Humaines"
                to="/ConsultationRessourceMateriel"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SidebarSection>
{/* job Section */}
<Typography
  variant="h6"
  color={colors.grey[300]}
  sx={{ m: "15px 0 5px 20px" }}
>
  JOB
  <IconButton onClick={() => setProjetOpen(!projetOpen)}>
    {projetOpen ? "-" : "+"}
  </IconButton>
</Typography>
{projetOpen && (
  <>
    <Item
      title="Création d'un job"
      to="/CreationJob"
      icon={<WorkIcon />} 
      selected={selected}
      setSelected={setSelected}
    />
    <Item
      title="Consultation d'un job"
      to="/ConsultationJob"
      icon={<PageviewIcon />} 
      selected={selected}
      setSelected={setSelected}
    />
  </>
)}
            {/* Administration Section */}
            <SidebarSection title="Administration" open={administrationOpen} setOpen={setAdministrationOpen}>
              <Item
                title="Gestion des droits d'accès"
                to="/Gestionacces"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SidebarSection>
            {/* Interface comptable  */}
            <SidebarSection title="Comptable" open={comptableOpen} setOpen={setComptableOpen}>
              <Item
                title="Upload Comptable R"
                to="/Gestionacces"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Consultation Comptable R"
                to="/Gestionacces"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SidebarSection>
            {/* Paramétrages Section */}
            <SidebarSection title="Paramétrages" open={parametrageOpen} setOpen={setParametrageOpen}>
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
                icon={<WarningIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="NatureStructure"
                to="/naturestruct"
                icon={<CorporateFareIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="NatureRelation"
                to="/naturerelation"
                icon={<AccountTreeIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Statut"
                to="/statut"
                icon={<AccountTreeIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Relation Projet"
                to="/relprojet"
                icon={<AccountTreeIcon />}
                selected={selected}
                setSelected={setSelected}
              />
               <Item
                title="Groupe Ressource"
                to="/grouperessource"
                icon={<AccountTreeIcon />}
                selected={selected}
                setSelected={setSelected}
              />



            </SidebarSection>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;