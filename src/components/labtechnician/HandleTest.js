import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { IconButton } from "@mui/material";
import ModalImage from "react-modal-image";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import ProfileModal from "./ProfileModal";
import Lab from "../labtechnician/Lab";

const HandleTest = ({ testtype }) => {
  const navigate = useNavigate();
  

  const [selectedTest, setSelectedTest] = useState("");
  const [bloodtest, setbloodtest] = useState([]);
  const [bptest, setbptest] = useState([]);
  const [sugartest, setsugartest] = useState([]);
  const [urinetest,seturinetest] = useState([]);
  const [data, setData] = useState({
    id: "",
    username: "",
    email: "",
    age: "",
    chiefcomplaint: "",
    bloodgroup: "",
    status:"",
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
      navigate("/labtech");
    } else {
      navigate("/login");
    }
  }, []);

  const fetchData = () => {
    if (testtype === "BloodTest") {
      axios
        .get("http://localhost:5000/api/hbms/list_lab", header)
        .then((response) => {
            setbloodtest(response.data);
        })
        .catch((error) => console.error(error));
    } else if (testtype === "BloodPressureTest") {
      axios
        .get("http://localhost:5000/api/hbms/list_lab", header)

        .then((response) => setbptest(response.data))
        .catch((error) => console.error(error));
    } 
    else if (testtype === "SugarLevelTest") {
      axios
        .get("http://localhost:5000/api/hbms/list_lab", header)
        .then((response) => setsugartest(response.data))
        .catch((error) => console.error(error));
    } 
    else if (testtype === "UrineTest") {
      axios
        .get("http://localhost:5000/api/hbms/list_lab", header)
        .then((response) => seturinetest(response.data))
        .catch((error) => console.error(error));
    } 
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
    console.log("Logout clicked");
  };

//   const handleRoleClick = (role) => {
//     if (role === "Logout") {
//       handleLogout();
//     } else {
//       setSelectedRole(role); 
//       fetchData(); 
//     }
//   };
//   useEffect(() => {
//     if (role) {
//       handleRoleClick(role);
//     }
//   }, [role]);
  
//   useEffect(() => {
//     fetchData();
//   }, [bloodtest, bptest, sugartest,urinetest]);
useEffect(() => {
    fetchData();
    setSelectedTest(testtype); // Update the selectedTest state with the testtype prop
  }, [testtype]); 

  const toggle = () => setModal(!modal);

  function handleEdit(id, username, email, age, chiefcomplaint, bloodgroup) {
    setEditModal(true);
    setData({
      ...data,
      id: id,
      username: username,
      email: email,
      age:age,
      chiefcomplaint: chiefcomplaint,
      bloodgroup: bloodgroup,
    });
  }

  if (selectedTest === "BloodTest") {
    const bloodFiltered = bloodtest.filter(
      (bloodtest1) => bloodtest1.testtype === "BloodTest"
    );
    return (
      <div sx={tableContainerStyle}>
        <TableContainer component={Paper}>
          <div>
          </div>
          <Table>
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>Email</TableCell>
                <TableCell sx={{ color: "white" }}>Age</TableCell>
                <TableCell sx={{ color: "white" }}>ChiefComplaint</TableCell>
                <TableCell sx={{ color: "white" }}>BloodGroup</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bloodFiltered.map((bloodtest1) => (
                <TableRow key={bloodtest1.id}>
                  <TableCell>{bloodtest1.username}</TableCell>
                  <TableCell>{bloodtest1.email}</TableCell>
                  <TableCell>{bloodtest1.phone}</TableCell>
                  <TableCell>{bloodtest1.specialist}</TableCell>
                  <TableCell>{bloodtest1.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={bloodFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    );
  } else if (selectedTest === "BloodPressureTest") {
    const bpFiltered = bptest.filter((bptest1) => bptest1.testtype === "BloodPressureTest");
    return (
      <div sx={tableContainerStyle}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>Email</TableCell>
                <TableCell sx={{ color: "white" }}>Age</TableCell>
                <TableCell sx={{ color: "white" }}>ChiefComplaint</TableCell>
                <TableCell sx={{ color: "white" }}>BloodGroup</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bpFiltered.map((bptest1) => (
                <TableRow key={bptest1.id}>
                  <TableCell>{bptest1.username}</TableCell>
                  <TableCell>{bptest1.email}</TableCell>
                  <TableCell>{bptest1.phone}</TableCell>
                  <TableCell>{bptest1.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={bpFiltered.length}
          rowsPerPage={5}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </div>
    );
  } else if (selectedTest === "SugarLevelTest") {
    const sugarFiltered = sugartest.filter(
      (sugartest1) => sugartest1.testtype === "SugarLevelTest"
    );
    return (
      <div sx={tableContainerStyle}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>Email</TableCell>
                <TableCell sx={{ color: "white" }}>Age</TableCell>
                <TableCell sx={{ color: "white" }}>ChiefComplaint</TableCell>
                <TableCell sx={{ color: "white" }}>BloodGroup</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sugarFiltered.map((sugartest1) => (
                <TableRow key={sugartest1.id}>
                  <TableCell>{sugartest1.username}</TableCell>
                  <TableCell>{sugartest1.email}</TableCell>
                  <TableCell>{sugartest1.phone}</TableCell>
                  <TableCell>{sugartest1.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={sugarFiltered.length}
          rowsPerPage={5}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </div>
    );
    } else if (selectedTest === "UrineTest") {
      const urineFiltered = urinetest.filter((urinetest1) => urinetest1.testtype === "UrineTest");
      return (
        <div sx={tableContainerStyle}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "black" }}>
                <TableRow>
                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>Email</TableCell>
                <TableCell sx={{ color: "white" }}>Age</TableCell>
                <TableCell sx={{ color: "white" }}>ChiefComplaint</TableCell>
                <TableCell sx={{ color: "white" }}>BloodGroup</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {urineFiltered.map((urinetest1) => (
                  <TableRow key={urinetest1.id}>
                    <TableCell>{urinetest1.username}</TableCell>
                    <TableCell>{urinetest1.email}</TableCell>
                    <TableCell>{urinetest1.phone}</TableCell>
                    <TableCell>{urinetest1.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={urineFiltered.length}
            rowsPerPage={5}
            page={0}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          />
        </div>
      );
  }
//   else if (selectedRole === "Profile") {
//    return <ProfileModal/>
//   }
  return null;
};

export default HandleTest;
