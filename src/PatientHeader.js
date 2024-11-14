import React,  {useEffect, useState} from 'react';
import { 
  Typography,
  Grid
} from '@mui/material';
import Paper from '@mui/material/Paper';

const PatientHeader = ({patientState}) => {
    
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
      const interval = setInterval(() => {setTime(new Date().toLocaleTimeString())}, 1000);
    
      return () => clearInterval(interval);
    }, []);

    return (
        <Paper elevation={1} sx={{ mb: 2, p: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h5" component="h1">
                {patientState.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                ID: {patientState.id} | Age: {patientState.age}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" component="h1">
                {patientState.disease}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Condition: {patientState.condition}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" color="text.secondary">
                Bed: Kritik-04
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {time}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
    );
}

export default PatientHeader;