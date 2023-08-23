import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const OtherInformationModal = ({ open, onClose, patient }) => {
  const [formData, setFormData] = useState({
    username: patient.username || "",
    email: patient.email || "",
    age: patient.age || "",
    chiefcomplaint: patient.chiefcomplaint || "",
    bloodgroup: patient.bloodgroup || "",
    testtype: patient.testtype || "",
  });

  const handleClose = () => {
    onClose();
  };

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

  const formItemStyle = {
    marginBottom: "20px",
  };

  const handleFormChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      console.log("Form Data before submitting:", formData);
      const headers = {
        auth: localStorage.getItem("access_token"),
      };  
      const response = await axios.put(
        `http://localhost:5000/api/hbms/send_lab/${patient.id}`,
        formData,
        { headers } 
      );
      console.log("Backend Response:", response.data);
      console.log("Success: Data updated");
      handleClose();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const testOptions = [
    "BloodTest",
    "BloodPressureTest",
    "UrineTest",
    "SugarLevelTest",
  ];

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
          label="Email"
          value={formData.email}
          onChange={(e) => handleFormChange("email", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="Age"
          value={formData.age}
          onChange={(e) => handleFormChange("age", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
         <TextField
          label="CheifComplaint"
          value={formData.chiefcomplaint}
          onChange={(e) => handleFormChange("chiefcomplaint", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
         <TextField
          label="BloodGroup"
          value={formData.bloodgroup}
          onChange={(e) => handleFormChange("bloodgroup", e.target.value)}
          fullWidth
          style={formItemStyle}
        />
        <FormControl fullWidth style={formItemStyle}>
          <InputLabel>Test Type</InputLabel>
          <Select
            value={formData.testtype}
            onChange={(e) => handleFormChange("testtype", e.target.value)}
          >
            {testOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default OtherInformationModal;
