import React, { useEffect, useState } from 'react';
import { 
  Typography,
  Grid,
  Modal,
  Box,
  List,
  ListItem,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { AlertCircle } from 'lucide-react';

function createData(
  name,
  value,
  normalvalue,
  evaluation
) {
  return { name, value, normalvalue, evaluation };
}

const rows = [
  createData('WBC', 18.2, "4.5-11.0", "Acute stress response, inflammation"),
  createData('Hemoglobin', 10.0, "12-16" , "Acute blood loss"),
  createData('Hematocrit', 30.2, "36-46",  "Confirms blood loss"),
  createData('Platelets', 95, "150-450",  "Consumption from trauma/shock"),
  createData('MCV', 88, "80-96",  "Normal baseline"),
];
const LabSepsis = () => {
    return (
        <Paper elevation={1} sx={{height:"600px", width:{xs:"100vh", sm:"100%"}}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Test</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">Normal Value</TableCell>
                  <TableCell align="right">Evaluation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                    <TableCell align="right">{row.normalvalue}</TableCell>
                    <TableCell align="right">{row.evaluation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
    );
}

export default LabSepsis;