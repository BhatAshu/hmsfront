import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function Patients() {
  const [patients, setPatients] = useState([]);

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
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
              <TableCell sx={{ color: "white" }}>Gender</TableCell>
              <TableCell sx={{ color: "white" }}>Age</TableCell>
              <TableCell sx={{ color: "white" }}>Chief Complaint</TableCell>
              <TableCell sx={{ color: "white" }}>Bloodgroup</TableCell>
              <TableCell sx={{ color: "white" }}>Time of Registration</TableCell>
              <TableCell sx={{ color: "white" }}>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.chiefcomplaint}</TableCell>
                <TableCell>{patient.bloodgroup}</TableCell>
                <TableCell>{patient.timeofregistration}</TableCell>
                <TableCell>{patient.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Patients;
