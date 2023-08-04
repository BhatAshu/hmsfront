import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
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
import DeleteIcon from "@mui/icons-material/Delete";
import handleDelete from "./HandleDelete";
import EditModal from "./EditModal";
// import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
// import MedicalServicesIcon  from '@mui/icons-material/MedicalServices';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import jwtDecode from "jwt-decode";


function Patients() {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [doctorId, setDoctorId] = useState(null);
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

  const deleteIconStyle = {
    width: "100%",
    height: "100%",
  };


  function handleEdit(
    id,
    name,
    email,
    phone,
    gender,
    chiefcomplaint,
    age,
    bloodgroup,
    timeofregistration,
    address,
    message,
  ) {
    setEditModal(true);
    setData({
      ...data,
      id: id,
      name: name,
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

 

  const fetchDoctorId = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setDoctorId(decodedToken.user_id);
    }
  };
  useEffect(() => {
    fetchDoctorId();
  }, []);

  useEffect(() => {
    if (doctorId) {
      axios
        .get("http://localhost:5000/api/hbms/list_patient", header)
        .then((response) => {
          const responseData = response.data;
          const filteredPatients = responseData.filter(
            (patient) => patient.doctorId === doctorId
          );
          console.log(filteredPatients);
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
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
              <TableCell sx={{ color: "white" }}>Gender</TableCell>
              <TableCell sx={{ color: "white" }}>Chief Complaint</TableCell>
              <TableCell sx={{ color: "white" }}>Age</TableCell>
              <TableCell sx={{ color: "white" }}>Bloodgroup</TableCell>
              <TableCell sx={{ color: "white" }}>
                AppointedTime
              </TableCell>
              <TableCell sx={{ color: "white" }}>Address</TableCell>
              <TableCell sx={{ color: "white" }}>Prescribe</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.chiefcomplaint}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.bloodgroup}</TableCell>
                <TableCell>{patient.timeofregistration}</TableCell>
                <TableCell>{patient.address}</TableCell>
                <TableCell>{patient.message}</TableCell>
                <TableCell>
                  <IconButton
                    sx={editButtonStyle}
                    onClick={() =>
                      handleEdit(
                        patient.id,
                        patient.name,
                        patient.email,
                        patient.phone,
                        patient.gender,
                        patient.chiefcomplaint,
                        patient.age,
                        patient.bloodgroup,
                        patient.timeofregistration,
                        patient.address,
                        patient.message,
                      )
                    }
                  >
                    <EventNoteOutlinedIcon  />
                  </IconButton>

                  <IconButton
                    sx={deleteButtonStyle}
                    onClick={() => handleDelete(patient.id, "patient")}
                  >
                    <DeleteIcon sx={deleteIconStyle} />
                  </IconButton>
                </TableCell>
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
