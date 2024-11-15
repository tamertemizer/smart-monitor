import React, { useEffect, useState } from 'react';
import { 
  Typography,
  Grid,
  Modal,
  Box,
  List,
  ListItem
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { AlertCircle } from 'lucide-react';

const PatientHeader = ({patientState}) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [modalState, setModalState] = useState("closed");
    
    useEffect(() => {
      const interval = setInterval(() => {setTime(new Date().toLocaleTimeString())}, 1000);
      return () => clearInterval(interval);
    }, []);

    const textColor = patientState.condition === "Stable" ? "text.secondary" : "red";
    
    const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: {xs:"90%", sm: 400},
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: 2
    };

    return (
        <>
          <Paper elevation={1} sx={{ mb: 2, p: 2 }}>
            <Box justifyContent="space-between" sx={{display:"flex", flexDirection:{xs:"column",sm:"row"}, gap:"20px"}} alignItems="center">
              <Box>
                <Typography variant="h5" component="h1">
                  {patientState.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  ID: {patientState.id} | Age: {patientState.age}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" component="h1">
                  {patientState.disease}
                </Typography>
                <Typography 
                  onClick={() => setModalState("open")} 
                  variant="h5" 
                  color={textColor}
                  sx={{ cursor: 'pointer' }}
                >
                  Condition: {patientState.condition}
                </Typography>
                {patientState.secondline && 
                  <Typography onClick={() => setModalState("open")} variant="subtitle2" color="text.secondary">
                    {patientState.secondline}
                  </Typography>
                }
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {patientState.bed}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {time}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Modal
            open={modalState === "open"}
            onClose={() => setModalState("closed")}
          >
            <Box sx={modalStyle}>
               <Typography variant="h6" component="h2" gutterBottom color="#FF9966">
               <AlertCircle size={16} />  {patientState.secondline}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Evaluated as Septic Shock according to SIRS and SOFA score.
              </Typography>
              <Typography variant="body2">
                Please evaluate in terms of fluid and vasopressor requirements
              </Typography>
            </Box>
          </Modal>
        </>
    );
}

export default PatientHeader;