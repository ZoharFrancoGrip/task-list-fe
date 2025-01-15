
import { useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { TasksDashboard } from "./pages/TasksDashboard";
import { Box, IconButton } from "@mui/material";
import { Brightness2Rounded, Brightness7 } from "@mui/icons-material";
import { createTaskTheme } from "./theme";


const styles = {
  darkModeToggleButton: {position: 'absolute', top: 10, right: 10},
  tasksDashboard: {height: '100vh'}
}


export function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(() => createTaskTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <IconButton onClick={() => setDarkMode(!darkMode)} sx={styles.darkModeToggleButton}  >
          {darkMode ? <Brightness7 /> : <Brightness2Rounded />}
        </IconButton>
        <Box sx={styles.tasksDashboard}><TasksDashboard /></Box>;
     
    </ThemeProvider>
  );
}

export default App;