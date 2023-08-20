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
    hemoglobin: "",
    whiteBloodCellCount: "",
    plateletCount: "",
    redBloodCellCount: "",
    hematocrit: "",
    meanCorpuscularVolume: "",
    meanCorpuscularHemoglobin: "",
    meanCorpuscularHemoglobinConcentration: "",
  });
  useEffect(() => {
    if (patient) {
      setFormData((prevData) => ({
        ...prevData,
        username: patient.username || "",
        bloodgroup: patient.bloodgroup || "",
        collecteddate: patient.collecteddate || "",
        hemoglobin: patient.hemoglobin || "",
        whiteBloodCellCount: patient.whiteBloodCellCount || "",
        plateletCount: patient.plateletCount || "",
        redBloodCellCount: patient.redBloodCellCount || "",
        hematocrit: patient.hematocrit || "",
        meanCorpuscularVolume: patient.meanCorpuscularVolume || "",
        meanCorpuscularHemoglobin: patient.meanCorpuscularHemoglobin || "",
        meanCorpuscularHemoglobinConcentration: patient.meanCorpuscularHemoglobinConcentration || "",
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
      await axios.put(`http://localhost:5000/api/hbms/add_bloodtest/${patient.id}`, formData);
      // Handle success or show a notification
      console.log("success");
  
      // Generate PDF
      const pdfResponse = await axios.get(`http://localhost:5000/api/hbms/bloodtest_report/${patient.id}`, {
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
          label="Hemoglobin"
          value={formData.hemoglobin}
          onChange={(e) => handleFormChange("hemoglobin", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
         <TextField
          label="WhiteBloodCellCount"
          value={formData.whiteBloodCellCount}
          onChange={(e) => handleFormChange("whiteBloodCellCount", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
         <TextField
          label="PlateletCount"
          value={formData.plateletCount}
          onChange={(e) => handleFormChange("plateletCount", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="RedBloodCellCount"
          value={formData.redBloodCellCount}
          onChange={(e) => handleFormChange("redBloodCellCount", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="Hematocrit"
          value={formData.hematocrit}
          onChange={(e) => handleFormChange("hematocrit", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="MeanCorpuscularVolume"
          value={formData.meanCorpuscularVolume}
          onChange={(e) => handleFormChange("meanCorpuscularVolume", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="MeanCorpuscularHemoglobin"
          value={formData.meanCorpuscularHemoglobin}
          onChange={(e) => handleFormChange("meanCorpuscularHemoglobin", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="MeanCorpuscularHemoglobinConcentration"
          value={formData.meanCorpuscularHemoglobinConcentration}
          onChange={(e) => handleFormChange("meanCorpuscularHemoglobinConcentration", e.target.value)}
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
