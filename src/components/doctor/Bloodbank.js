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
import EditIcon from "@mui/icons-material/Edit";
// import EditModal from "./EditModal";

function Bloodbank() {
  const [bloodbank, setBloodbank] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState({
    id: "",
    bloodgroup: "",
    noofbags: "",
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

  function handleEdit(id, bloodgroup, noofbags) {
    setEditModal(true);
    setData({
      ...data,
      id: id,
      bloodgroup: bloodgroup,
      noofbags: noofbags,
    });
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hbms/blood_bank", header)
      .then((response) => {
        const responseData = response.data;
        const bloodbankData = Object.entries(responseData).map(([bloodgroup, noofbags]) => ({
          bloodgroup,
          noofbags,
        }));
        setBloodbank(bloodbankData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const totalCount = bloodbank.length;

  return (
    <div sx={tableContainerStyle}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>#</TableCell>
              <TableCell sx={{ color: "white" }}>Bloodgroup</TableCell>
              <TableCell sx={{ color: "white" }}>No Of Bags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading...</TableCell>
              </TableRow>
            ) : bloodbank.length > 0 ? (
              bloodbank.map((bloodbankItem, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{bloodbankItem.bloodgroup}</TableCell>
                  <TableCell>{bloodbankItem.noofbags}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      /> */}
    </div>
  );
}

export default Bloodbank;
