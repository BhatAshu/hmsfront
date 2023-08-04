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
import ModalImage from "react-modal-image";
import EditIntern from "./EditIntern";
import AddIntern from "./AddIntern";
import DeleteIntern from "./deleteIntern";

function Interns() {
    const [internsData, setInternsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    dateofbirth: "",
    address: "",
    educationalinstitution: "",
    startdate: "",
    enddate: "",
    status: "",
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
    dateofbirth ,
    address ,
    educationalinstitution ,
    startdate ,
    enddate ,
    status ,
  ) {
    setEditModal(true);
    setData({
      ...data,
      id: id,
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      dateofbirth: dateofbirth,
    address: address,
    educationalinstitution: educationalinstitution,
    startdate: startdate,
    enddate: enddate,
    status: status,
    });
  }

  const handleAdd = () => {
    setAddModal(true); // Show the "Add" modal
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hbms/list_intern", header)
      .then((response) => {
        const responseData = response.data;
        setInternsData(responseData); // Use setInternsData to update the state variable
      })
      .catch((error) => {
        console.log(error);
      });
  }, [internsData]);

  return (
    <div sx={tableContainerStyle}>
      <TableContainer component={Paper}>
      <button onClick={handleAdd} className="bu1">
          Add Interns
        </button>
        <Table>
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
              <TableCell sx={{ color: "white" }}>Gender</TableCell>
              <TableCell sx={{ color: "white" }}>DOB</TableCell>
              <TableCell sx={{ color: "white" }}>Address</TableCell>
              <TableCell sx={{ color: "white" }}>EducationalInstitution</TableCell>
              <TableCell sx={{ color: "white" }}>StartDate</TableCell>
              <TableCell sx={{ color: "white" }}>EndDate</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {internsData.map((intern, index) => (
              <TableRow key={index}>
                <TableCell>{intern.name}</TableCell>
                <TableCell>{intern.email}</TableCell>
                <TableCell>{intern.phone}</TableCell>
                <TableCell>{intern.gender}</TableCell>
                <TableCell>{intern.dateofbirth}</TableCell>
                <TableCell>{intern.address}</TableCell>
                <TableCell>{intern.educationalinstitution}</TableCell>
                <TableCell>{intern.startdate}</TableCell>
                <TableCell>{intern.enddate}</TableCell>
                <TableCell>{intern.status}</TableCell>
                <TableCell>
                  <IconButton
                    sx={editButtonStyle}
                    onClick={() =>
                      handleEdit(
                        intern.id,
                        intern.name,
                        intern.email,
                        intern.phone,
                        intern.gender,
                        intern.dateofbirth,
                        intern.address,
                        intern.educationalinstitution,
                        intern.startdate,
                        intern.enddate,
                        intern.status,
                      )
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    sx={deleteButtonStyle} onClick={() => DeleteIntern(intern.id)}
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
        count={internsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <AddIntern
        modal={addModal}
        toggle={() => setAddModal(!addModal)}
        onClose={() => setAddModal(false)}
      />
      <EditIntern
        editModal={editModal}
        handleEdit={handleEdit}
        onClose={() => setEditModal(false)}
        data={data}
        setData={setData}
      />
    </div>
  );
}

export default Interns;
