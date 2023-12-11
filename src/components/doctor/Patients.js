import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import handleDelete from "./HandleDelete";
import EditModal from "./EditModal";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import jwtDecode from "jwt-decode";
import PatientDetailsModal from "./PatientDetails";

function Patients() {
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
  
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [doctorId, setDoctorId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null); 
  const [patientDetailsModalOpen, setPatientDetailsModalOpen] = useState(false); 
  const [doctorName, setDoctorName] = useState("");
  const handlePatientClick = (patient) => {
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
    testtype: "",
    description: "",
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
    time,
    address,
    message,
    testtype,
    description,
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
      time: time,
      address: address,
      message: message,
      testtype: testtype,
      description: description,
    });
  }

  const handleAdd = () => {
    setAddModal(true); 
  };
  const fetchDoctorId = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setDoctorId(decodedToken.user_id);
    }
  };
  
  useEffect(() => {
    fetchDoctorId();
  }, []);
  
  useEffect(() => {
    if (doctorId) {
      axios
        .get("http://localhost:5000/api/hbms/list_patient", {
          headers: {
            auth: localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          const responseData = response.data;
          // console.log("All Patients:", responseData);
  
          // Filter patients based on doctorId
          const filteredPatients = responseData.filter(
            (patient) => patient.doctorId === doctorId 
          );
  
          // console.log("Filtered Patients:", filteredPatients);
          setPatients(filteredPatients);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [doctorId]);
  

  return (
    <div sx={tableContainerStyle}>
      <TableContainer component={Paper}>
        {/* <button onClick={handleAdd} className="bu1">
          Add Patients
        </button> */}
        <Table>
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <StyledTableCell sx={{ color: "white" }}>Name</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Email</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Phone</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Gender</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Chief Complaint</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Age</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>AppointedTime</StyledTableCell>
              <StyledTableCell sx={{ color: "white" }}>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePatientClick(patient)} 
                  >
                    {patient.username}
                  </span>
                </StyledTableCell>
                <StyledTableCell>{patient.email}</StyledTableCell>
                <StyledTableCell>{patient.phone}</StyledTableCell>
                <StyledTableCell>{patient.gender}</StyledTableCell>
                <StyledTableCell>{patient.chiefcomplaint}</StyledTableCell>
                <StyledTableCell>{patient.age}</StyledTableCell>
                <StyledTableCell>{patient.time}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    sx={editButtonStyle}
                    onClick={() =>
                      handleEdit(
                        patient.id,
                        patient.username,
                        patient.email,
                        patient.phone,
                        patient.gender,
                        patient.chiefcomplaint,
                        patient.age,
                        patient.bloodgroup,
                        patient.time,
                        patient.address,
                        patient.testtype,
                        patient.message,
                        patient.description,
                      )
                    }
                  >
                    <EventNoteOutlinedIcon />
                  </IconButton>
                  {/* <IconButton
                    sx={deleteButtonStyle}
                    onClick={() => handleDelete(patient.id, "patient")}
                  >
                    <DeleteIcon sx={deleteIconStyle} />
                  </IconButton> */}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PatientDetailsModal
        open={patientDetailsModalOpen}
        onClose={() => setPatientDetailsModalOpen(false)}
        patient={selectedPatient}
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={patients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <EditModal
        editModal={editModal}
        handleEdit={handleEdit}
        onClose={() => setEditModal(false)}
        data={data}
        setData={setData}
      />
    </div>
  );
}

export default Patients;
