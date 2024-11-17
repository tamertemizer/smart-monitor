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
  time,
  note
) {
  return { time, note};
}

const rows = [
  createData('16.11.2024', `Transamine 500mg IV`)
];
const Medication = () => {
    return (
        <Paper elevation={1} sx={{height:"600px", width:{xs:"100vh", sm:"100%"}}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Time</TableCell>
                  <TableCell align="right">Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.time}
                    </TableCell>
                    <TableCell align="right">{row.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
    );
}

export default Medication;