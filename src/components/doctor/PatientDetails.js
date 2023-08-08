// import React, { useState } from "react";
// import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";

// const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "85%", // Increase modal width
//     maxWidth: "600px", // Increase maximum modal width
//     bgcolor: "white",
//     boxShadow: 24,
//     p: 4,
//     borderRadius: "8px",
//   };
  
//   const buttonContainerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "15px", // Add margin between button container and content
//   };

// const PatientDetailsModal = ({ open, onClose, patient }) => {
//   const [activeSection, setActiveSection] = useState(null);
//   if (!patient) {
//     return null; // Return early if patient is null or undefined
//   }

//   const handleClose = () => {
//     onClose();
//   };

//   const handleButtonClick = (section) => {
//     setActiveSection(section);
//   };

//   const renderContent = () => {
//     switch (activeSection) {
//       case "patientDetails":
//         return (
//           <form>
//             <TextField
//               label="First Name"
//               variant="outlined"
//               value={patient.firstname}
//               fullWidth
//               disabled
//             />
//             <TextField
//               label="Email"
//               variant="outlined"
//               value={patient.email}
//               fullWidth
//               disabled
//             />
//             <TextField
//               label="Phone"
//               variant="outlined"
//               value={patient.phone}
//               fullWidth
//               disabled
//             />
//             <TextField
//               label="Age"
//               variant="outlined"
//               value={patient.age}
//               fullWidth
//               disabled
//             />
//             <TextField
//               label="Gender"
//               variant="outlined"
//               value={patient.gender}
//               fullWidth
//               disabled
//             />
//           </form>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={modalStyle}>
//       <Typography variant="h5" gutterBottom color="black">
//           {patient.firstname} Details
//         </Typography>
//         <div style={buttonContainerStyle}>
//           <Button
//             variant={
//               activeSection === "patientDetails" ? "contained" : "outlined"
//             }
//             onClick={() => handleButtonClick("patientDetails")}
//             sx={{ marginBottom: 2 }}
//           >
//             Patient Details
//           </Button>
//           <Button
//             variant={
//               activeSection === "medicalInformation" ? "contained" : "outlined"
//             }
//             onClick={() => handleButtonClick("medicalInformation")}
//             sx={{ marginBottom: 2 }}
//           >
//             Medical Information
//           </Button>
//           <Button onClick={handleButtonClick}>Other Information</Button>
//           <Button onClick={handleButtonClick}>Attachment</Button>
//         </div>
//         <Button onClick={handleClose} color="secondary">
//           Close
//         </Button>
//         <Box mt={2}>{renderContent()}</Box>
//       </Box>
//     </Modal>
//   );
// };

// export default PatientDetailsModal;
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%", // Increase modal width
    maxWidth: "600px", // Increase maximum modal width
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
  };
  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px", // Add margin between button container and content
  };
const PatientDetailsModal = ({ open, onClose, patient }) => {
  const [activeSection, setActiveSection] = useState(null);
  if (!patient) {
    return null; // Return early if patient is null or undefined
  }
  const handleClose = () => {
    onClose();
  };
  const handleButtonClick = (section) => {
    setActiveSection(section);
  };
  const renderContent = () => {
    switch (activeSection) {
      case "patientDetails":
        return (
          <div>
            <Typography variant="body1">
              <strong>Name:</strong> {patient.firstname}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {patient.email}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {patient.phone}
            </Typography>
            <Typography variant="body1">
              <strong>Age:</strong> {patient.age}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {patient.gender}
            </Typography>
          </div>
        );
        case "medicalInformation":
          return (
            <div>
              <Typography variant="body1">
                <strong>BloodGroup:</strong> {patient.bloodgroup}
              </Typography>
              <Typography variant="body1">
                <strong>ChiefComplaint:</strong> {patient.chiefcomplaint}
              </Typography>
              {/* Add more medical information fields as needed */}
            </div>
          );
        default:
          return null;
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
      <Typography variant="h5" gutterBottom color="black">
          {patient.firstname} Details
        </Typography>
        <div style={buttonContainerStyle}>
          <Button
            variant={
              activeSection === "patientDetails" ? "contained" : "outlined"
            }
            onClick={() => handleButtonClick("patientDetails")}
            sx={{ marginBottom: 2 }}
          >
            Patient Details
          </Button>
          <Button
            variant={
              activeSection === "medicalInformation" ? "contained" : "outlined"
            }
            onClick={() => handleButtonClick("medicalInformation")}
            sx={{ marginBottom: 2 }}
          >
            Medical Information
          </Button>
          <Button onClick={handleButtonClick}>Other Information</Button>
          <Button onClick={handleButtonClick}>Attachment</Button>
        </div>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
        <Box mt={2}>{renderContent()}</Box>
      </Box>
    </Modal>
  );
};
export default PatientDetailsModal;
