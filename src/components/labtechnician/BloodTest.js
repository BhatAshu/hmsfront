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
import TablePagination from "@mui/material/TablePagination";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import PatientDetailsModal from "./BloodtestDetails";

function Patients() {
  const initialPatientStatus = {};
  const [patientStatus, setPatientStatus] = useState(initialPatientStatus);
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null); 
  const [patientDetailsModalOpen, setPatientDetailsModalOpen] = useState(false); 
  // Function to handle the name click


  const handleNameClick = (patient) => {
    setSelectedPatient(patient);
    setPatientDetailsModalOpen(true);
  };

  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    chiefcomplaint: "",
    bloodgroup: "",
    timeofregistration: "",
    address: "",
    message: "",
  });

  const header = {
    headers: {
      auth: localStorage.getItem("access_token"),
    },
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableContainerStyle = {
    width: "100%",
    maxWidth: "400px",
    border: "1px solid black",
    overflow: "auto",
  };

  const editButtonStyle = {
    borderRadius: "9px",
    width: "40px",
    height: "40px",
    padding: "8px",
    backgroundColor: "#6CB1C9",
    marginRight: "8px",
    color: "black",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "blue",
      color: "white",
    },
  };

  const deleteButtonStyle = {
    borderRadius: "9px",
    width: "40px",
    height: "40px",
    padding: "8px",
    backgroundColor: "#FF6347",
    color: "black",
    borderColor: "black",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#DC143C",
      color: "white",
    },
  };

  const handleStatusChange = (event, patientId) => {
    const newStatus = event.target.value;

    setPatientStatus((prevStatus) => ({
      ...prevStatus,
      [patientId]: newStatus,
    }));

    localStorage.setItem(patientId, newStatus);
  };

  const deleteIconStyle = {
    width: "100%",
    height: "100%",
  };

  function handleEdit(
    id,
    username,
    email,
    phone,
    gender,
    chiefcomplaint,
    age,
    bloodgroup,
    timeofregistration,
    address,
    message
  ) {
    setEditModal(true);
    setData({
      ...data,
      id: id,
      username: username,
      email: email,
      phone: phone,
      gender: gender,
      chiefcomplaint: chiefcomplaint,
      age: age,
      bloodgroup: bloodgroup,
      timeofregistration: timeofregistration,
      address: address,
      message: message,
    });
  }

  const handleAdd = () => {
    setAddModal(true); // Show the "Add" modal
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hbms/list_bloodtestlab", header)
      .then((response) => {
        const responseData = response.data;
        const statusObject = {};
        responseData.forEach((patient) => {
          statusObject[patient.id] =
            localStorage.getItem(patient.id) || "inactive";
        });
        setPatientStatus(statusObject);
        setPatients(responseData);
      })
      .catch((error) => {
        console.log("Error fetching patients:", error);
      });
  }, [patients]);

  return (
    <div sx={tableContainerStyle}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Age</TableCell>
              <TableCell sx={{ color: "white" }}>Chief Complaint</TableCell>
              <TableCell sx={{ color: "white" }}>Bloodgroup</TableCell>
              {/* <TableCell sx={{ color: "white" }}>Message</TableCell> */}
              <TableCell sx={{ color: "white" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow key={index}>
               <TableCell>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleNameClick(patient)} 
                  >
                    {patient.username}
                  </span>
                </TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.chiefcomplaint}</TableCell>
                <TableCell>{patient.bloodgroup}</TableCell>
                {/* <TableCell>{patient.message}</TableCell> */}
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel id={`status-label-${patient.id}`}>
                      Status
                    </InputLabel>
                    <Select
                      labelId={`status-label-${patient.id}`}
                      id={`status-select-${patient.id}`}
                      value={patientStatus[patient.id]}
                      label="Status"
                      onChange={(event) =>
                        handleStatusChange(event, patient.id)
                      }
                    >
                      <MenuItem value="inactive">Inactive</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                {/* <TableCell>
                  <IconButton
                    sx={editButtonStyle}
                  >
                    <EventNoteOutlinedIcon  />
                  </IconButton>
                  <IconButton sx={deleteButtonStyle}  >
                    <DeleteIcon sx={deleteIconStyle} />
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={patients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <PatientDetailsModal
        open={patientDetailsModalOpen}
        onClose={() => setPatientDetailsModalOpen(false)}
        patient={selectedPatient}
      />
      {/* <EditModal
        editModal={editModal}
        handleEdit={handleEdit}
        onClose={() => setEditModal(false)}
        data={data}
        setData={setData}
      /> */}
    </div>
  );
}

export default Patients;
