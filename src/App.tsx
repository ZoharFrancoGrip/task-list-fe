
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TasksDashboard from "./pages/TasksDashboard";
import { Box, IconButton } from "@mui/material";
import { Brightness2Rounded, Brightness7 } from "@mui/icons-material";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      
      darkLight: {
        blue: darkMode ? "#38b3f1" : "blue",
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
        main: darkMode ? "#f0f0f0" : "#121212",
      },
      secondary: {
        main: darkMode ? "#f0f0f0" : "#121212",
      },
      
      
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <IconButton onClick={() => setDarkMode(!darkMode)} sx={{position: 'absolute', top: 10, right: 10}}  >
          {darkMode ? <Brightness7 /> : <Brightness2Rounded />}
        </IconButton>
        <Box sx={{height: '100vh'}}><TasksDashboard /></Box>;
     
    </ThemeProvider>
  );
}

export default App;