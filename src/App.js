import './App.css';
import PatientMonitor from './PatientMonitor';
import {
  ThemeProvider,
  createTheme,
  Box
} from '@mui/material';

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
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Box sx={{
          height: '100vh',
          bgcolor: 'background.default',
          width: '100%',
          margin: '10px'
        }}>
          <PatientMonitor></PatientMonitor>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
