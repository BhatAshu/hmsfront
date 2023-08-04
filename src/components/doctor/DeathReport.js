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
// import AddDeath from "./AddDeath";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { IconButton } from "@mui/material";
// import EditModal from "./EditDeath";
// import DeleteModal from "./DeleteDeath";

function DeathReport() {
  const [death, setdeath] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalRows = death.length;
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const deathpage = death.slice(startIndex, endIndex);
  const [modal, setModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState({
    name: "",
    cause: "",
    date: "",
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

  // const editIconStyle = {
  //   width: "100%",
  //   height: "100%",
  // };

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

  const handleAdd = () => {
    setAddModal(true); // Show the "Add" modal
  };

  const tableContainerStyle = {
    width: "100%",
    maxWidth: "400px",
    border: "1px solid black",
    overflow: "auto",
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hbms/list_death", header)
      .then((response) => {
        const responseData = response.data;
        setdeath(responseData); // Update the state variable with the received data
      })
      .catch((error) => {
        console.log(error);
      });
  }, [death]);


  function handleEdit(id, name, cause, date) {
    // Set the state or perform any other actions needed
    // ...
    setEditModal(true);
    setData({
      ...data,
      id: id,
      name: name,
      cause: cause,
      date: date,
    });
  }

  return (
    <div sx={tableContainerStyle}>
      {/* <button onClick={handleAdd} className="bu1">
        Add Death Report
      </button> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>#</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Cause</TableCell>
              <TableCell sx={{ color: "white" }}>Date</TableCell>
              {/* <TableCell sx={{ color: "white" }}>Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
          {deathpage.map((death, index) => {
              const rowIndex = startIndex + index + 1;
              return (
                <TableRow key={index}>
                  <TableCell>{rowIndex}</TableCell>
                <TableCell>{death.name}</TableCell>
                <TableCell>{death.cause}</TableCell>
                <TableCell>{death.date}</TableCell>
                {/* <TableCell>
                    <IconButton
                      sx={editButtonStyle}
                      onClick={() =>
                        handleEdit(
                          death.id,
                          death.name,
                          death.cause,
                          death.date
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton sx={deleteButtonStyle} onClick={() => DeleteModal(death.id)}>
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
      {/* <AddDeath
        modal={addModal}
        toggle={() => setAddModal(!addModal)}
        onClose={() => setAddModal(false)}
      />
      <EditModal
        editModal={editModal}
        handleEdit={handleEdit}
        onClose={() => setEditModal(false)}
        data={data} // Make sure the data prop includes the name field
        setData={setData}
      /> */}
    </div>
  );
}

export default DeathReport;
