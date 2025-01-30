import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Presence from "./scenes/Presence";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import SignUp from "./scenes/authentification/signup";
import Login from "./scenes/authentification/login";
import Projet from "./scenes/projet/afficheprojet";
import AfficheTypeProjet from "./scenes/Parampetrage/TypeProjet/AfficheTypeProjet";

import Consultationmateriel from "./scenes/ressourcemateriel/consultationmateriel";

import Consultationjob from "./scenes/job/consultationjob";
import AccessManagement from "./scenes/Administration/Gestiondroits"
import AffichePriorite from "./scenes/Parampetrage/Priorite/AffichePriorite";
import Affichenaturestructure from "./scenes/Parampetrage/NatureStructure/Affichenaturestructure";
import AfficheNatureRelation from "./scenes/Parampetrage/NatureRelation/AfficheNatureRelation";
import Affichestatut from "./scenes/Parampetrage/statut/Affichestatut";
import AfficheRelProjet from "./scenes/Parampetrage/RelationProjet/AfficheRelProjet";
import Affichegroupe from "./scenes/Parampetrage/groupRessource/affichegroup";
import Affichenaturejob from "./scenes/Parampetrage/NatureJob/affichenaturejob";
import AfficheRessourceHumaine from "./scenes/RessourceHumaine/AfficheRessourceHumaine";
import CreationMateriel from "./scenes/ressourcemateriel/creationmateriel";
import Creationjob from "./scenes/job/creationjob";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  // Vérifier l'authentification
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifier le token dès le chargement de l'application
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const location = useLocation();
  const hideSidebarAndTopbar = ["/register", "/login"].includes(location.pathname);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!hideSidebarAndTopbar && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!hideSidebarAndTopbar && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              {/* Route par défaut */}
              <Route
                path="/"
                element={
                  isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
                }
              />
              
              {/* Routes protégées */}
              {isAuthenticated ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/geography" element={<Geography />} />
                  <Route path="/presence" element={<Presence />} />
                  <Route path="/projet" element={<Projet />} />
                  <Route path="/typeprojet" element={<AfficheTypeProjet />} />
                  <Route path="/CreationRessourceMateriel" element={<CreationMateriel />} />
                  <Route path="/ConsultationRessourceMateriel" element={<Consultationmateriel />} />
                  <Route path="/CreationJob" element={<Creationjob />} />
                  <Route path="/ConsultationJob" element={<Consultationjob />} />
                  <Route path="/Gestionacces" element={<AccessManagement />} />
                  <Route path="/priorite" element={<AffichePriorite />} />
                  <Route path="/naturestruct" element={<Affichenaturestructure />} />
                  <Route path="/naturerelation" element={<AfficheNatureRelation />} />
                  <Route path="/statut" element={<Affichestatut />} />
                  <Route path="/naturejob" element={<Affichenaturejob />} />
                  <Route path="/relprojet" element={<AfficheRelProjet />} />

                  <Route path="/grouperessource" element={<Affichegroupe />} />
                  <Route path="/gestionrh" element={<AfficheRessourceHumaine />} />


                </>
              ) : (
                <Route path="*" element={<Navigate to="/dashboard" />} />
              )}

              {/* Routes publiques */}
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
