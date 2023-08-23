import React, { useState,useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";

const UrineTestDetails = ({ open, onClose, patient }) => {
  const [formData, setFormData] = useState({
    username: "",
    bloodgroup: "",
    collecteddate: "",
    color: "",
    appearance: "",
    pHLevel: "",
    specificGravity: "",
    protein: "",
    glucose: "",
    ketones: "",
    bilirubin: "",
    blood: "",
    leukocyteEsterase: "",
    nitrite: "",
    microscopicExamination: "",
  });
  useEffect(() => {
    if (patient) {
      setFormData((prevData) => ({
        ...prevData,
        username: patient.username || "",
        bloodgroup: patient.bloodgroup || "",
        collecteddate: patient.collecteddate || "",
        color: patient.color || "",
        appearance: patient.appearance || "",
        pHLevel: patient.pHLevel || "",
        specificGravity: patient.specificGravity || "",
        protein: patient.protein || "",
        glucose: patient.glucose || "",
        ketones: patient.ketones || "",
        bilirubin: patient.bilirubin || "",
        blood: patient.blood || "",
        leukocyteEsterase: patient.leukocyteEsterase || "",
        nitrite: patient.nitrite || "",
        microscopicExamination: patient.microscopicExamination || "",
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
      await axios.put(`http://localhost:5000/api/hbms/add_urintest/${patient.id}`, formData);
      // Handle success or show a notification
      console.log("success");
  
      // Generate PDF
      const pdfResponse = await axios.get(`http://localhost:5000/api/hbms/urinetest_report/${patient.id}`, {
        responseType: "blob", // Important for handling binary data
      });
  
      // Create a blob URL to open the PDF in a new tab
      const pdfBlob = new Blob([pdfResponse.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
  
      handleClose();
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error or show a notification
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
          label="Color"
          value={formData.color}
          onChange={(e) => handleFormChange("color", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
         <TextField
          label="Appearance"
          value={formData.appearance}
          onChange={(e) => handleFormChange("appearance", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
         <TextField
          label="PHLevel"
          value={formData.pHLevel}
          onChange={(e) => handleFormChange("pHLevel", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="SpecificGravity"
          value={formData.specificGravity}
          onChange={(e) => handleFormChange("specificGravity", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="Glucose"
          value={formData.glucose}
          onChange={(e) => handleFormChange("glucose", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="Ketones"
          value={formData.ketones}
          onChange={(e) => handleFormChange("ketones", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="Bilirubin"
          value={formData.bilirubin}
          onChange={(e) => handleFormChange("bilirubin", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="Blood"
          value={formData.blood}
          onChange={(e) => handleFormChange("blood", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="LeukocyteEsterase"
          value={formData.leukocyteEsterase}
          onChange={(e) => handleFormChange("leukocyteEsterase", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="Nitrite"
          value={formData.nitrite}
          onChange={(e) => handleFormChange("nitrite", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="MicroscopicExamination"
          value={formData.microscopicExamination}
          onChange={(e) => handleFormChange("microscopicExamination", e.target.value)}
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

export default UrineTestDetails;
