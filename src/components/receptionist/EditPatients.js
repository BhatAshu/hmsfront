// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Label,
// } from "reactstrap";
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
// import "react-phone-input-2/lib/style.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { Select, MenuItem } from "@mui/material";

// function EditPatients({
//   editModal,
//   handleEdit,
//   onClose,
//   data,
//   setData,
//   doctors,
// }) {
//   const [formData, setFormData] = useState({
//     title: "",
//     image: null,
//   });
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   // const [doctors, setDoctors] = useState([]);

//   const [isValid, setIsValid] = useState({
//     emailValid: false,
//     PhoneValid: false,
//   });

//   const handleNameChange = (e) => {
//     const updatedData = { ...data, username: e.target.value };
//     setData(updatedData);
//     setFormData({ ...formData, username: e.target.value });
//   };

//   const handleEmailChange = (e) => {
//     const updatedData = { ...data, email: e.target.value };
//     setData(updatedData);
//     setFormData({ ...formData, email: e.target.value });
//     if (/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(e.target.value)) {
//       setIsValid({ ...isValid, emailValid: true });
//     } else {
//       setIsValid({ ...isValid, emailValid: false });
//     }
//   };

//   const handlePhoneChange = (e) => {
//     const updatedData = { ...data, phone: e.target.value };
//     setData(updatedData);
//     setFormData({ ...formData, phone: e.target.value });
//     if (/[0-9^]{10}$/.test(e.target.value)) {
//       setIsValid({ ...isValid, PhoneValid: true });
//     } else {
//       setIsValid({ ...isValid, PhoneValid: false });
//     }
//   };

//   const handleGenderChange = (e) => {
//     const updatedData = { ...data, gender: e.target.value };
//     setData(updatedData);
//     setFormData({ ...formData, gender: e.target.value });
//   };

//   const handleAgeChange = (e) => {
//     const updatedData = { ...data, age: e.target.value };
//     setData(updatedData);
//     setFormData({ ...formData, age: e.target.value });
//   };

//   const handleDepartmentChange = (e) => {
//     const updatedData = { ...data, department: e.target.value };
//     setData(updatedData);
//     // Remove the line below, as the 'doctor' function is not defined
//     // doctor();
//   };

//   const handlChiefComplaintChange = (e) => {
//     const updatedData = { ...data, chiefcomplaint: e.target.value };
//     setData(updatedData);
//     setFormData({ ...formData, chiefcomplaint: e.target.value });
//   };

//   const handleTimeChange = (e) => {
//     const updatedData = { ...data, timeofregistration: e.target.value }; 
//     setData(updatedData);
//     setFormData({ ...formData, timeofregistration: e.target.value });
//   };

//   const handleAddressChange = (e) => {
//     const updatedData = { ...data, address: e.target.value }; 
//     setData(updatedData);
//     setFormData({ ...formData, address: e.target.value });
//   };

//   const handleDoctorChange = (e) => {
//     const doctorId = e.target.value;
//     const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId);
//     if (selectedDoctor) {
//       const updatedData = {
//         ...data,
//         doctorId: doctorId,
//         doctorName: selectedDoctor.username, 
//       };
//       setData(updatedData);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("jj");
//     const formData = new URLSearchParams();
//     formData.append("username", data.username);
//     formData.append("email", data.email);
//     formData.append("phone", data.phone);
//     formData.append("gender", data.gender);
//     formData.append("age", data.age);
//     formData.append("department", data.department);
//     formData.append("chiefcomplaint", data.chiefcomplaint);
//     formData.append("timeofregistration", data.timeofregistration);
//     formData.append("address", data.address);
//     formData.append("doctorId", data.doctorId);

//     const config = {
//       "Content-Type": "application/x-www-form-urlencoded",
//       headers: { auth: localStorage.getItem("access_token") },
//     };
//     axios
//       .put(
//         `http://localhost:5000/api/hbms/update_patient/${data.id}`,
//         formData,
//         config
//       )
//       .then((res) => {
//         console.log(res);
//         if (res.status === 200) {
//           onClose();
//           setData({
//             username: "",
//             email: "",
//             phone: "",
//             gender: "",
//             age: "",
//             department: "",
//             chiefcomplaint: "",
//             timeofregistration: "",
//             address: "",
//             doctorId: "",
//             doctorName: "",
//           });
//           toast.success("Record is successfully updated");
//         } else {
//           console.log(res.data);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <Modal
//       isOpen={editModal}
//       toggle={handleEdit}
//       centered
//       className="modal-right"
//     >
//       <ModalHeader toggle={handleEdit} onClick={() => onClose()}>
//         Updating User
//       </ModalHeader>
//       <form className="container" onSubmit={handleSubmit}>
//         <ModalBody>
//           <div className="row">
//             <div className="col-md-6">
//               <Label>
//                 Name:
//                 <input
//                   type="text"
//                   value={data.username}
//                   name="name"
//                   onChange={handleNameChange}
//                   required
//                 />
//               </Label>
//             </div>
//             <div className="col-md-6">
//               <Label>
//                 Email:
//                 <input
//                   type="text"
//                   value={data.email}
//                   required
//                   onChange={handleEmailChange}
//                 />
//               </Label>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-6">
//               <Label>
//                 Phone:
//                 <PhoneInput
//                   type="number"
//                   value={data.phone}
//                   require
//                   onChange={(value) => setData({ ...data, phone: value })}
//                 />
//               </Label>
//             </div>
//             <div className="col-md-6">
//               <Label>
//                 Gender:
//                 <input
//                   type="text"
//                   value={data.gender}
//                   onChange={handleGenderChange}
//                   required
//                 />
//               </Label>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-6">
//               <Label>
//                 Age:
//                 <input
//                   type="text"
//                   value={data.age}
//                   required
//                   onChange={handleAgeChange}
//                 />
//               </Label>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-6">
//               <Label>
//                 ChiefComplaint:
//                 <input
//                   type="text"
//                   value={data.chiefcomplaint}
//                   required
//                   onChange={handlChiefComplaintChange}
//                 />
//               </Label>
//             </div>
//             <div className="col-md-6">
//               <Label>
//                 Timeofregistration:
//                 <input
//                   type="text"
//                   value={data.timeofregistration}
//                   onChange={handleTimeChange}
//                   required
//                 />
//               </Label>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-6">
//               <Label>
//                 Address:
//                 <input
//                   type="text"
//                   value={data.address}
//                   required
//                   onChange={handleAddressChange}
//                 />
//               </Label>
//             </div>
//           </div>
//           <div className="row">
//             <Label>
//               Doctor:
//               <div>
//                 <Select
//                   name="doctor"
//                   value={data.doctorId || ''} 
//                   onChange={handleDoctorChange}
//                 >
//                   {doctors.map((doctor) => (
//                     <MenuItem key={doctor.id} value={doctor.id}>
//                       {doctor.username} 
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </div>
//             </Label>
//           </div>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" type="submit">
//             Submit
//           </Button>{" "}
//           <Button color="secondary" onClick={() => onClose()}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </form>
//     </Modal>
//   );
// }

// export default EditPatients;
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// import "../doctor/style.css";
import { Select, MenuItem } from "@mui/material";

const EditPatient = ({
  editModal,
  handleEdit,
  onClose,
  data,
  setData,
  onSave,
  doctors,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isPhone, setIsPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [status, setStatus] = useState(""); 

  const [isValid, setIsValid] = useState({
    emailValid: false,
    passwordValid: false,
  });

  
  const handleUsernameChange = (e) => {
    setData({ ...data, username: e.target.value });
  };

  const handleEmailChange = (e) => {
    if (/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(e.target.value)) {
      setIsValid({ ...isValid, emailValid: true });
    } else {
      setIsValid({ ...isValid, emailValid: false });
    }
    setData({ ...data, email: e.target.value });
  };

  const handleGenderChange = (e) => {
    setData({ ...data, gender: e.target.value });
  };

  const handleDepartmentChange = (e) => {
    const updatedData = { ...data, department: e.target.value };
    setData(updatedData);
    // Remove the line below, as the 'doctor' function is not defined
    // doctor();
  };


  const handlePhoneChange = (value) => {
    // console.log(value);
    setData({ ...data, phone: value });
    // setIsPhone(value);
  };

  // const handlePhoneChange = (value) => {
  //   setIsPhone(value);
  //   setData({ ...data, phone: value });
  // };

  // const handlePhoneChange = (value) => {
  //   setIsPhone(value);
  //   setData({ ...data, phone: value });

  //   // Validate the phone number
  //   if (value && !PhoneInput.isValidPhoneNumber(value)) {
  //     setPhoneError(true);
  //   } else {
  //     setPhoneError(false);
  //   }
  // };
  const handleAgeChange = (e) => {
    setData({ ...data, age: e.target.value });
  };

  

  const handleChiefcomplaintChange = (e) => {
    setData({ ...data, chiefcomplaint: e.target.value });
  };

  const handleTimeofregistrationChange = (e) => {
    setData({ ...data, timeofregistration: e.target.value });
  };
  

  const handleAddressChange = (e) => {
    setData({ ...data, address: e.target.value });
  };

  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId);
    if (selectedDoctor) {
      const updatedData = {
        ...data,
        doctorId: doctorId,
        doctorName: selectedDoctor.username, // Store the doctor's name
      };
      setData(updatedData);
    }
  };

  
  
  

  // ... (rest of the code)

  // const handleStatusChange = (e) => {
  //   setStatus(e.target.value);
  //   setData({ ...data, status: e.target.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("phone", data.phone);
    formData.append("age", data.age);
    formData.append("department", data.department);
    formData.append("chiefcomplaint", data.chiefcomplaint);
    formData.append("timeofregistration", data.timeofregistration);
    formData.append("address", data.address);
    formData.append("doctorId", data.doctorId);
    // formData.append("status", status);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: localStorage.getItem("access_token"),
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/hbms/update_patient/${data.id}`,

        formData,
        config
      );

      if (response.status === 200) {
        onClose();
        setData({
          username: "",
          email: "",
          gender: "",
          phone: "",
          age: "",
          department:"",
          chiefcomplaint: "",
          timeofregistration: "",
          address: "",
          doctorId:"",
          doctorName: "",
          // status:"",
        });
        toast.success("Item updated successfully!");
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      isOpen={editModal}
      toggle={handleEdit}
      centered
      // className="modal-right"
    >
      <ModalHeader toggle={handleEdit} onClick={onClose}>
        Edit Patient
      </ModalHeader>
      <div className="containers">
        <ModalBody>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={data.username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={data.email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <input
                  className="form-control"
                  id="gender"
                  value={data.gender}
                  onChange={handleGenderChange}
                  required
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={data.phone}
                  onChange={handlePhoneChange}
                  required
                />

              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  value={data.age}
                  onChange={handleAgeChange}
                  required
                />
              </div>
            </div>
            
            <div className="col">
              <div className="form-group">
                <label htmlFor="chiefcomplaint">Chief Complaint:</label>
                <input
                  type="text"
                  className="form-control"
                  id="chiefcomplaint"
                  value={data.chiefcomplaint}
                  onChange={handleChiefcomplaintChange}
                  required
                />
              </div>
            </div>
            </div>
            
            <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="timeofregistration">
                  Time Of Registration:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="timeofregistration"
                  value={data.timeofregistration}
                  onChange={handleTimeofregistrationChange}
                  required
                />
              </div>
            </div>
            

          
            <div className="col">
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={data.address}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </div>
            </div>

            <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="doctorName">Doctor Name:</label>
                <Select
                  name="doctor"
                  value={data.doctorId || ''} // Use doctorId instead of doctor
                  onChange={handleDoctorChange}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.username} {/* Display the doctor's name */}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {/* <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select value={status} onChange={handleStatusChange}>
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div> */}
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit} type="submit">
            Submit
          </Button>
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default EditPatient;