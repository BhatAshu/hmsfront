import React, { useState,useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";

const PatientDetails = ({ open, onClose, patient }) => {
  const [formData, setFormData] = useState({
    username: "",
    bloodgroup: "",
    collecteddate: "",
    systolicPressure: "",
    diastolicPressure: "",
    meanArterialPressure: "",
    pulsePressure: "",
  });
  useEffect(() => {
    if (patient) {
      setFormData((prevData) => ({
        ...prevData,
        username: patient.username || "",
        bloodgroup: patient.bloodgroup || "",
        collecteddate: patient.collecteddate || "",
        systolicPressure: patient.systolicPressure || "",
        diastolicPressure: patient.diastolicPressure || "",
        meanArterialPressure: patient.meanArterialPressure || "",
        pulsePressure: patient.pulsePressure || "",
      }));
    }
  }, [patient]);
  

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%", // Increase modal width
    maxWidth: "600px", // Increase maximum modal width
    bgcolor: "white",
    boxShadow: 24,
    height: "80%", // Adjust the height as needed
    overflowY: "auto",
    p: 4,
    borderRadius: "8px",
  };

  const formItemStyle = {
    marginBottom: "20px",
  };

  const handleClose = () => {
    onClose();
  };

  const handleFormChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/hbms/add_bptest/${patient.id}`, formData);
      console.log("success");
  
      // Generate PDF
      const pdfResponse = await axios.get(`http://localhost:5000/api/hbms/bptest_report/${patient.id}`, {
        responseType: "blob", 
      });
      const pdfBlob = new Blob([pdfResponse.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
  
      handleClose();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  

  return (
    <Modal open={open} onClose={handleClose}>
    <Box sx={modalStyle}>
        <Typography variant="h5" gutterBottom>
          Other Information
        </Typography>
        <TextField
          label="Name"
          value={formData.username}
          onChange={(e) => handleFormChange("username", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="Bloodgroup"
          value={formData.bloodgroup}
          onChange={(e) => handleFormChange("bloodgroup", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="Collecteddate"
          value={formData.collecteddate}
          onChange={(e) => handleFormChange("collecteddate", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
         <TextField
          label="SystolicPressure"
          value={formData.systolicPressure}
          onChange={(e) => handleFormChange("systolicPressure", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
         <TextField
          label="DiastolicPressure"
          value={formData.diastolicPressure}
          onChange={(e) => handleFormChange("diastolicPressure", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
         <TextField
          label="MeanArterialPressure"
          value={formData.meanArterialPressure}
          onChange={(e) => handleFormChange("meanArterialPressure", e.target.value)}
          fullWidth
          style={formItemStyle}

        />
        <TextField
          label="PulsePressure"
          value={formData.pulsePressure}
          onChange={(e) => handleFormChange("pulsePressure", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <Button onClick={handleFormSubmit} color="primary">
          Submit
        </Button>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default PatientDetails;
