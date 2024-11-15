import './App.css';
import PatientMonitorTraumaYatis from './PatientMonitor-TraumaYatis';
import PatientMonitorTrauma2 from './PatientMonitor-Trauma2';
import PatientMonitorSepsis from './PatientMonitor-Sepsis';
import {
  ThemeProvider,
  createTheme,
  Box,
  Button
} from '@mui/material';
import React, {useState} from 'react';


// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#121212'
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
  text: {
    primary: '#ffffff',
    secondary: '#ffffff'
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff'  // This ensures all Typography components are white
        }
      }
    }
  }
});

function App() {
  const [screen, setScreen] = useState("trauma-yatis");
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          height: '100vh',
          bgcolor: 'background.default',
          width: '100%',
          margin: '10px'
          
        }}>
          <Box sx={{alignSelf: "center", display: "flex", marginBottom: "20px"}} >
            <Button sx={{marginRight:"10px"}} variant='outlined' onClick={()=>{setScreen("trauma-yatis")}}>Trauma - Admission</Button>
            <Button sx={{marginRight:"10px"}} variant='outlined'onClick={()=>{setScreen("trauma2")}}>Trauma - 30 minutes later</Button>
            <Button sx={{marginRight:"10px"}} variant='outlined' onClick={()=>{setScreen("sepsis")}}>Sepsis</Button>
          </Box>
          {screen === "trauma-yatis" && <PatientMonitorTraumaYatis></PatientMonitorTraumaYatis>}
          {screen === "trauma2" && <PatientMonitorTrauma2></PatientMonitorTrauma2>}
          {screen === "sepsis" && <PatientMonitorSepsis></PatientMonitorSepsis>}
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
