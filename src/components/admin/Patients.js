import React, { useEffect, useState } from "react";
import axios from "axios";
// import {
//   TableContainer,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Patients() {
  const [patients, setPatients] = useState([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const header = {
    headers: {
      auth: localStorage.getItem("access_token"),
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hbms/list_patient", header)
      .then((response) => {
        const responseData = response.data;
        setPatients(responseData); // Update the state variable with the received data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <StyledTableCell sx={{ color: "white" }}>Name</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Email</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Phone</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Gender</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Age</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Chief Complaint</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Bloodgroup</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Time of Registration</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Address</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{patient.username}</StyledTableCell>
                <StyledTableCell>{patient.email}</StyledTableCell>
                <StyledTableCell>{patient.phone}</StyledTableCell>
                <StyledTableCell>{patient.gender}</StyledTableCell>
                <StyledTableCell>{patient.age}</StyledTableCell>
                <StyledTableCell>{patient.chiefcomplaint}</StyledTableCell>
                <StyledTableCell>{patient.bloodgroup}</StyledTableCell>
                <StyledTableCell>{patient.timeofregistration}</StyledTableCell>
                <StyledTableCell>{patient.address}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Patients;
