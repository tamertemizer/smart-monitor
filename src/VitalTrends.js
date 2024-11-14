import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VitalTrends = () => {
  // State for selected vital and time resolution
  const [selectedVital, setSelectedVital] = useState('heartRate');
  const [timeResolution, setTimeResolution] = useState('minute');
  const [trendData, setTrendData] = useState([]);

  // Vital signs options
  const vitalOptions = {
    heartRate: {
      label: 'Heart Rate',
      unit: 'bpm',
      color: '#00ff00',
      range: { min: 40, max: 140 }
    },
    bloodPressure: {
      label: 'Blood Pressure',
      unit: 'mmHg',
      color: '#00ffff',
      range: { min: 60, max: 180 }
    },
    spO2: {
      label: 'SpO2',
      unit: '%',
      color: '#ff0000',
      range: { min: 85, max: 100 }
    },
    respRate: {
      label: 'Respiratory Rate',
      unit: '/min',
      color: '#ffff00',
      range: { min: 8, max: 30 }
    }
  };

  // Generate sample data based on time resolution
  useEffect(() => {
    const generateData = () => {
      const points = {
        'minute': 60,
        'hour': 24,
        'day': 7
      }[timeResolution];

      const timeFormat = {
        'minute': 'mm:ss',
        'hour': 'HH:mm',
        'day': 'MM/DD'
      }[timeResolution];

      // Generate timestamps
      const now = new Date();
      const data = [];

      for (let i = points; i >= 0; i--) {
        const time = new Date(now - i * {
          'minute': 60 * 1000,
          'hour': 60 * 60 * 1000,
          'day': 24 * 60 * 60 * 1000
        }[timeResolution]);

        // Generate realistic vital sign data with some variation
        const baseValue = {
          heartRate: 75,
          bloodPressure: 120,
          spO2: 98,
          respRate: 16
        }[selectedVital];

        const variation = Math.sin(i * 0.5) * 5 + (Math.random() - 0.5) * 3;

        data.push({
          time: time.toLocaleTimeString(),
          value: baseValue + variation
        });
      }

      setTrendData(data);
    };

    generateData();
    // Set up periodic updates if showing minute-by-minute data
    const interval = timeResolution === 'minute' ? setInterval(generateData, 1000) : null;
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedVital, timeResolution]);

  return (
      <Box sx={{ 
        bgcolor: 'background.default',
        p: 3,
        color: 'white'
      }}>
        {/* Controls */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 3,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
            <Box sx={{ 
          display: 'flex', 
          gap: 2
        }}>
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={selectedVital}
              onChange={(e) => setSelectedVital(e.target.value)}
              sx={{ bgcolor: 'background.paper' }}
            >
              {Object.entries(vitalOptions).map(([key, option]) => (
                <MenuItem key={key} value={key}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <ToggleButtonGroup
            value={timeResolution}
            exclusive
            onChange={(e, newValue) => {
              if (newValue !== null) setTimeResolution(newValue);
            }}
            sx={{ bgcolor: 'background.paper' }}
          >
            <ToggleButton value="minute">
              Minute
            </ToggleButton>
            <ToggleButton value="hour">
              Hour
            </ToggleButton>
            <ToggleButton value="day">
              Day
            </ToggleButton>
          </ToggleButtonGroup>
          </Box>
            {/* Current Value */}
            <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6">
                Current: {trendData[trendData.length - 1]?.value.toFixed(1)} {vitalOptions[selectedVital].unit}
            </Typography>
            </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ 
          height: '50vh', 
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 1
        }}>
          <ResponsiveContainer>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                stroke="#fff"
              />
              <YAxis 
                domain={[
                  vitalOptions[selectedVital].range.min,
                  vitalOptions[selectedVital].range.max
                ]}
                stroke="#fff"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#333',
                  border: 'none'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={vitalOptions[selectedVital].color}
                dot={timeResolution === 'day'}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
  );
};

export default VitalTrends;