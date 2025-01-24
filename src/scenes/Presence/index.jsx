import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";
import ReactApexChart from "react-apexcharts";
import PresenceService from "../../services/PresenceService";
import CongeChart from "./Conge";
import TicketRestoChart from "./Ticketresto";
import Semaine from "./semaine";

// Registering Chart.js components

// Registering Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const Presence = () => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState(null);
  const weeksPerView = 6;
  const totalYears = 10; // Nombre d'années à afficher, ajustez selon votre besoin
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [conge, setConge] = useState({ conge_utilise: 0, conge_restants: 30 });
  const [ticket, setTicket] = useState(null);


  //declaration des tickets rest xonst [charts option ]
    const fetchPresences = async () => {
      try {
        const savedPresences = await PresenceService.getPresences();
    
        if (!savedPresences || !Array.isArray(savedPresences)) {
          throw new Error('Les données récupérées sont invalides.');
        }
    
        const updatedData = data.map((row) => {
          const updatedPresence = row.presence.map((slots, dayIndex) => {
            const currentDate = daysOfWeek[dayIndex].date;
            const savedDay = savedPresences.find(
              (presence) => presence.date === currentDate
            );
    
            return savedDay
              ? [savedDay.presence_matin, savedDay.presence_apresmidi]
              : [false, false];
          });
    
          return {
            ...row,
            presence: updatedPresence,
          };
        });
    
        setData(updatedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des présences :', error);
      }
    };
    

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
      setData([
        {
          name: `${user.nom} ${user.prenom} (${user.matricule})`,
          presence: Array.from({ length: 7 }, () => [false, false]),
          presenceButtons: [false, false],
          leaveBalance: 30,
          usedLeave: 10,
        },
      ]);
    } else {
      // Réinitialiser l'état à la déconnexion
      setData([
        {
          name: "Guest User",
          presence: Array.from({ length: 7 }, () => [false, false]),
          presenceButtons: [false, false],
          leaveBalance: 0,
          usedLeave: 0,
        },
      ]);
    }
  }, []);
  
  // Lors de la déconnexion

  

  const generateWeeks = (year) => {
    const weeks = [];
    const firstWeekStart = getFirstWeekStart(year);
    let startDate = new Date(firstWeekStart);
    const endOfYear = new Date(year, 11, 31);

    for (let i = 0; i < 52; i++) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      if (endDate > endOfYear) break;

      weeks.push({
        weekNumber: i + 1,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      });

      startDate.setDate(startDate.getDate() + 7);
    }

    return weeks;
  };

  const getFirstWeekStart = (year) => {
    const firstDayOfYear = new Date(year, 0, 1);
    const dayOfWeek = firstDayOfYear.getDay();
    const adjustment = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    firstDayOfYear.setDate(firstDayOfYear.getDate() + adjustment);
    return firstDayOfYear;
  };

  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  useEffect(() => {
    const currentWeekNumber = getCurrentWeekNumber();
    setSelectedWeek(currentWeekNumber);
  }, [currentYear]);

  const weeks = generateWeeks(currentYear);

  const getCurrentWeekNumber = () => {
    const currentDate = new Date();
    const firstWeekStart = getFirstWeekStart(currentDate.getFullYear());
    const diffInMs = currentDate - firstWeekStart;
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    return Math.floor(diffInMs / oneWeekInMs) + 1;
  };

 


 // Helper function to get the start of the current week (Monday)
const getStartOfWeek = (currentDate) => {
  const date = new Date(currentDate);
  const dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, ...
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust for Monday as the first day
  date.setDate(date.getDate() + diff);
  return date;
};

// Generate the days of the current week dans le tableau 
const currentWeekStart = getStartOfWeek(new Date());
const daysOfWeek = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(currentWeekStart);
  date.setDate(currentWeekStart.getDate() + index);
  return {
    name: date.toLocaleDateString("fr-FR", { weekday: "short" }), // Short weekday name in French
    date: formatDate(date), // Formatted date
    color: "white", // Default color
  };
});

  
//solde congé 
 


useEffect(() => {
  const savedPresenceData = localStorage.getItem('presenceData');
  if (savedPresenceData) {
    setData(JSON.parse(savedPresenceData));
  }
}, []);

const handlePresenceClick = (rowIndex, dayIndex, slotIndex) => {
  setData((prevData) => {
    const updatedData = [...prevData];
    const updatedDaySlots = [...updatedData[rowIndex].presence[dayIndex]];
    updatedDaySlots[slotIndex] = !updatedDaySlots[slotIndex];
    updatedData[rowIndex].presence[dayIndex] = updatedDaySlots;

    // Sauvegarder les données de présence dans le localStorage
    localStorage.setItem('presenceData', JSON.stringify(updatedData));

    return updatedData;
  });
};


const handleValidation = async () => {
  try {
    const presences = data
      .map((row, rowIndex) => {
        return row.presence.map((slots, dayIndex) => {
          if (!slots[0] && !slots[1]) {
            // Skip days where both morning and afternoon are unselected
            return null;
          }

          const rawDate = daysOfWeek[dayIndex].date; // e.g., '30/12/2024'
          const [day, month, year] = rawDate.split('/');
          const formattedDate = `${year}-${month}-${day}`;

          return {
            date: formattedDate,
            presence_matin: slots[0], // Morning
            presence_apresmidi: slots[1], // Afternoon
          };
        });
      })
      .flat()
      .filter(Boolean); // Remove null entries

    const response = await PresenceService.addPresence(presences);
    alert(response.message); // Success message
  } catch (error) {
    console.error("Error while saving presences:", error);
    alert('Erreur lors de l\'enregistrement des présences');
  }
};


// click sur le bouton de careeau 40, 0 
const handlePresenceButtonClick = (rowIndex, buttonIndex) => {
  setData((prevData) => {
    const updatedData = [...prevData];
    updatedData[rowIndex].presenceButtons[buttonIndex] = !updatedData[rowIndex].presenceButtons[buttonIndex];
    return updatedData;
  });
};

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, color: "purple" }}>
        Calendrier
      </Typography>

      <Semaine></Semaine>


      <Box mt={4}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Nom</Typography>
              </TableCell>
              <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                <Button variant="outlined" size="small" sx={{ margin: "2px", minWidth: "60px" }}>
                  Présence
                </Button>
                <Button variant="outlined" size="small" sx={{ margin: "2px", minWidth: "60px" }}>
                  Absence
                </Button>
              </TableCell>
              {daysOfWeek.map((day, index) => (
        <TableCell
          key={index}
          sx={{
            backgroundColor: day.color,
            textAlign: "center",
            color: day.color === "black" ? "white" : "black",
            ...(index < daysOfWeek.length - 1 && { borderRight: "1px solid gray" }),
          }}
          colSpan={2}
        >
          {day.name} <br /> {day.date}
        </TableCell>
      ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, rowIndex) =>(
              <TableRow key={rowIndex}>
               <TableCell>
      <Box display="flex" alignItems="center" gap={1}>
        <BookmarkIcon sx={{ color: "black" }} /> {/* Icône noire par défaut */}
<Typography sx={{ fontWeight: "bold" }}>{userData ? `${userData.prenom} ${userData.nom}` : "Loading..."}</Typography>
       </Box>
    </TableCell>

                <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                  <Button variant="outlined" size="small" sx={{ margin: "2px", minWidth: "50px", backgroundColor: row.presenceButtons[0] ? "green" : "gray", color: "white" }} onClick={() => handlePresenceButtonClick(rowIndex, 0)}>40</Button>
                  <Button variant="outlined" size="small" sx={{ margin: "2px", minWidth: "50px", backgroundColor: row.presenceButtons[1] ? "green" : "gray", color: "white" }} onClick={() => handlePresenceButtonClick(rowIndex, 1)}>0</Button>
                </TableCell>
                {row.presence.map((slots, dayIndex) =>
                  slots.map((isActive, slotIndex) => (
                    <TableCell key={`${dayIndex}-${slotIndex}`} sx={{ textAlign: "center", backgroundColor: dayIndex === 5 || dayIndex === 6 ? "black" : "#f5f5f5", color: dayIndex === 5 || dayIndex === 6 ? "white" : "black" }}>
                      {dayIndex === 5 || dayIndex === 6 ? (
                        <Typography variant="body2"></Typography>
                      ) : (
                        <Button variant="outlined" size="small" sx={{ backgroundColor: isActive ? "green" : "gray", color: "white", minWidth: "30px", height: "30px", margin: "1px", borderRadius: "4px", padding: 0 }} onClick={() => handlePresenceClick(rowIndex, dayIndex, slotIndex)}>4</Button>
                      )}
                    </TableCell>
                  ))
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

   {/* Leave Balance Chart */}
{/* Leave Balance Chart */}
<Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 4 }}>
  {/* Solde de Congé */}
  <CongeChart conge={conge} />
  <TicketRestoChart ticket={ticket}/>


  {/* Tickets Restaurant */}
 
</Box>

<Box sx={{ marginTop: 20, textAlign: "center", marginLeft: 200 }}>
  <Button 
    variant="contained" 
    sx={{ 
      padding: "10px 50px", 
      fontSize: "16px", 
      backgroundColor: "#1976d2",  
      "&:hover": {
        backgroundColor: "#1565c0"  
      }
    }}
    onClick={handleValidation}  // Appeler handleValidation sur clic
  >
    Valider
  </Button>
</Box>
</Box>
 );
};
export default Presence;

