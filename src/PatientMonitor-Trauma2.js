import React, {useState, useEffect} from 'react';
import { 
  Box,
  Button, 
  Stack,
  Paper,
  Typography
} from '@mui/material';

import MainScreen from './MainScreen-Trauma2.js'
import PatientHeader from './PatientHeader.js'
import VitalTrends from './VitalTrends.js';
import CardiacView from './CardiacView.js';
import {vitalSignsEcgData}  from './data/vitalSignsEcgData.js';
import PatientInfoHeader from './PatientInfoHeader.js';
import LabSepsis from './LabTrauma.js';
import Notes from './Notes.js';
import Medication from './Medication.js';
const PatientMonitorTrauma2 = () => {
  let ecgIndex = 0;
  const [vitals, setVitals] = useState({
    hr: 130,
    spo2: 94,
    base: -8,
    bp: "90/55",
    map: 67,
    resp: 32,
    shockIndex: 1.4,
    co: 4.2,
    hemoglobin: 10,
    gcs: 14,
    ef: 35,
    fluid: '+250',
    urine: '10',
    weight: 82.5,
    weightChange: '+1.5',
    bnp: 850,
    lactate: 2.1,
    jvp: 10,
    mews: 8
  });

  const [patientState, setPatientState] = useState({
    name: "Ahmet Yılmaz",
    id: "P123456",
    age: 18,
    bed:'Kritik-04',
    disease: "Trauma",
    condition: "Unstable",
    secondline: "Possible Stage 3 Hemorogic Shock"
  });


  // Generate ECG-like data
  const generateECGData = (length) => {
    const rand = Math.random() - 0.5;
    return Array.from({ length }, (_, i) => ({
      time: i,
      value: vitalSignsEcgData.ecgHeartRateValues[parseInt((i + rand * 20) % 5000)] * (200 + rand / 2) - (800) 
        // Noise
    }));
  };

  // State for ECG data
  const [ecgData, setEcgData] = useState({
    I: generateECGData(5000),
    II: generateECGData(5000),
    III: generateECGData(5000),
    V1: generateECGData(5000),
    aVR: generateECGData(5000),
    aVL: generateECGData(5000),
    aVF: generateECGData(5000),
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Update vitals
      setVitals(prev => ({
        ...prev,
        hr: (130 + Math.random()).toFixed(0),
        spo2: (94 + Math.random()).toFixed(0),
      }));
      

      // Update ECG data
      setEcgData({
        I: generateECGData(5000),
        II: generateECGData(5000),
        III: generateECGData(5000),
        V1: generateECGData(5000),
        aVR: generateECGData(5000),
        aVL: generateECGData(5000),
        aVF: generateECGData(5000),
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);
  // Patient state management
  const [screen, setScreen] = useState("main");

  return (
    
      <Box>
        {/* Patient Info Header */}
        <PatientHeader patientState={patientState}></PatientHeader>
        <PatientInfoHeader></PatientInfoHeader>
        {screen === "main" && <MainScreen vitals={vitals} ecgData={ecgData} setScreen={setScreen}></MainScreen>}
        {screen === "trends" && <VitalTrends></VitalTrends>}
        {screen === "cardiac" && <CardiacView ecgData={ecgData}></CardiacView>}
        {screen === "lab" && <LabSepsis></LabSepsis>}
        {screen === "notes" && <Notes></Notes>}
        {screen === "medication" && <Medication></Medication>}
        {/* Bottom Menu */}
        <Stack 
          direction={{xs:"column", sm:"row"}}
          spacing={0.5} 
          justifyContent="center"
          alignItems="center"
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
              },
              width:{xs:"70%", sm:"auto"}
            }}
          >
            Main Screen
          </Button>
          <Button 
            variant="outlined"
            onClick={()=>setScreen("medication")}
            sx={{ 
              bgcolor: '#d0d0d0', 
              color: 'black',
              '&:hover': {
                bgcolor: '#c0c0c0',
              },
              width:{xs:"70%", sm:"auto"}
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
              },
              width:{xs:"70%", sm:"auto"}
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
              },
              width:{xs:"70%", sm:"auto"}
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
              },
              width:{xs:"70%", sm:"auto"}
            }}
          >
            Trends
          </Button>
        </Stack>
      </Box>
  );
};

export default PatientMonitorTrauma2;