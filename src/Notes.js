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
  createData('16.11.2024', `CHIEF COMPLAINT:
  18-year-old male presenting as a Level 1 trauma activation following a high-speed motorcycle collision.
  HISTORY OF PRESENT ILLNESS:
  Patient is an 18-year-old male who was brought in by EMS following a high-speed motorcycle vs. guard rail collision. Per EMS report, patient was found approximately 20 feet from his motorcycle with significant blood loss at the scene. Initial GCS at scene was 13, improving to 14 during transport. Patient was helmeted at time of accident.
  TRAUMA PRIMARY SURVEY:
  A - Airway: Patent, speaking clearly
  B - Breathing: Tachypneic at 32/min, clear bilateral breath sounds
  C - Circulation: Tachycardic at 130bpm, hypotensive 90/55 mmHg, delayed cap refill >3s
  D - Disability: GCS 14 (E4 V4 M6), pupils equal and reactive
  E - Exposure: Large laceration to right thigh with active bleeding, multiple abrasions, right flank ecchymosis`)
];
const Notes = () => {
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
                    <TableCell align="left">{row.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
    );
}

export default Notes;