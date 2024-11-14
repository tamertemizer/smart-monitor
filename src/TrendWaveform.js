import React from 'react';
import {
  Box
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ECG Waveform Component
const TrendWaveform = ({ data, min, max, color, height="100px", timeResolution="minute"}) => (
  <Box sx={{ 
    height: {height},
    width: '19vw',
    bgcolor: 'background.paper',
    p: 2,
    borderRadius: 1
  }}>
    <ResponsiveContainer>
      <LineChart data={data}>
        <XAxis 
          dataKey="time" 
          stroke="#fff"
        />
        <YAxis 
          domain={[
            min,
            max
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
          stroke={color}
          dot={timeResolution === 'day'}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </Box>
  );

export default TrendWaveform;