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
// import AddModal from "./AddBloodDonor"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
// import EditModal from "./EditBloodDonor";
// import DeleteModal from "./DeleteBloodDonor";

function BloodDonor() {
  const [blooddonor, setblooddonor] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalRows = blooddonor.length;
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const blooddonorPerPage = blooddonor.slice(startIndex, endIndex);
  const [modal, setModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
    const [data, setData] = useState({
      id: "",
      name: "",
      email: "",
      phone: "",
      gender: "",
      age: "",
      bloodgroup: "",
      noofbags: "",
      date: "",
      address: "",
    });

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

  const handleAdd = () => {
    setAddModal(true); // Show the "Add" modal
  };

    useEffect(() => {
      axios
        .get("http://localhost:5000/api/hbms/view_blood", header)
        .then((response) => {
          const responseData = response.data;
          setblooddonor(responseData); // Update the state variable with the received data
        })
        .catch((error) => {
          console.log(error);
        });
    }, [blooddonor]);

  
    function handleEdit(id, name, email, phone, gender,age,bloodgroup,noofbags,date,address) {
      // Set the state or perform any other actions needed
      // ...
      setEditModal(true);
      setData({
        ...data,
        id: id,
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        age: age,
        bloodgroup: bloodgroup,
        noofbags: noofbags,
        date: date,
        address: address,
      });
    }
  
  return (
    <div sx={tableContainerStyle}>
      {/* <button onClick={handleAdd} className="bu1">
          Add Blood Donor
        </button> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>#</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
              <TableCell sx={{ color: "white" }}>Gender</TableCell>
              <TableCell sx={{ color: "white" }}>Age</TableCell>
              <TableCell sx={{ color: "white" }}>Bloodgroup</TableCell>
              <TableCell sx={{ color: "white" }}>No of Bags</TableCell>
              <TableCell sx={{ color: "white" }}>Date</TableCell>
              <TableCell sx={{ color: "white" }}>Address</TableCell>
              {/* <TableCell sx={{ color: "white" }}>Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
          {blooddonorPerPage.map((blooddonor, index) => {
              const rowIndex = startIndex + index + 1;
              return (
                <TableRow key={index}>
                  <TableCell>{rowIndex}</TableCell>
                <TableCell>{blooddonor.name}</TableCell>
                <TableCell>{blooddonor.email}</TableCell>
                <TableCell>{blooddonor.phone}</TableCell>
                <TableCell>{blooddonor.gender}</TableCell>
                <TableCell>{blooddonor.age}</TableCell>
                <TableCell>{blooddonor.bloodgroup}</TableCell>
                <TableCell>{blooddonor.noofbags}</TableCell>
                <TableCell>{blooddonor.date}</TableCell>
                {/* <TableCell>{new Date(blooddonor.date).toLocaleDateString()}</TableCell> */}
                <TableCell>{blooddonor.address}</TableCell>
                {/* <TableCell>
                    <IconButton
                      sx={editButtonStyle}
                      onClick={() =>
                        handleEdit(
                          blooddonor.id,
                          blooddonor.name,
                          blooddonor.email,
                          blooddonor.phone,
                          blooddonor.gender,
                          blooddonor.age,
                          blooddonor.bloodgroup,
                          blooddonor.noofbags,
                          blooddonor.date,
                          blooddonor.address,
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton sx={deleteButtonStyle} onClick={() => DeleteModal(blooddonor.id)}>
                      <DeleteIcon sx={deleteIconStyle} />
                    </IconButton>
                  </TableCell> */}
              </TableRow>
              );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      {/* <AddModal
        modal={addModal}
        toggle={() => setAddModal(!addModal)}
        onClose={() => setAddModal(false)}
      /> */}
      {/* <EditModal
        editModal={editModal}
        handleEdit={handleEdit}
        onClose={() => setEditModal(false)}
        data={data} // Make sure the data prop includes the name field
        setData={setData}
      /> */}
    </div>
  );
}

export default BloodDonor;
