import React, {useState, useEffect} from 'react';
import { 
  Box,
  Button, 
  Stack
} from '@mui/material';

import MainScreen from './MainScreen.js'
import PatientHeader from './PatientHeader.js'
import VitalTrends from './VitalTrends.js';
import CardiacView from './CardiacView.js';

const PatientMonitor = () => { 
  const [vitals, setVitals] = useState({
    hr: 72,
    spo2: 95,
    bp: "125/84",
    map: 98,
    resp: 18,
    co: 4.2,
    ef: 35,
    fluid: '+250',
    weight: 82.5,
    weightChange: '+1.5',
    bnp: 850,
    lactate: 2.1,
    jvp: 10,
    mews: 3
  });

  const [patientState, setPatientState] = useState({
    name: "Ahmet Yılmaz",
    id: "P123456",
    age: 45,
    disease: "Congestive Heart Failure",
    condition: "Stable"
  });


  // Generate ECG-like data
  const generateECGData = (length) => {
    return Array.from({ length }, (_, i) => ({
      time: i,
      value: 
        Math.sin(i * 0.4) * 20 + // Base sine wave
        (i % 25 === 0 ? 50 : 0) + // QRS spike
        (Math.random() - 0.5) * 5 // Noise
    }));
  };

  // State for ECG data
  const [ecgData, setEcgData] = useState({
    I: generateECGData(100),
    II: generateECGData(100),
    III: generateECGData(100),
    V1: generateECGData(100),
    aVR: generateECGData(100),
    aVL: generateECGData(100),
    aVF: generateECGData(100),
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Update vitals
      setVitals(prev => ({
        ...prev,
        hr: (60 + Math.random()).toFixed(0),
        spo2: (97 + Math.random()).toFixed(0),
      }));

      // Update ECG data
      setEcgData({
        I: generateECGData(100),
        II: generateECGData(100),
        III: generateECGData(100),
        V1: generateECGData(100),
        aVR: generateECGData(100),
        aVL: generateECGData(100),
        aVF: generateECGData(100),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // Patient state management
  const [screen, setScreen] = useState("main");

  return (
    
      <Box>
        {/* Patient Info Header */}
        <PatientHeader patientState={patientState}></PatientHeader>
        {screen === "main" && <MainScreen vitals={vitals} ecgData={ecgData} setScreen={setScreen}></MainScreen>}
        {screen === "trends" && <VitalTrends></VitalTrends>}
        {screen === "cardiac" && <CardiacView ecgData={ecgData}></CardiacView>}
        {/* Bottom Menu */}
        <Stack 
          direction="row" 
          spacing={0.5} 
          justifyContent="center"
          mt={2}
        >
          <Button 
            variant="outlined"
            onClick={()=>setScreen("main")}
            sx={{ 
              bgcolor: '#d0d0d0', 
              color: 'black',
              '&:hover': {
                bgcolor: '#c0c0c0',
              }
            }}
          >
            Main Screen
          </Button>
          <Button 
            variant="outlined"
            onClick={()=>setScreen("overview")}
            sx={{ 
              bgcolor: '#d0d0d0', 
              color: 'black',
              '&:hover': {
                bgcolor: '#c0c0c0',
              }
            }}
          >
            Overview
          </Button>
          <Button 
            variant="outlined"
            onClick={()=>setScreen("medication")}
            sx={{ 
              bgcolor: '#d0d0d0', 
              color: 'black',
              '&:hover': {
                bgcolor: '#c0c0c0',
              }
            }}
          >
            Medications
          </Button>
          <Button 
            variant="outlined"
            onClick={()=>setScreen("lab")}
            sx={{ 
              bgcolor: '#d0d0d0', 
              color: 'black',
              '&:hover': {
                bgcolor: '#c0c0c0',
              }
            }}
          >
            Lab Results
          </Button>
          <Button 
            variant="outlined"
            onClick={()=>setScreen("notes")}
            sx={{ 
              bgcolor: '#d0d0d0', 
              color: 'black',
              '&:hover': {
                bgcolor: '#c0c0c0',
              }
            }}
          >
            Notes
          </Button>
          <Button 
            variant="outlined"
            onClick={()=>setScreen("trends")}
            sx={{ 
              bgcolor: '#d0d0d0', 
              color: 'black',
              '&:hover': {
                bgcolor: '#c0c0c0',
              }
            }}
          >
            Trends
          </Button>
        </Stack>
      </Box>
  );
};

export default PatientMonitor;