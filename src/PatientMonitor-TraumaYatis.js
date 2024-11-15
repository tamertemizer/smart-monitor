import React, {useState, useEffect} from 'react';
import { 
  Box,
  Button, 
  Stack
} from '@mui/material';

import MainScreen from './MainScreen-TraumaYatis.js'
import PatientHeader from './PatientHeader.js'
import VitalTrends from './VitalTrends.js';
import CardiacView from './CardiacView.js';
import {vitalSignsEcgData}  from './data/vitalSignsEcgData.js';
const PatientMonitorTraumaYatis = () => {
  let ecgIndex = 0;
  const [vitals, setVitals] = useState({
    hr: 80,
    spo2: 95,
    base: -2,
    bp: "120/80",
    map: 93,
    resp: 20,
    shockIndex: 0.6,
    co: 4.2,
    hemoglobin: 11,
    gcs: 15,
    ef: 35,
    fluid: '+250',
    urine: '30',
    weight: 82.5,
    weightChange: '+1.5',
    bnp: 850,
    lactate: 2.1,
    jvp: 10,
    mews: 2
  });

  const [patientState, setPatientState] = useState({
    name: "Ahmet Yılmaz",
    id: "P123456",
    age: 18,
    bed:'Kritik-04',
    disease: "Trauma",
    condition: "Stable"
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
        hr: (80 + Math.random()).toFixed(0),
        spo2: (97 + Math.random()).toFixed(0),
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

export default PatientMonitorTraumaYatis;