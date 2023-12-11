import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "react-datetime/css/react-datetime.css";
import { PDFDocument } from "pdf-lib"; 

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
        meanCorpuscularHemoglobinConcentration:
          patient.meanCorpuscularHemoglobinConcentration || "",
      }));
    }
  }, [patient]);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    maxWidth: "600px",
    bgcolor: "white",
    boxShadow: 24,
    height: "80%",
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
      await axios.put(
        `http://localhost:5000/api/hbms/add_bloodtest/${patient.id}`,
        formData
      );

      const pdfResponse = await axios.get(
        `http://localhost:5000/api/hbms/bloodtest_report/${patient.id}`,
        {
          responseType: "blob",
        }
      );

      const pdfBytes = new Uint8Array(pdfResponse.data);
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const collectedDate = new Date(formData.collecteddate);
      const formattedCollectedDate =
        ("0" + collectedDate.getDate()).slice(-2) +
        "/" +
        ("0" + (collectedDate.getMonth() + 1)).slice(-2) +
        "/" +
        collectedDate.getFullYear();
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      const textObjects = firstPage.getTextObjects();
      for (const textObject of textObjects) {
        const text = textObject.getText();

        if (text.includes("Collected Date:")) {
          const updatedText = text.replace(
            "Collected Date: " + formData.collecteddate,
            "Collected Date: " + formattedCollectedDate
          );

          textObject.setText(updatedText);
        }
      }
      const modifiedPdfBytes = await pdfDoc.save();
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
        type: "application/pdf",
      });
      const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob);
      window.open(modifiedPdfUrl);
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
          label="Collected Date"
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
          onChange={(e) =>
            handleFormChange("whiteBloodCellCount", e.target.value)
          }
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
          onChange={(e) =>
            handleFormChange("redBloodCellCount", e.target.value)
          }
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
          onChange={(e) =>
            handleFormChange("meanCorpuscularVolume", e.target.value)
          }
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="MeanCorpuscularHemoglobin"
          value={formData.meanCorpuscularHemoglobin}
          onChange={(e) =>
            handleFormChange("meanCorpuscularHemoglobin", e.target.value)
          }
          fullWidth
          style={formItemStyle}
        />
        <TextField
          label="MeanCorpuscularHemoglobinConcentration"
          value={formData.meanCorpuscularHemoglobinConcentration}
          onChange={(e) =>
            handleFormChange(
              "meanCorpuscularHemoglobinConcentration",
              e.target.value
            )
          }
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
