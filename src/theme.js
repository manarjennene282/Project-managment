import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#1F2A40",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#fff",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#8086f7",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        grey: {
          100: "#fff",
          200: "#292929",
          300: "#fff",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#032b49", // side bar 
          500: "#141b2d",
          600: "#1F2A40",
          700: "#fff",//couleur background de tableau 
          800: "#ffffff",//couleur background taht tableau 
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#114af1",
          500: "#70d8bd",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#390202",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",//ligne entre les tableau mauve 
          600: "#868dfb",
          700: "#032b49", // Nouvelle couleur grise pour l'en-tête du tableau
          800: "#c3c6fd",
          900: "#ffffff",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "arial"].join(","), // Police moderne
      fontSize: 14, // Taille de base légèrement augmentée
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 48, // Plus grand pour les titres principaux
        fontWeight: 700, // Gras
        letterSpacing: "-0.02em", // Espacement des lettres légèrement resserré
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 36,
        fontWeight: 700,
        letterSpacing: "-0.015em",
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 28,
        fontWeight: 600, // Semi-gras
        letterSpacing: "-0.01em",
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: 600,
        letterSpacing: "-0.005em",
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 600,
        letterSpacing: "0em",
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: "0.005em",
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: 500, // Moyen
        letterSpacing: "0.01em",
      },
      subtitle2: {
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.005em",
      },
      body1: {
        fontSize: 14,
        fontWeight: 400, // Normal
        lineHeight: 1.6, // Espacement des lignes pour une meilleure lisibilité
      },
      body2: {
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 1.5,
      },
      button: {
        fontSize: 14,
        fontWeight: 600,
        textTransform: "uppercase", // Texte en majuscules pour les boutons
        letterSpacing: "0.025em",
      },
      caption: {
        fontSize: 12,
        fontWeight: 400,
        color: colors.grey[600], // Texte en gris pour les légendes
      },
      overline: {
        fontSize: 10,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
