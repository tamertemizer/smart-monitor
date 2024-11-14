import React from 'react';
import { 
    Box
} from '@mui/material';
import { LineChart, Line, ResponsiveContainer, CartesianGrid } from 'recharts';

// ECG Waveform Component
const Waveform = ({ data, color, height="100px", width="100%" }) => (
    <Box sx={{ 
      height: {height}, 
      width: {width},
      border: '1px solid #333',
      bgcolor: 'background.default'}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke= {color}
            dot={false} 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );

export default Waveform;