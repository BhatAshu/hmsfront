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
      fastingBloodSugar: "",
      postPrandialBloodSugar: "",
      randomBloodSugar: "",
      hba1c: "",
      oralGlucoseToleranceTest: "",
      fructosamine: "",
      cPeptideTest: "",
      insulinLevel: "",
      urineKetones: "",
  });
  useEffect(() => {
    if (patient) {
      setFormData((prevData) => ({
        ...prevData,
        username: patient.username || "",
        bloodgroup: patient.bloodgroup || "",
        collecteddate: patient.collecteddate || "",
        fastingBloodSugar: patient.fastingBloodSugar || "",
        postPrandialBloodSugar: patient.postPrandialBloodSugar || "",
        randomBloodSugar: patient.randomBloodSugar || "",
        hba1c: patient.hba1c || "",
        oralGlucoseToleranceTest: patient.oralGlucoseToleranceTest || "",
        fructosamine: patient.fructosamine || "",
        cPeptideTest: patient.cPeptideTest || "",
        insulinLevel: patient.insulinLevel || "",
        urineKetones: patient.urineKetones || "",
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
      await axios.put(`http://localhost:5000/api/hbms/add_sugartest/${patient.id}`, formData);
      // Handle success or show a notification
      console.log("success");
  
      // Generate PDF
      const pdfResponse = await axios.get(`http://localhost:5000/api/hbms/sugartest_report/${patient.id}`, {
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
          label="FastingBloodSugar"
          value={formData.fastingBloodSugar}
          onChange={(e) => handleFormChange("fastingBloodSugar", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
         <TextField
          label="PostPrandialBloodSugar"
          value={formData.postPrandialBloodSugar}
          onChange={(e) => handleFormChange("postPrandialBloodSugar", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
         <TextField
          label="RandomBloodSugar"
          value={formData.randomBloodSugar}
          onChange={(e) => handleFormChange("randomBloodSugar", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="Hba1c"
          value={formData.hba1c}
          onChange={(e) => handleFormChange("hba1c", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="OralGlucoseToleranceTest"
          value={formData.oralGlucoseToleranceTest}
          onChange={(e) => handleFormChange("oralGlucoseToleranceTest", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="Fructosamine"
          value={formData.fructosamine}
          onChange={(e) => handleFormChange("fructosamine", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="CPeptideTest"
          value={formData.cPeptideTest}
          onChange={(e) => handleFormChange("cPeptideTest", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="InsulinLevel"
          value={formData.insulinLevel}
          onChange={(e) => handleFormChange("insulinLevel", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="UrineKetones"
          value={formData.urineKetones}
          onChange={(e) => handleFormChange("urineKetones", e.target.value)}
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
