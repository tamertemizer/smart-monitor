import React from 'react';
import { 
    Box, 
    Typography
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { keyframes } from '@mui/system';
import Waveform from './Waveform';

const CardiacView = ({ecgData}) => {
  return (
    <Paper elevation={1} sx={{ flex: '2', spacing:'4', display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Paper>
          <Box sx={{ position: 'relative', margin: '10px 10px 0 10px' }}>
            <Typography sx={{ position: 'absolute', left: 7, top: 2 }}>I</Typography>
            <Waveform data={ecgData.I} />
          </Box>
          <Box sx={{ position: 'relative', margin: '5px 10px 0 10px' }}>
            <Typography sx={{ position: 'absolute', left: 7, top: 2 }}>II</Typography>
            <Waveform data={ecgData.II} />
          </Box>
          <Box sx={{ position: 'relative', margin: '5px 10px 0 10px' }}>
            <Typography sx={{ position: 'absolute', left: 7, top: 2 }}>III</Typography>
            <Waveform data={ecgData.III} />
          </Box>
          <Box sx={{ position: 'relative', margin: '5px 10px 0 10px' }}>
            <Typography sx={{ position: 'absolute', left: 7, top: 2 }}>V1</Typography>
            <Waveform data={ecgData.V1} />
          </Box>
        </Paper>
        <Paper>
          <Box sx={{ position: 'relative', margin: '5px 10px 0 10px' }}>
            <Typography sx={{ position: 'absolute', left: 7, top: 2 }}>aVR</Typography>
            <Waveform data={ecgData.aVR} />
          </Box>
          <Box sx={{ position: 'relative', margin: '5px 10px 0 10px' }}>
            <Typography sx={{ position: 'absolute', left: 7, top: 2 }}>aVL</Typography>
            <Waveform data={ecgData.aVL} />
          </Box>
          <Box sx={{ position: 'relative', margin: '5px 10px 10px 10px' }}>
            <Typography sx={{ position: 'absolute', left: 7, top: 2 }}>aVF</Typography>
            <Waveform data={ecgData.aVF} />
          </Box>
        </Paper>
    </Paper>
  );
};

export default CardiacView;