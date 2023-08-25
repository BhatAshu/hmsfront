import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OtherInformationModal from "./SendLab";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  maxWidth: "600px",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};
const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px",
};
const PatientDetailsModal = ({ open, onClose, patient }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [otherInfoModalOpen, setOtherInfoModalOpen] = useState(false);
  const handleEditComplete = (editedPatient) => {
    // Update the patient data here with the edited patient object
    setActiveSection(null);
    onClose();
  };
  if (!patient) {
    return null;
  }

  const toggleOtherInfoModal = () => {
    setOtherInfoModalOpen(!otherInfoModalOpen);
  };

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
              <strong>Name:</strong> {patient.username}
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
            <Typography variant="body1">
              <strong>Prescribe:</strong> {patient.message} {/* Updated here */}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {patient.description}{" "}
              {/* Updated here */}
            </Typography>
          </div>
        );
      case "otherInformation":
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleOtherInfoModal}
            >
              Open Other Information Modal
            </Button>
            <OtherInformationModal
              open={otherInfoModalOpen}
              onClose={toggleOtherInfoModal}
              patient={patient}
            />
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
          {patient.username} Details
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
          <Button
            variant={
              activeSection === "otherInformation" ? "contained" : "outlined"
            }
            onClick={() => handleButtonClick("otherInformation")}
            sx={{ marginBottom: 2 }}
          >
            Other Information
          </Button>
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
