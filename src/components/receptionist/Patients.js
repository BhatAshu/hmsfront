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
import EditIcon from "@mui/icons-material/Edit";
import AddModal from "./AddPatient";
import EditPatient from "./EditPatients";

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
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [role, setRole] = useState("Doctor");
  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    department: "",
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
    setPage(0);
  };
  const [filteredDoctors, setFilteredDoctors] = useState([]);

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
    username,
    email,
    phone,
    gender,
    age,
    department,
    chiefcomplaint,
    timeofregistration,
    address,
    doctor
  ) {
    setEditModal(true);
    setData({
      ...data,
      id: id,
      username: username,
      email: email,
      phone: phone,
      gender: gender,
      age: age,
      department: department,
      chiefcomplaint: chiefcomplaint,
      timeofregistration: timeofregistration,
      address: address,
      doctor: doctor,
    });
  }

  const handleAdd = () => {
    setAddModal(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hbms/listpat_form", header)
      .then((response) => {
        const responseData = response.data;
        setPatients(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [patients]);


  const doctor = (department) => {
    console.log("Fetching doctors for department:", department);
    if (role === "Doctor" && department) {
      const departmentApiMap = {
        General: "http://localhost:5000/api/hbms/list_general",
        Pediatrics: "http://localhost:5000/api/hbms/list_pediatrics",
        Orthopedics: "http://localhost:5000/api/hbms/list_orthopedics",
        Dermatology: "http://localhost:5000/api/hbms/list_dermatology",
      };

      const departmentApi = departmentApiMap[department];

      axios
        .get(departmentApi, header)
        .then((response) => {
          console.log("API Response:", response.data);
          setDoctors(response.data); // Update the doctors state
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    doctor(data.department);
  }, [data.department]);

  useEffect(() => {
    doctor(data.department);
  }, [data.department]);

  return (
    <div sx={tableContainerStyle}>
      <TableContainer component={Paper}>
        <button onClick={handleAdd} className="bu1">
          Add Patients
        </button>
        <Table>
          <TableHead sx={{ backgroundColor: "white" }}>
            <TableRow>
              <StyledTableCell sx={{ color: "black" }}>Name</StyledTableCell>
              <StyledTableCell sx={{ color: "black" }}>Email</StyledTableCell>
              <StyledTableCell sx={{ color: "black" }}>Phone</StyledTableCell>
              <StyledTableCell sx={{ color: "black" }}>Gender</StyledTableCell>
              <StyledTableCell sx={{ color: "black" }}>Age</StyledTableCell>
              <StyledTableCell sx={{ color: "black" }}>Department</StyledTableCell>
              <StyledTableCell sx={{ color: "black" }}>Chief Complaint</StyledTableCell>
              <StyledTableCell sx={{ color: "black" }}>
                Time of Registration
              </StyledTableCell>
              <StyledTableCell sx={{ color: "black" }}>Address</StyledTableCell>
              <StyledTableCell sx={{ color: "black" }}>Doctor</StyledTableCell>
              <StyledTableCell sx={{ color: "black" }}>Action</StyledTableCell>
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
                <StyledTableCell>{patient.department}</StyledTableCell>
                <StyledTableCell>{patient.chiefcomplaint}</StyledTableCell>
                <StyledTableCell>{patient.timeofregistration}</StyledTableCell>
                <StyledTableCell>{patient.address}</StyledTableCell>
                <StyledTableCell>{patient.doctorName}</StyledTableCell>
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
                        patient.age,
                        patient.department,
                        patient.chiefcomplaint,
                        patient.timeofregistration,
                        patient.address,
                        patient.doctor
                      )
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton sx={deleteButtonStyle}>
                    <DeleteIcon sx={deleteIconStyle} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
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
