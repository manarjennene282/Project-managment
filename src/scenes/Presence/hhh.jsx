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
  const [chartOptions, setChartOptions] = useState({
    series: [70, 30], // Data for the donut chart
    options: {
      chart: { type: "donut" },
      plotOptions: {
        pie: { startAngle: -90, endAngle: 90, offsetY: 10 }, // Half-donut
      },
      labels: ["Utilisés", "Restants"],
      colors: ["#4CAF50", "#C0C0C0"],
      legend: { position: "bottom" },
      title: { text: "Tickets Restaurant du mois", align: "center" },
    },
  });

  useEffect(() => {
    // Charger les informations de l'utilisateur depuis localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);

      // Initialiser les données avec l'utilisateur connecté
      setData([
        {
          name: `${user.nom} ${user.prenom} (${user.matricule})`,
          presence: Array.from({ length: 7 }, () => [false, false]),
          presenceButtons: [false, false],
          leaveBalance: 30,
         usedLeave: 10,
        },
      ]);
    }
  }, []);

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

  const scrollLeft = () => {
    if (selectedWeek > 1) {
      setSelectedWeek((prev) => prev - 1); // Passer à la semaine précédente
    } else {
      console.log("Vous êtes déjà à la première semaine disponible.");
    }
  };

  const scrollRight = () => {
    const totalWeeks = weeks.length;

    if (selectedWeek === totalWeeks) {
      setCurrentYear((prevYear) => prevYear + 1); // Passer à l'année suivante
      setSelectedWeek(1); // Recommencer à la première semaine de l'année suivante
    } else {
      setSelectedWeek((prev) => prev + 1); // Avancer d'une semaine
    }
  };

  const visibleWeeks = (() => {
    const allWeeks = [];

    // Générer les semaines pour une plage d'années
    for (let i = 0; i < totalYears; i++) {
      const year = currentYear + i;
      allWeeks.push(...generateWeeks(year));
    }

    const totalWeeksInCurrentYear = weeks.length;
    const selectedIndex =
      selectedWeek + totalWeeksInCurrentYear * (currentYear - new Date().getFullYear());
    return allWeeks.slice(
      Math.max(0, selectedIndex - Math.floor(weeksPerView / 2)),
      Math.max(0, selectedIndex - Math.floor(weeksPerView / 2)) + weeksPerView
    );
  })();

  const daysOfWeek = [
    { name: "Lun.", color: "white" },
    { name: "Mar.", color: "white" },
    { name: "Mer.", color: "white" },
    { name: "Jeu.", color: "white" },
    { name: "Ven.", color: "white" },
    { name: "Sam.", color: "white" },
    { name: "Dim.", color: "white" },
  ];

  const handlePresenceClick = (rowIndex, dayIndex, slotIndex) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      const updatedDaySlots = [...updatedData[rowIndex].presence[dayIndex]];
      updatedDaySlots[slotIndex] = !updatedDaySlots[slotIndex];
      updatedData[rowIndex].presence[dayIndex] = updatedDaySlots;
      return updatedData;
    });
  };

  const handlePresenceButtonClick = (rowIndex, buttonIndex) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[rowIndex].presenceButtons[buttonIndex] = !updatedData[rowIndex].presenceButtons[buttonIndex];
      return updatedData;
    });
  };

  const leaveBalanceData = {
    labels: ["Used Leave", "Remaining Leave"],
    datasets: [
      {
        data: [data[0].usedLeave, data[0].leaveBalance - data[0].usedLeave],
        backgroundColor: ["#FF6347", "#4CAF50"],
      },
    ],
  };

 ;
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, color: "purple" }}>
        Calendrier
      </Typography>

      <Box display="flex" alignItems="center">
        <IconButton onClick={scrollLeft}>
          <ArrowBackIosIcon />
        </IconButton>
        <Box display="flex" justifyContent="center" gap={2}>
  {visibleWeeks.map((week, index) => (
    <Box
      key={index}
       sx={{
      padding: "12px 24px", // Ajuste l'espace intérieur
      backgroundColor: selectedWeek === week.weekNumber ? "#1976D2" : "#f0f0f0", // Couleur sélectionnée
      color: selectedWeek === week.weekNumber ? "white" : "black",
      borderRadius: "8px",
      boxShadow: selectedWeek === week.weekNumber ? "0px 0px 8px rgba(0,0,0,0.2)" : "none",
      textAlign: "center",
      width: "250px", // Largeur fixe du rectangle
      flexShrink: 0,  // Empêche le rectangle de se réduire
      margin: "0 8px", // Ajoute un espacement horizontal entre les rectangles
      cursor: "pointer", // Change le curseur pour indiquer la sélection possible
    }}
    >
      <Typography variant="body1" fontWeight="bold">
        Semaine {week.weekNumber}
      </Typography>
      <Typography variant="body2">
        {week.startDate} - {week.endDate}
      </Typography>
    </Box>
  ))}
</Box>

        <IconButton onClick={scrollRight}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

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
                  {day.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
               <TableCell>
      <Box display="flex" alignItems="center" gap={1}>
        <BookmarkIcon sx={{ color: "black" }} /> {/* Icône noire par défaut */}
        <Typography sx={{ fontWeight: "bold" }}>{data[0].name}</Typography>
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
  <Box sx={{ width: "48%" }}>
    <Doughnut 
      data={leaveBalanceData} 
      options={{
        responsive: true,
        maintainAspectRatio: false,  // Permet de redimensionner le graphique
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Solde de Congé",
          },
        },
      }} 
      height={250}
    />
  </Box>

  {/* Tickets Restaurant */}
  <Box sx={{ width: "48%" }}>
    
  <ReactApexChart 
  options={chartOptions.options} 
  series={chartOptions.series} 
  type="donut" 
  height={250} 
/>

  </Box>
</Box>

<Box sx={{ marginTop: 20, textAlign: "center", marginLeft: 200 }}>
  <Button 
    variant="contained" 
    sx={{ 
      padding: "10px 50px", 
      fontSize: "16px", 
      backgroundColor: "#1976d2",  // Set the button color to blue
      "&:hover": {
        backgroundColor: "#1565c0"  // Change color on hover (darker blue)
      }
    }}
    onClick={() => alert('Validation complete!')}  // Replace with actual validation logic
  >
    Valider
  </Button>
</Box>

</Box>




 );
};

export default Presence;

