// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./PatForm.css";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Header from "../components/patients/Header";

// const PatientForm = () => {
//   const { doctorId, doctorName } = useParams();

//   useEffect(() => {
//     console.log("Received doctorId:", doctorId);
//     console.log("Received doctorName:", doctorName);
//   }, [doctorId, doctorName]);
//   const navigate = useNavigate();
//   const loginPatientId = localStorage.getItem("loginDataID");
//   const loginusername = localStorage.getItem("loginDataU");
//   const loginemail = localStorage.getItem("loginDataE");
//   const loginphone = localStorage.getItem("loginDataP");
//   const logingender = localStorage.getItem("loginDataG");
//   const loginbloodgroup = localStorage.getItem("loginDataB");

//   const [showTimings, setShowTimings] = useState(false);
//   const [formData, setFormData] = useState({
//     username: loginusername,
//     email: loginemail,
//     gender: logingender,
//     age: "",
//     phone: loginphone,
//     dateofbirth: "",
//     department: "",
//     chiefcomplaint: "",
//     bloodgroup: loginbloodgroup,
//     date: "",
//     address: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//     if (name === "dateofbirth") {
//       const birthDate = new Date(value);
//       const today = new Date();
//       const age = today.getFullYear() - birthDate.getFullYear();
//       setFormData((prevFormData) => ({ ...prevFormData, age }));
//     }
//   };

//   const toggleTimings = () => {
//     setShowTimings(!showTimings);
//   };

//   const formatToDDMMYYYY = (date) => {
//     const [year, month, day] = date.split("-");
//     return `${day}/${month}/${year}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Submitting form with doctorId:", doctorId);
//       const config = {
//         headers: { auth: localStorage.getItem("access_token") },
//       };

//       const formattedDOB = formatToDDMMYYYY(formData.dateofbirth);
//       const formattedDate = formatToDDMMYYYY(formData.date);

//       const response = await axios.put(
//         `http://localhost:5000/api/hbms/update_patform/${loginPatientId}`,
//         {
//           ...formData,
//           doctorId: doctorId,
//           doctorName: doctorName,
//           dateofbirth: formattedDOB,
//           date: formattedDate,
//         },
//         config
//       );

//       if (response.status === 200) {
//         console.log(response.data);
//         toast.success("Appointment booked successfully!");
//         navigate("/home");
//       } else {
//         console.log(response.data);
//         toast.success(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("An appointment already exists for this date and time.");
//     }
//   };
//   return (
//     <div
//       className="patient-form-container"
//       style={{
//         backgroundImage: 'url("https://images.unsplash.com/photo-1528460033278-a6ba57020470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ymx1ZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60")', // Add your background image URL here
//       }}
//     >
//       <Header />
//       <div className="form-wrapper">
//         <h2 className="form-title">Book An Appointment</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Patient Name:
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               disabled
//               style={{
//                 backgroundColor: "white",
//                 border: "2px solid #333",
//                 height: "40px",
//               }}
//             />
//           </label>
//           <br />
//           <label>
//             Email:
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               disabled
//               style={{
//                 backgroundColor: "white",
//                 border: "2px solid #333",
//                 height: "40px",
//               }}
//             />
//           </label>
//           <br />
//           <label>
//             Gender:
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               required
//               disabled
//               style={{
//                 backgroundColor: "white",
//                 border: "2px solid #333",
//                 height: "40px",
//               }}
//             >
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </label>

//           <br />
//           <label>
//             Phone:
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//               disabled
//               style={{
//                 backgroundColor: "white",
//                 border: "2px solid #333",
//                 height: "40px",
//               }}
//             />
//           </label>
//           <br />
//           <label>
//             BloodGroup:
//             <input
//               type="text"
//               name="bloodgroup"
//               value={formData.bloodgroup}
//               onChange={handleChange}
//               required
//               disabled
//               style={{
//                 backgroundColor: "white",
//                 border: "2px solid #333",
//                 height: "40px",
//               }}
//             />
//           </label>
//           <br />
//           <label>
//             Date of Birth:
//             <input
//               type="date"
//               name="dateofbirth"
//               value={formData.dateofbirth}
//               onChange={handleChange}
//               placeholder="dd/mm/yyyy"
//               required
//             />
//           </label>
//           <br />
//           <label>
//             Age:
//             <input
//               type="text"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <br />
//           <label>
//             Chief Complaint:
//             <input
//               type="text"
//               name="chiefcomplaint"
//               value={formData.chiefcomplaint}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <br />

//           <label>
//             Date:
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               placeholder="dd/mm/yyyy"
//               required
//             />
//           </label>
//           <br />
//           <label>
//             Time:
//             <input
//               type="time"
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//               required
//               onFocus={toggleTimings} // Show timings on focus
//               onBlur={toggleTimings} // Hide timings on blur
//             />
//             {showTimings && (
//               <div
//                 style={{
//                   border: "1px solid #ccc",
//                   padding: "10px",
//                   backgroundColor: "#f0f0f0",
//                   borderRadius: "5px",
//                   marginTop: "10px",
//                 }}
//               >
//                 <h3 style={{ marginTop: 0, fontSize: "16px" }}>
//                   Hospital Timings
//                 </h3>
//                 <p style={{ margin: "5px 0", fontSize: "14px" }}>
//                   Monday - Friday: 9:00 AM - 6:00 PM
//                 </p>
//                 <p style={{ margin: "5px 0", fontSize: "14px" }}>
//                   Saturday: 10:00 AM - 2:00 PM
//                 </p>
//                 <p style={{ margin: "5px 0", fontSize: "14px" }}>
//                   Sunday: Closed
//                 </p>
//               </div>
//             )}
//           </label>
//           <br />
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PatientForm;



import React, { useState,useEffect } from "react";
import axios from "axios";
import "./PatForm.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/patients/Header";

const PatientForm = () => {
  const { doctorId, doctorName } = useParams();

  useEffect(() => {
    console.log("Received doctorId:", doctorId);
    console.log("Received doctorName:", doctorName);
  }, [doctorId, doctorName]);
  const navigate = useNavigate();
  const loginPatientId = localStorage.getItem("loginDataID");
  const loginusername = localStorage.getItem("loginDataU");
  const loginemail = localStorage.getItem("loginDataE");
  const loginphone = localStorage.getItem("loginDataP");
  const logingender = localStorage.getItem("loginDataG");
  const loginbloodgroup = localStorage.getItem("loginDataB");

  const [showTimings, setShowTimings] = useState(false);
  const [formData, setFormData] = useState({
    username: loginusername,
    email: loginemail,
    gender: logingender,
    age: "",
    phone: loginphone,
    dateofbirth: "",
    department: "",
    chiefcomplaint: "",
    bloodgroup: loginbloodgroup,
    date: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    if (name === "dateofbirth") {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      setFormData((prevFormData) => ({ ...prevFormData, age }));
    }
  };

  const toggleTimings = () => {
    setShowTimings(!showTimings);
  };

  const formatToDDMMYYYY = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form with doctorId:", doctorId);
      const config = {
        headers: { auth: localStorage.getItem("access_token") },
      };

      const formattedDOB = formatToDDMMYYYY(formData.dateofbirth);
      const formattedDate = formatToDDMMYYYY(formData.date);

      const response = await axios.put(
        `http://localhost:5000/api/hbms/update_patform/${loginPatientId}`,
        {
          ...formData,
          doctorId: doctorId,
          doctorName: doctorName,
          dateofbirth: formattedDOB,
          date: formattedDate,
        },
        config
      );

      if (response.status === 200) {
        console.log(response.data);
        toast.success("Appointment booked successfully!");
        navigate("/home");
      } else {
        console.log(response.data);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An appointment already exists for this date and time.");
    }
  };
  return (
    <div style={{ backgroundColor: "inherit", borderRadius: "10px"}}>
      <Header />
      <h2 style={{ color: "#333", marginBottom: "40px",fontSize:"40px", textAlign: "center" }}>Book An Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled
            style={{ backgroundColor: "white" ,border: "2px solid #333",height:"40px"  }} 
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled
            style={{ backgroundColor: "white" ,border: "2px solid #333",height:"40px" }} 
          />
        </label>
        <br />
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            disabled
            style={{ backgroundColor: "white" ,border: "2px solid #333",height:"40px" }} 
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        
        <br />
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled
            style={{ backgroundColor: "white" ,border: "2px solid #333",height:"40px" }} 
          />
        </label>
        <br />
        <label>
          BloodGroup:
          <input
            type="text"
            name="bloodgroup"
            value={formData.bloodgroup}
            onChange={handleChange}
            required
            disabled
            style={{ backgroundColor: "white" ,border: "2px solid #333",height:"40px" }} 
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
            required
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Chief Complaint:
          <input
            type="text"
            name="chiefcomplaint"
            value={formData.chiefcomplaint}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
            required
          />
        </label>
        <br />
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            onFocus={toggleTimings} // Show timings on focus
            onBlur={toggleTimings} // Hide timings on blur
          />
          {showTimings && (
            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: "16px" }}>
                Hospital Timings
              </h3>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>
                Monday - Friday: 9:00 AM - 6:00 PM
              </p>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>
                Saturday: 10:00 AM - 2:00 PM
              </p>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>
                Sunday: Closed
              </p>
            </div>
          )}
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default PatientForm;





