import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ModalImage from "react-modal-image";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import handleDelete from "./HandleDelete";
import EditModal from "./EditModal";
import "bootstrap/dist/css/bootstrap.min.css";
import AddModal from "./AddModal";
import "./style.css";
import ProfileModal from "./ProfileModal";
import Lab from "../labtechnician/Lab";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const HandleRoleClick = ({ role }) => {
  const navigate = useNavigate();
  
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
  const [selectedRole, setSelectedRole] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [receptionists, setReceptionists] = useState([]);
  const [technicians, setLabtechnician] = useState([]);
  const [data, setData] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const header = {
    headers: {
      auth: localStorage.getItem("access_token"),
    },
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

  // const editIconStyle = {
  //   width: "100%",
  //   height: "100%",
  // };

  const deleteIconStyle = {
    width: "100%",
    height: "100%",
  };

    
const handlePageChange = (event, newPage) => {
  setPage(newPage);
};

const handleFormSubmit = (event) => {
  event.preventDefault();
}

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

  const handleAdd = () => {
    setAddModal(true); // Show the "Add" modal
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  }, []);

  const fetchData = () => {
    if (role === "Doctor") {
      axios
        .get("http://localhost:5000/api/hbms/viewuser", header)
        .then((response) => {
          setDoctors(response.data);
        })
        .catch((error) => console.error(error));
    } else if (role === "Nurse") {
      axios
        .get("http://localhost:5000/api/hbms/viewuser", header)

        .then((response) => setNurses(response.data))
        .catch((error) => console.error(error));
    } 
    else if (role === "Receptionist") {
      axios
        .get("http://localhost:5000/api/hbms/viewuser", header)
        .then((response) => setReceptionists(response.data))
        .catch((error) => console.error(error));
    } 
    else if (role === "LabTechnician") {
      axios
        .get("http://localhost:5000/api/hbms/viewuser", header)
        .then((response) => setLabtechnician(response.data))
        .catch((error) => console.error(error));
    } 
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
    console.log("Logout clicked");
  };

  const handleRoleClick = (role) => {
    if (role === "Logout") {
      handleLogout();
    } else {
      setSelectedRole(role); 
      fetchData(); 
    }
  };
  useEffect(() => {
    if (role) {
      handleRoleClick(role);
    }
  }, [role]);
  
  useEffect(() => {
    fetchData();
  }, [doctors, nurses, receptionists,technicians]);

  const toggle = () => setModal(!modal);

  function handleEdit(id, username, email, phone, address, image) {
    setEditModal(true);
    setData({
      ...data,
      id: id,
      username: username,
      email: email,
      phone: phone,
      address: address,
      image: image,
    });
  }

  if (selectedRole === "Doctor") {
    const doctorsFiltered = doctors.filter(
      (doctor) => doctor.role === "Doctor"
    );
    return (
      <div sx={tableContainerStyle}>
        <TableContainer component={Paper}>
          <div>
            <button onClick={() => handleAdd()} className="bu1">
              Add Doctor
            </button>
          </div>
          <Table>
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <StyledTableCell sx={{ color: "white" }}>Name</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Email</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Phone</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Department</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Address</StyledTableCell>
                <StyledTableCell sx={{ color: "white", width: 150 }}>Image</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctorsFiltered.map((doctor) => (
                <StyledTableRow  key={doctor.id}>
                  <StyledTableCell>{doctor.username}</StyledTableCell>
                  <StyledTableCell>{doctor.email}</StyledTableCell>
                  <StyledTableCell>{doctor.phone}</StyledTableCell>
                  <StyledTableCell>{doctor.specialist}</StyledTableCell>
                  <StyledTableCell>{doctor.address}</StyledTableCell>
                  <StyledTableCell>
                    {doctor.image ? (
                      <div>
                        <ModalImage
                          small={`http://localhost:5000${doctor.image}`}
                          large={`http://localhost:5000${doctor.image}`}
                          alt="Profile"
                        />
                      </div>
                    ) : (
                      "No image available"
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      sx={editButtonStyle}
                      onClick={() =>
                        handleEdit(
                          doctor.id,
                          doctor.username,
                          doctor.email,
                          doctor.phone,
                          doctor.address,
                          doctor.image
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={deleteButtonStyle}
                      onClick={() => handleDelete(doctor.id, "doctor")}
                    >
                      <DeleteIcon sx={deleteIconStyle} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow >
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={doctorsFiltered.length}
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
        <EditModal
          editModal={editModal}
          handleEdit={handleEdit}
          onClose={() => setEditModal(false)}
          data={data}
          setData={setData}
        />
      </div>
    );
  } else if (selectedRole === "Nurse") {
    const nursesFiltered = nurses.filter((nurse) => nurse.role === "Nurse");
    return (
      <div sx={tableContainerStyle}>
        <TableContainer component={Paper}>
        <div>
            <button onClick={() => handleAdd()} className="bu1">
              Add Nurse
            </button>
          </div>
          <Table>
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <StyledTableCell sx={{ color: "white" }}>Username</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Email</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Phone</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Address</StyledTableCell>
                <StyledTableCell sx={{ color: "white", width: 150 }}>Image</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nursesFiltered.map((nurse) => (
                <StyledTableRow key={nurse.id}>
                  <StyledTableCell>{nurse.username}</StyledTableCell>
                  <StyledTableCell>{nurse.email}</StyledTableCell>
                  <StyledTableCell>{nurse.phone}</StyledTableCell>
                  <StyledTableCell>{nurse.address}</StyledTableCell>
                  <StyledTableCell>
                    {nurse.image ? (
                      <div>
                        <ModalImage
                          small={`http://localhost:5000${nurse.image}`}
                          large={`http://localhost:5000${nurse.image}`}
                          alt="Profile"
                        />
                      </div>
                    ) : (
                      "No image available"
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      sx={editButtonStyle}
                      onClick={() =>
                        handleEdit(
                          nurse.id,
                          nurse.username,
                          nurse.email,
                          nurse.phone,
                          nurse.address,
                          nurse.image
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={deleteButtonStyle}
                      onClick={() => handleDelete(nurse.id, "nurse")}
                    >
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
          count={nursesFiltered.length}
          rowsPerPage={5}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
        <AddModal
          modal={addModal}
          toggle={() => setAddModal(!addModal)}
          onClose={() => setAddModal(false)}
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
  } else if (selectedRole === "Receptionist") {
    const receptionistsFiltered = receptionists.filter(
      (receptionist) => receptionist.role === "Receptionist"
    );
    return (
      <div sx={tableContainerStyle}>
        <TableContainer component={Paper}>
        <div>
            <button onClick={() => handleAdd()} className="bu1">
              Add Receptionist
            </button>
          </div>
          <Table>
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <StyledTableCell sx={{ color: "white" }}>Username</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Email</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Phone</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Address</StyledTableCell>
                <StyledTableCell sx={{ color: "white", width: 150 }}>Image</StyledTableCell>
                <StyledTableCell sx={{ color: "white" }}>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receptionistsFiltered.map((receptionist) => (
                <StyledTableRow key={receptionist.id}>
                  <StyledTableCell>{receptionist.username}</StyledTableCell>
                  <StyledTableCell>{receptionist.email}</StyledTableCell>
                  <StyledTableCell>{receptionist.phone}</StyledTableCell>
                  <StyledTableCell>{receptionist.address}</StyledTableCell>
                  <StyledTableCell>
                    {receptionist.image ? (
                      <div>
                        <ModalImage
                          small={`http://localhost:5000${receptionist.image}`}
                          large={`http://localhost:5000${receptionist.image}`}
                          alt="Profile"
                        />
                      </div>
                    ) : (
                      "No image available"
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      sx={editButtonStyle}
                      onClick={() =>
                        handleEdit(
                          receptionist.id,
                          receptionist.username,
                          receptionist.email,
                          receptionist.phone,
                          receptionist.address,
                          receptionist.image
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={deleteButtonStyle}
                      onClick={() =>
                        handleDelete(receptionist.id, "receptionist")
                      }
                    >
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
          count={receptionistsFiltered.length}
          rowsPerPage={5}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
        <AddModal
          modal={addModal}
          toggle={() => setAddModal(!addModal)}
          onClose={() => setAddModal(false)}
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
    } else if (selectedRole === "LabTechnician") {
      const labTechniciansFiltered = technicians.filter((technician) => technician.role === "LabTechnician");
      return (
        <div sx={tableContainerStyle}>
          <TableContainer component={Paper}>
          <div>
              <button onClick={() => handleAdd()} className="bu1">
                Add LabTechnician
              </button>
            </div>
            <Table>
              <TableHead sx={{ backgroundColor: "black" }}>
                <TableRow>
                  <StyledTableCell sx={{ color: "white" }}>Username</StyledTableCell>
                  <StyledTableCell sx={{ color: "white" }}>Email</StyledTableCell>
                  <StyledTableCell sx={{ color: "white" }}>Phone</StyledTableCell>
                  <StyledTableCell sx={{ color: "white" }}>Address</StyledTableCell>
                  <StyledTableCell sx={{ color: "white", width: 150 }}>Image</StyledTableCell>
                  <StyledTableCell sx={{ color: "white" }}>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {labTechniciansFiltered.map((technician) => (
                  <StyledTableRow key={technician.id}>
                    <StyledTableCell>{technician.username}</StyledTableCell>
                    <StyledTableCell>{technician.email}</StyledTableCell>
                    <StyledTableCell>{technician.phone}</StyledTableCell>
                    <StyledTableCell>{technician.address}</StyledTableCell>
                    <StyledTableCell>
                      {technician.image ? (
                        <div>
                          <ModalImage
                            small={`http://localhost:5000${technician.image}`}
                            large={`http://localhost:5000${technician.image}`}
                            alt="Profile"
                          />
                        </div>
                      ) : (
                        "No image available"
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton
                        sx={editButtonStyle}
                        onClick={() =>
                          handleEdit(
                            technician.id,
                            technician.username,
                            technician.email,
                            technician.phone,
                            technician.address,
                            technician.image
                          )
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={deleteButtonStyle}
                        onClick={() => handleDelete(technician.id, "technician")}
                      >
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
            count={labTechniciansFiltered.length}
            rowsPerPage={5}
            page={0}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          />
          <AddModal
            modal={addModal}
            toggle={() => setAddModal(!addModal)}
            onClose={() => setAddModal(false)}
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
  }else if (selectedRole === "Profile") {
   return <ProfileModal/>
  }
  return null;
};

export default HandleRoleClick;
