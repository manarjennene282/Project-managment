import React, { useState, useEffect } from "react"; // Add this line
import { Box, Button, IconButton, Typography } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Semaine Component
const Semaine = () => {
  const weeksPerView = 6;
  const totalYears = 10; // Nombre d'années à afficher, ajustez selon votre besoin
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Logic for generating weeks and rendering UI
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

  // Render UI for weeks...
  return (
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
  );
};

export default Semaine;
