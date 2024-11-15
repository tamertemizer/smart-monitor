import React, {useState, useEffect} from 'react';
import { 
  Box,
  Grid,
  Typography
} from '@mui/material';

import { Heart, Droplet, Wind, Activity, BarChart2, Settings } from 'lucide-react';
import VitalDisplay from './VitalDisplay.js'
import Paper from '@mui/material/Paper';
import TrendWaveform from './TrendWaveform.js';
import Waveform from './Waveform.js';

const MainScreen = ({vitals, ecgData, setScreen}) => {

  const [spO2Trend, setSpO2Trend] = useState([]);
  const [rrTrend, setRRTrend] = useState([]);

  const vitalsData = [
    {
      label: "Heart Rate",
      value: vitals.hr,
      unit: "bpm",
      color: "#00ff00",
      state: "warning",
      alert: true,
      showTrend : true,
      icon: Heart
    },
    {
      label: "Blood Pressure",
      value: vitals.bp,
      unit: "mmHg",
      secondaryValue: `${vitals.map} mmHg`,
      secondaryLabel: "MAP",
      color: "#ffff00",
      state: "critical",
      showTrendDown : true,
      icon: Activity
    },
    {
      label: "Respiratory Rate",
      value: vitals.resp,
      unit: "/min",
      color: "#00ffff",
      state: "critical",
      alert: true,
      showTrend : true,
      icon: Wind
    },
    {
      label: "Temperature",
      value: vitals.temperature,
      unit: "C",
      color: "#00ff00",
      state: "critical",
      showTrendDown : true,
      icon: Activity
    },
    // Bu bos ama onemli 
    {
      label: "Urine Output",
      value: vitals.urine,
      unit: "mL/24h",
      color: "#ff00ff",
      icon: Droplet,
      state: "warning",
      showTrendDown: true,
      alert: true
    },
    {
      label: "Lactate",
      value: vitals.lactate,
      unit: "mmol/l",
      color: "#ff00ff",
      state: "warning",
      showTrend : true,
      icon: Wind
    },
    {
      label: "Creatine",
      value: vitals.creatine,
      unit: "g/dl",
      color: "#ff00ff",
      showTrend: true,
      secondaryValue: "-1 g/dl",
      icon: Droplet,
      alert: true
    },
    {
      label: "Bilirubin",
      value: vitals.bilirubin,
      unit: "mg/dl",
      color: "#ff00ff",
      showTrend: true,
      icon: Settings
    },
    {
      label: "GCS",
      value: vitals.gcs,
      unit: "/15",
      color: "#ffeeee",
      showTrendDown: true,
      icon: Settings
    },
    {
      label: "Shock Index",
      value: vitals.shockIndex,
      unit: "",
      color: "#ffeeee",
      state: "critical",
      showTrend : true,
      icon: Activity
    },
    {
      label: "MEWS",
      value: vitals.mews,
      color: "#ffeeee",
      unit: "/ 14",
      icon: Activity,
      secondaryValue: '0-3',
      state: "warning",
      showTrend : true,
      secondaryLabel: "Normal Value"
    },

    {
      label: "SOFA score",
      value: vitals.sofa,
      color: "#ffeeee",
      unit: "",
      icon: Activity,
      state: "warning",
      showTrend : true
    }
  ];

 
  const timeResolution = 'minute';
    // Generate sample data based on time resolution
  useEffect(() => {
    const generateData = () => {
      const points = {
        'minute': 60,
        'hour': 24,
        'day': 7
      }[timeResolution];
    
      const now = new Date();
      const spo2data = [];
      const rrdata = [];
    
      for (let i = points; i >= 0; i--) {
        const time = new Date(now - i * {
          'minute': 60 * 1000,
          'hour': 60 * 60 * 1000,
          'day': 24 * 60 * 60 * 1000
        }[timeResolution]);
    
          // Generate realistic vital sign data with some variation
          const spo2Base = 97;
          const spo2variation = Number((Math.sin(i * 0.5) + (Math.random() - 0.5)).toFixed(1));
          
          spo2data.push({
            time: time.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false // This will show time in 24-hour format
            }),
            value: Number((spo2Base + spo2variation).toFixed(1)) // Ensure value is a number
          });
    
          const rrBase = 18;
          const rrvariation = Number((Math.sin(i * 0.5) + (Math.random() - 0.5)).toFixed(1));
          
          rrdata.push({
            time: time.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false // This will show time in 24-hour format
            }),
            value: Number((rrBase + rrvariation).toFixed(1)) // Ensure value is a number
          });
        }
    
        setSpO2Trend(spo2data);
        setRRTrend(rrdata);
      };
    
      generateData();
      
      const interval = timeResolution === 'minute' ? setInterval(generateData, 1000) : null;
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [timeResolution]); // Added timeResolution as dependency

    return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}>
      <Paper elevation={1} sx={{ spacing:'4', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* Cardiac */}
        <Paper onClick={()=>{setScreen("cardiac")}} elevation={3} sx={{ spacing:'4', padding:'10px', margin:'5px',display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box 
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
              position: 'relative',
              height: '42px'
            }}
          >
            <Box  sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1
            }}>
              <Heart color='#00ff00' size={20} />
              <Typography sx={{color:'#00ff00'}}>Cardiac</Typography>
            </Box>
            <Box sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'auto'
            }}>
              <Typography variant="subtitle1" component="h1">Sinus Rhythm</Typography>
              <Typography variant="body2" fontSize="0.75rem" color="#EBEBE4" component="p">No issues detected</Typography>
              <Typography variant="body2" fontSize="0.75rem" color="#EBEBE4" component="p">Click to expand</Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: {sm:'column', md:'row'},
              alignItems: 'baseline',
              gap: 1,
              marginLeft: 'auto'
            }}>
              <Typography variant="h4" color="#00ff00" component="h1">{vitals.hr}</Typography>
              <Typography variant="subtitle2" component="h1">bpm</Typography>
            </Box>
          </Box>
          <Box sx={{ position: 'relative', margin: '10px 10px 0 10px' }}>
            <Typography sx={{ position: 'absolute', left: 7, top: 2 }}>II</Typography>
            <Waveform data={ecgData.II} width="40vw" color="#00ff00" />
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ spacing:'4', padding:'10px', margin:'5px',display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box 
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
              position: 'relative',
              height: '42px'
            }}
          >
            <Box  sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1
            }}>
              <Wind color='#00ffff' size={20} />
              <Typography sx={{color:'#00ffff'}}>Ventilation</Typography>
            </Box>
            <Box sx={{
              position: 'absolute',
              left: {xs:'80%', sm:'50%'},
              transform: 'translateX(-50%)',
              width: 'auto'
            }}>
              <Typography variant="subtitle1" component="h1">Hyperventilation</Typography>
            </Box>
          </Box>
          <Box sx={{ position: 'relative', margin: '10px 10px 0 10px', display:'flex', flexDirection:{ xs: 'column', sm: 'column', lg: 'row' }, justifyContent:'space-around', spacing:'4', gap: 1 }}>
            <Paper sx={{ position: 'relative'}}>
              <Box sx={{ margin: '10px', display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}} >
                  <Typography variant="h5" component="h1">Respiratory Rate</Typography>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    gap: 1,
                    marginLeft: 'auto'
                  }}>
                    <Typography variant="h4" color="#00ffff" component="h1">{vitals.resp}</Typography>
                    <Typography variant="subtitle2" component="h1">/ min</Typography>
                  </Box>
              </Box>
              <TrendWaveform data={rrTrend.filter(item => item.value != null)} width={{xs:'80vw', md:"40vw", lg:'19vw'}} min={10} max={25} height='200px' color="#00ffff" />
            </Paper>
            <Paper sx={{ position: 'relative'}}>
              <Box sx={{ margin: '10px', display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}} >
                  <Typography variant="h5" component="h1">SpO2</Typography>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    gap: 1,
                    marginLeft: 'auto'
                  }}>
                    <Typography variant="h4" color="#00ffff" component="h1">{vitals.spo2}</Typography>
                    <Typography variant="subtitle2" component="h1">%</Typography>
                  </Box>
              </Box>
              <TrendWaveform data={spO2Trend.filter(item => item.value != null)} min={70} max={100} width={{xs:'80vw', md:"40vw",lg:'19vw'}} height='200px' color="#00ffff" />
            </Paper>
          </Box>
        </Paper>
      </Paper>
    
      {/* Vital Signs */}
      <Paper elevation={1} sx={{ p: 2, width: '100%' }}>
        <Grid container spacing={2}>
        {vitalsData.map((vital, index) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
            <Box sx={{ p: 2, height: '100%', display:"flex", justifyContent:"center" }}>
              <VitalDisplay {...vital} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
    </Box>);
}

export default MainScreen;