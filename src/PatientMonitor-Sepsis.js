import React, {useState, useEffect} from 'react';
import { 
  Box,
  Button, 
  Stack
} from '@mui/material';

import MainScreen from './MainScreen-Sepsis.js'
import PatientHeader from './PatientHeader-Sepsis.js'
import VitalTrends from './VitalTrends.js';
import CardiacView from './CardiacView.js';
import {vitalSignsEcgData}  from './data/vitalSignsEcgData.js';
const PatientMonitorSepsis = () => {
  let ecgIndex = 0;
  const [vitals, setVitals] = useState({
    hr: 120,
    spo2: 88,
    base: -8,
    bp: "70/40",
    map: 50,
    resp: 32,
    shockIndex: 1.7,
    co: 4.2,
    hemoglobin: 10,
    gcs: 13,
    ef: 35,
    fluid: '+250',
    urine: '110',
    weight: 82.5,
    weightChange: '+1.5',
    bnp: 850,
    lactate: 4.0,
    cvp: 10,
    mews: 9,
    creatine: 1.4,
    bilirubin: 4.0,
    temperature: 35.4, 
    sofa: 14
  });

  const [patientState, setPatientState] = useState({
    name: "Aysel Yılmaz",
    id: "P123457",
    age: 70,
    bed:'Kritik-05',
    disease: "Sepsis",
    condition: "Unstable",
    secondline: "Possible septic shock"
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
        hr: (120 + Math.random()).toFixed(0),
        spo2: (88 + Math.random()).toFixed(0),
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
        {screen === "main" && <MainScreen vitals={vitals} ecgData={ecgData} setScreen={setScreen}></MainScreen>}
        {screen === "trends" && <VitalTrends></VitalTrends>}
        {screen === "cardiac" && <CardiacView ecgData={ecgData}></CardiacView>}
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
            Overview
          </Button>
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
            Medications
          </Button>
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
            Lab Results
          </Button>
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

export default PatientMonitorSepsis;