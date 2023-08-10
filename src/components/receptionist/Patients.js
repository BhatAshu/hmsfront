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
// import handleDelete from "./HandleDelete";
import EditIcon from "@mui/icons-material/Edit";
import AddModal from "./AddPatient";
import EditPatient from "./EditPatients";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [role, setRole] = useState("Doctor");
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
    doctor: "",
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
    setPage(0); // Reset the page when the number of rows per page changes
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
    transition: "background-color 0.3s ease", // Transition effect for smooth color change
    // Add hover color
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
    transition: "background-color 0.3s ease", // Transition effect for smooth color change
    // Add hover color
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
    age,
    chiefcomplaint,
    timeofregistration,
    address,
    doctor ,
  ) {
    setEditModal(true);
    setData({
      ...data,
      id: id,
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      age: age,
      chiefcomplaint: chiefcomplaint,
      timeofregistration: timeofregistration,
      address: address,
      doctor: doctor,
    });
  }

  const handleAdd = () => {
    setAddModal(true); // Show the "Add" modal
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hbms/list_patient", header)
      .then((response) => {
        const responseData = response.data;
        setPatients(responseData); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, [patients]);

  const doctor = () => {
    if (role === "Doctor") {
      axios
        .get("http://localhost:5000/api/hbms/list_doctor", header)
        .then((response) => {
          console.log("API Response:", response.data);
          setDoctors(response.data);
        })
        .catch((error) => console.error(error));
    }
  };
  useEffect(() => {
    doctor();
  }, []);

  return (
    <div sx={tableContainerStyle}>
      <TableContainer component={Paper}>
        <button onClick={handleAdd} className="bu1">
          Add Patients
        </button>
        <Table>
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
              <TableCell sx={{ color: "white" }}>Gender</TableCell>
              <TableCell sx={{ color: "white" }}>Age</TableCell>
              <TableCell sx={{ color: "white" }}>Chief Complaint</TableCell>
              <TableCell sx={{ color: "white" }}>
                Time of Registration
              </TableCell>
              <TableCell sx={{ color: "white" }}>Address</TableCell>
              <TableCell sx={{ color: "white" }}>Doctor</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{patient.firstname}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.chiefcomplaint}</TableCell>
                <TableCell>{patient.timeofregistration}</TableCell>
                <TableCell>{patient.address}</TableCell>
                <TableCell>{patient.doctorName}</TableCell>
                <TableCell>
                  <IconButton
                    sx={editButtonStyle}
                    onClick={() =>
                      handleEdit(
                        patient.id,
                        patient.firstname,
                        patient.email,
                        patient.phone,
                        patient.gender,
                        patient.age,
                        patient.chiefcomplaint,
                        patient.timeofregistration,
                        patient.address,
                        patient.doctor,
                      )
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton sx={deleteButtonStyle}>
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
      <AddModal
        modal={addModal}
        toggle={() => setAddModal(!addModal)}
        onClose={() => setAddModal(false)}
      />
      <EditPatient
        editModal={editModal}
        handleEdit={handleEdit}
        onClose={() => setEditModal(false)}
        data={data}
        setData={setData}
        doctors={doctors}
      />
    </div>
  );
}

export default Patients;
