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

  // ... Other imports and component code ...

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
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
              <TableCell sx={{ color: "white" }}>Gender</TableCell>
              <TableCell sx={{ color: "white" }}>Age</TableCell>
              <TableCell sx={{ color: "white" }}>Department</TableCell>
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
                <TableCell>{patient.username}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.department}</TableCell>
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


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// // import AddModal from "./modal/AddModal";
// // import EditModal from "./modal/EditModal";
// // import { FaRegEdit, FaTrash } from "react-icons/fa";
// // import ModalImage from "react-modal-image";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { DataGrid } from '@mui/x-data-grid';
// import Profile from "./ProfileModal";
// import { FaRegEdit, FaTrash } from "react-icons/fa";
// // import { AiOutlineFileText } from "react-icons/ai"; 
// import "../admin/style.css"
// import EditPatient from "./EditPatients";
// import AddModal from "./AddPatient";

// function HandlePatient() {
//   const navigate = useNavigate();
//   const [columns, setColumns] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [role, setRole] = useState("Doctor");
//   const [modal, setModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);
//   const [selectedRole, setSelectedRole] = useState("");
//   const [addModal, setAddModal] = useState(false);

// //   const [columnsDataGrid, setColumnsDataGrid] = useState([]);

//   const [data, setData] = useState({
// 	id:"",
// 	username: "",
// 	email: "",
// 	gender:"",
// 	phone: "",
// 	age:"",
// 	department:"",
// 	chiefcomplaint:"",
// 	timeofregistration:"",
// 	address:"",
// 	doctorname:"",
// 	// status:"",
	
//   });
//   const header = {
//     headers: {
//       auth: localStorage.getItem("access_token"),
//     },
//   };
  
//   const handleAdd = () => {
//     setAddModal(true);
//   };
  

//   const handleDelete = (id) => {
// 	if (window.confirm("Do you want to delete this user?")) {
// 	  axios({
// 		url: `http://localhost:3000/api/hbms/delete_patient/${id}`,
// 		method: "delete",
// 		headers: {
// 		  auth: localStorage.getItem("access_token"),
// 		},
// 	  })
// 		.then((res) => {
// 		  console.log(res);
// 		  toast.success("Item deleted successfully!");
// 		})
// 		.catch((err) => {
// 		  console.log(err);
// 		});
// 	}
//   };
  

//   function handleEdit(id, username, email,gender, phone, age,department,chiefcomplaint,timeofregistration,address,doctor) {
// 	setEditModal(true);
// 	setData({
// 	  ...data,
// 	  id: id,
// 	  username: username,
// 	  email: email,
// 	  gender:gender,
// 	  phone: phone,
// 	  age:age,
// 	  department: department,
// 	  chiefcomplaint:chiefcomplaint,
// 	  timeofregistration:timeofregistration,
// 	  address: address,
// 	  doctor:doctor,
// 	//   status:status,
// 	});
//   }

//   const toggle = () => setModal(!modal);

//   useEffect(() => {
// 	if (localStorage.getItem("access_token")) 
// 	{
// 	  navigate("/receptionist");
// 	} else {
// 	  navigate("/login");
// 	}
// 	// const doctorId = localStorage.getItem("doctorId");

// 	const config = {
// 	  headers: { auth: localStorage.getItem("access_token") },
// 	};
// 	// const doctorId = localStorage.getItem("doctorId");
// 	// console.log("Doctor ID:", doctorId); 
    
// 	// if (doctorId) {
// 	// const doctorId = localStorage.getItem("doctorId");

// 	axios
// 	.get("http://localhost:5000/api/hbms/listpat_form", config)
// 	  .then((res) => {
// 		setColumns(res.data);
// 	  })
// 	  .catch((err) => {
// 		console.log(err);
// 	  });

//   }, [columns]);




//   const doctor = (department) => {
//     console.log("Fetching doctors for department:", department);
//     if (role === "Doctor" && department) {
//       const departmentApiMap = {
//         General: "http://localhost:5000/api/hbms/list_general",
//         Pediatrics: "http://localhost:5000/api/hbms/list_orthopedics",
//         Orthopedics: "http://localhost:5000/api/hbms/list_dermatology",
//         Dermatology: "http://localhost:5000/api/hbms/list_pediatrics",
//       };

//       const departmentApi = departmentApiMap[department];

//       axios
//         .get(departmentApi, header)
//         .then((response) => {
//           console.log("API Response:", response.data);
//           setDoctors(response.data); // Update the doctors state
//         })
//         .catch((error) => console.error(error));
//     }
//   };

//   useEffect(() => {
//     doctor(data.department);
//   }, [data.department]);

//   useEffect(() => {
//     doctor(data.department);
//   }, [data.department]);

//   const columnsDataGrid = [

// 	{ id:"1",field: "username", headerName: "Name", width: 200 ,sortable:false,headerClassName: "header-black",},
// 	{id:"2", field: "email", headerName: "Email", width: 200 ,sortable:false,headerClassName: "header-black",},
// 	{id:"3", field: "gender", headerName: "Gender", width: 200 ,sortable:false,headerClassName: "header-black",},
// 	{id:"4", field: "age", headerName: "Age", width: 200 ,sortable:false,headerClassName: "header-black",},
// 	{id:"5", field: "department", headerName: "Department", width: 200 ,sortable:false,headerClassName: "header-black",},
// 	{id:"6", field: "phone", headerName: "Phone", width: 150 ,sortable:false,headerClassName: "header-black",},
// 	// { field: "bloodgroup", headerName: "Bloodgroup", width: 150 ,sortable:false,headerClassName: "header-black",},
// 	{id:"7", field: "chiefcomplaint", headerName: "chiefcomplaint", width: 150 ,sortable:false,headerClassName: "header-black",},
// 	{id:"8", field: "timeofregistration", headerName: "Time Of Registration", width: 200 ,sortable:false,headerClassName: "header-black",},
// 	// { field: "bloodpressure", headerName: "BloodPressure", width: 200 ,sortable:false,headerClassName: "header-black",},
// 	// { field: "sugarlevel", headerName: "SugarLevel", width: 200 ,sortable:false,headerClassName: "header-black",},
// 	{ id:"9",field: "address", headerName: "Address", width: 150 ,sortable:false,headerClassName: "header-black",},
// 	// { field: "message", headerName: "Message", width: 150 ,sortable:false,headerClassName: "header-black",},
// 	{ id:"10",field: "doctorName", headerName: "DoctorName", width: 150 ,sortable:false,headerClassName: "header-black",},
// 	// { field: "status", headerName: "status", width: 150 ,sortable:false,headerClassName: "header-black",},

// 	{
// 			field: "actions",
// 			headerName: "Action",
// 			width: 150,
// 			headerClassName: "header-black",
// 			renderCell: (params) => (
// 			  <div>
// 				<button
// 				  className="btn-st edit-button"
// 				  style={{ marginRight: "15px" }}
				
// 		onClick={() =>
// 		  handleEdit(
// 			params.row.id,
// 			params.row.username,
// 			params.row.email,
// 			params.row.gender,
// 			params.row.phone,
// 			params.row.age,
// 			params.row.department,
// 			params.row.chiefcomplaint,
// 			params.row.timeofregistration,
// 			params.row.address,
// 			params.row.doctor,
// 			// params.row.status,
			
			
// 		  )
// 		}
		
// 	  >
// 	  <FaRegEdit />
// 	  </button>
// 	  <button
// 		className="btn-st delete-button"
// 		onClick={() => handleDelete(params.row.id)}
// 	  >
// 		<FaTrash />
// 	  </button>
// 	</div>
//   ),
// },
// ];

// // console.log(columns);


//   return (
// 	<div className="bg1">
// 		 <div>
//           <button onClick={() => handleAdd()} className="addbtn">
//             Add Patient
//           </button>
//         </div>
// 	  <div className="container">
	  
// 		{selectedRole === "Profile" ? (
// 	  <Profile/>
// 	) : (
// 		<div style={{  width: "100%", overflowX: "auto" }}>
// 		  <DataGrid
// 		  getRowId={(row) => row.id}
// 			rows={columns}
// 			columns={columnsDataGrid}
// 			disableColumnFilter
// 			  disableColumnMenu
// 			// pageSize={5}
			
// 			initialState={{
// 			  pagination: {
// 				paginationModel: { page: 0, pageSize: 5 },
// 			  },
// 			}}
// 			pageSizeOptions={[5, 10, 15]}
		   
// 			disableSelectionOnClick
// 		  />
			
// 		</div>
// 		)}
// 	  </div>
// 	  <AddModal
//           modal={addModal}
//           toggle={() => setAddModal(!addModal)}
//           onClose={() => setAddModal(false)}
//         />
// 	  <EditPatient
// 	editModal={editModal}
// 	handleEdit={handleEdit}
// 	onClose={() => setEditModal(false)}
// 	data={data}
// 	setData={setData}
// 	doctors={doctors}
//   />
//  		{/* <AddModal
//         modal={addModal}
//         toggle={() => setAddModal(!addModal)}
//         onClose={() => setAddModal(false)}
// 		data={data}
//         setData={setData}
//       /> */}
	  
// 	</div>
//   ); 
// } 
// export default HandlePatient;