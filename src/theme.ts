import { createTheme } from "@mui/material/styles";


declare module "@mui/material/styles" {
  interface DarkLightColors {
    blue?: string;
    red?: string;
    green?: string;
    orange?: string;
    yellow?: string;
    [key: string]: string | undefined;
  }

  interface Palette {
    darkLight: DarkLightColors;
  }

  interface PaletteOptions {
    darkLight?: DarkLightColors;
  }
}


export const createTaskTheme = (darkMode: boolean) => createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      
      darkLight: {
        blue: darkMode ? "#38b3f1" : "#247df1",
        red: darkMode ? "#f84040" : "red",
        green: darkMode ? "#47f347" : "green",
        orange: darkMode ? "#f1a538" : "orange",
        yellow: darkMode ? "#f1f138" : "yellow",
      },

      background: {
        default: darkMode ? "#121212" : "#f0f0f0",
      },
      text: {
        primary: darkMode ? "#f0f0f0" : "#121212",
      },
      primary: {
        main: darkMode ? "#38b3f1" : "#247df1",
      },
      secondary: {
        main: darkMode ? "#f0f0f0" : "#121212",
      },
    },
  });