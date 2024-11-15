import React, { useEffect, useState } from 'react';
import { 
  Typography,
  Modal,
  Box,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { AlertCircle } from 'lucide-react';

const PatientInfoHeader = ({patientState}) => {
    const [modalState, setModalState] = useState("closed");
        
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
          <Paper sx={{margin:"10px 0 10px 0", boxShadow: '0 0 5px rgba(255, 152, 0, 0.5)'}}>
            <Box  sx={{padding:"10px 0 10px 0"}}>
              <Typography onClick={() => setModalState("open")}>Evaluate the need for massive transfusion!</Typography>
            </Box>
          </Paper>

          <Modal
            open={modalState === "open"}
            onClose={() => setModalState("closed")}
          >
            <Box sx={modalStyle}>
               <Typography variant="h6" component="h2" gutterBottom color="#FF9966">
               <AlertCircle size={16} />  Massive Transfusion Need
              </Typography>
              <Typography variant="body1" gutterBottom>
                Predicted 43% chance of massive transfusion need according to ATLS 10 guidelines.
              </Typography>
              <Typography variant="body2">
                  *Evaluated according to TASH score.
              </Typography>
            </Box>
          </Modal>
        </>
    );
}

export default PatientInfoHeader;