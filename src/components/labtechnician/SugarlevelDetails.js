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
// import "../admin/style.css"
// import { MDBTextArea } from "mdb-react-ui-kit";
// const imageMimeType = /image\/(jpg|jpeg)/i;


// function PatientDetails({
//   editModal,
//   handleEdit,
//   onClose,
//   // data,
//   // setData,
//   existingImage,
//   patient,
// }) {
//   const [file, setFile] = useState(null);
//   const [fileDataURL, setFileDataURL] = useState(null);
//   useEffect(() => {
//     if (editModal) {
//       setFileDataURL(existingImage ? URL.createObjectURL(existingImage) : null);
//     }
//   }, [editModal, existingImage]);

//   const [formData, setFormData] = useState({
//     title: "",
//     image: null,
//   });
//   const [data, setData] = useState({
//     username: patient?.username || "", // Make sure to provide default values or fetch data as needed
//     bloodgroup:  patient?.bloodgroup || "",
//     collecteddate: patient?.collecteddate || "",
//     hemoglobin: patient?.hemoglobin || "",
//     whiteBloodCellCount: patient?.whiteBloodCellCount || "",
//     plateletCount: patient?.plateletCount || "",
//     redBloodCellCount: patient?.redBloodCellCount || "",
//     hematocrit: patient?.hematocrit || "",
//     meanCorpuscularVolume: patient?.meanCorpuscularVolume || "",
//     meanCorpuscularHemoglobin: patient?.meanCorpuscularHemoglobin || "",
//     meanCorpuscularHemoglobinConcentration: patient?.meanCorpuscularHemoglobinConcentration || "",
//   });
  

//   const [isValid, setIsValid] = useState({
//     emailValid: false,
//     phoneValid: false,
//     nameValid: false,
//   });
  

//   // const handleNameChange = (e) => {
//   //   setData({ ...data, username: e.target.value });
//   // };
//   const handleNameChange = (e) => {
//     const updatedFormData = { ...formData, username: e.target.value };
//     setFormData(updatedFormData);
//     setData({ ...data, username: e.target.value });
//   };
//   const handlebloodgroupChange = (e) => {
//     const updatedFormData = { ...formData, bloodgroup: e.target.value };
//     setFormData(updatedFormData);
//     setData({ ...data, bloodgroup: e.target.value });
//   };

//   const handleCollecteddateChange = (e) => {
//     const updatedFormData = { ...formData, collecteddate: e.target.value };
//     setFormData(updatedFormData);
//     setData({ ...data, collecteddate: e.target.value });
//   };


//   const handleHemoGlobinhange = (e) => {
//     const updatedFormData = { ...formData, hemoglobin: e.target.value };
//     setFormData(updatedFormData);
//     setData({ ...data, hemoglobin: e.target.value });
//   };
//   const handlewhiteBloodCellCountChange = (e) => {
//     const updatedFormData = { ...formData, whiteBloodCellCount: e.target.value };
//     setFormData(updatedFormData);
//     setData({ ...data, whiteBloodCellCount: e.target.value });
//   };
//   const handleplateletCountChange = (e) => {
//     const updatedFormData = { ...formData, plateletCount: e.target.value };
//     setFormData(updatedFormData);
//     setData({ ...data, plateletCount: e.target.value });
//   };
//   const handleredBloodCellCountChange = (e) => {
//     const updatedFormData = { ...formData, redBloodCellCount: e.target.value };
//     setFormData(updatedFormData);
//     setData({ ...data, redBloodCellCount: e.target.value });
//   };
//   const handlehematocritChange = (e) => {
//     const updatedFormData = { ...formData, hematocrit: e.target.value };
//     setFormData(updatedFormData);
//     setData({ ...data, hematocrit: e.target.value });
//   };
//   const handlemeanCorpuscularVolumeChange = (e) => {
//     const updatedData = { ...data, meanCorpuscularVolume: e.target.value };
//     setData(updatedData);
//     const updatedFormData = { ...formData, meanCorpuscularVolume: e.target.value };
//     setFormData(updatedFormData);
//   };
//   const handlemeanCorpuscularHemoglobinChange = (e) => {
//     const updatedFormData = { ...formData, meanCorpuscularHemoglobin: e.target.value };
//     setFormData(updatedFormData);
//     setData({ ...data, meanCorpuscularHemoglobin: e.target.value });
//   };
//   const handlemeanCorpuscularHemoglobinConcentrationChange = (e) => {
//     const updatedFormData = { ...formData, meanCorpuscularHemoglobinConcentration: e.target.value };
//     setFormData(updatedFormData);
//     setData({ ...data, meanCorpuscularHemoglobinConcentration: e.target.value });
//   };
  

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("jj");
//     let formData = new URLSearchParams();;
//     formData.append("username", data.username);
//     formData.append("bloodgroup", data.bloodgroup);
//     formData.append("collecteddate", data.collecteddate);
//     formData.append("hemoglobin", data.hemoglobin);
//     formData.append("whiteBloodCellCount", data.whiteBloodCellCount);
//     formData.append("plateletCount", data.plateletCount);
//     formData.append("redBloodCellCount", data.redBloodCellCount);
//     formData.append("hematocrit", data.hematocrit);
//     formData.append("meanCorpuscularVolume", data.meanCorpuscularVolume);
//     formData.append("meanCorpuscularHemoglobin", data.meanCorpuscularHemoglobin);
//     formData.append("meanCorpuscularHemoglobinConcentration", data.meanCorpuscularHemoglobinConcentration);

//     const config = {
//       headers: { 
//         "Content-Type": "application/x-www-form-urlencoded",
//         auth: localStorage.getItem("access_token") },
//     };
//     axios
//       .put(
//         `http://localhost:5000/api/hbms/add_bloodtest/${data.id}`,
//         formData,
//         config
//       )
//       .then((res) => {
//         console.log(res);
//         if (res.status === 200) {
//           onClose();
//           setData({
//             username: "",
//             bloodgroup: "",
//             collecteddate: "",
//             hemoglobin: "",
//             whiteBloodCellCount: "",
//             plateletCount: "",
//             redBloodCellCount: "",
//             hematocrit: "",
//             meanCorpuscularVolume: "",
//             meanCorpuscularHemoglobin: "",
//             meanCorpuscularHemoglobinConcentration: "",
//           });
//           // setData("");
//           // setData("");
//           // setData("");
//           // setData("");
//           // setData("");
//           // setData("");
//           // setData("");
//           // setData("");
//           // setData("");
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
//                   // name="username"
//                   onChange={handleNameChange}
//                   required
//                 />
//               </Label>
//             </div>
//             <div className="col-md-6">
//               <Label>
//                 BloodGroup:
//                 <input
//                   type="text"
//                   value={data.bloodgroup}
//                   name="bloodgroup"
//                   onChange={handlebloodgroupChange}
//                   required
//                 />
//               </Label>
//             </div>
//           </div>
//           <div className="row">
//            <div className="col-md-6" >
//               <Label>
//               Collecteddate:
//                 <input
//                   type="text"
//                   value={data.collecteddate}
//                   required
//                   onChange={handleCollecteddateChange}
//                 />
//               </Label>
//             </div>
//             <div className="col-md-6">
//               <Label>
//               Hemoglobin:
//                 <input
//                   type="text"
//                   value={data.hemoglobin}
//                   onChange={handleHemoGlobinhange}
//                   required
//                 />
//               </Label>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-6">
//               <Label>
//               WhiteBloodCellCount:
//                 <input
//                   type="text"
//                   value={data.whiteBloodCellCount}
//                   required
//                   onChange={handlewhiteBloodCellCountChange}
//                 />
//               </Label>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-12">
//             <Label>
//             PlateletCount:
//                 <input
//                   type="text"
//                   value={data.plateletCount}
//                   required
//                   onChange={handleplateletCountChange}
//                 />
//               </Label>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-6">
//               <Label>
//               RedBloodCellCount:
//                 <input
//                   type="text"
//                   value={data.redBloodCellCount}
//                   name="redBloodCellCount"
//                   onChange={handleredBloodCellCountChange}
//                   required
//                 />
//               </Label>
//             </div>
//             <div className="col-md-6">
//               <Label>
//               Hematocrit:
//                 <input
//                   type="text"
//                   value={data.hematocrit}
//                   name="hematocrit"
//                   onChange={handlehematocritChange}
//                   required
//                 />
//               </Label>
//             </div>
//           </div>
//           <div className="row">
//            <div className="col-md-6" >
//               <Label>
//               MeanCorpuscularVolume:
//                 <input
//                   type="text"
//                   value={data.meanCorpuscularVolume}
//                   required
//                   onChange={handlemeanCorpuscularVolumeChange}
//                 />
//               </Label>
//             </div>
//             <div className="col-md-6">
//               <Label>
//               MeanCorpuscularHemoglobin:
//                 <input
//                   type="text"
//                   value={data.meanCorpuscularHemoglobin}
//                   onChange={handlemeanCorpuscularHemoglobinChange}
//                   required
//                 />
//               </Label>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-6">
//               <Label>
//               MeanCorpuscularHemoglobinConcentration:
//                 <input
//                   type="text"
//                   value={data.meanCorpuscularHemoglobinConcentration}
//                   required
//                   onChange={handlemeanCorpuscularHemoglobinConcentrationChange}
//                 />
//               </Label>
//             </div>
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
// export default PatientDetails;


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

  const handleClose = () => {
    onClose();
  };

  const handleFormChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // const handleFormSubmit = async () => {
  //   try {
  //     await axios.put(`http://localhost:5000/api/hbms/add_bloodtest/${patient.id}`, formData);
  //     // Handle success or show a notification
  //     console.log("succes");
  //     handleClose();
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //     // Handle error or show a notification
  //   }
  // };
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
        />
        <TextField
          label="Bloodgroup"
          value={formData.bloodgroup}
          onChange={(e) => handleFormChange("bloodgroup", e.target.value)}
          fullWidth
        />
        <TextField
          label="Collecteddate"
          value={formData.collecteddate}
          onChange={(e) => handleFormChange("collecteddate", e.target.value)}
          fullWidth
        />
         <TextField
          label="FastingBloodSugar"
          value={formData.fastingBloodSugar}
          onChange={(e) => handleFormChange("fastingBloodSugar", e.target.value)}
          fullWidth
        />
         <TextField
          label="PostPrandialBloodSugar"
          value={formData.postPrandialBloodSugar}
          onChange={(e) => handleFormChange("postPrandialBloodSugar", e.target.value)}
          fullWidth
        />
         <TextField
          label="RandomBloodSugar"
          value={formData.randomBloodSugar}
          onChange={(e) => handleFormChange("randomBloodSugar", e.target.value)}
          fullWidth
        />
        <TextField
          label="Hba1c"
          value={formData.hba1c}
          onChange={(e) => handleFormChange("hba1c", e.target.value)}
          fullWidth
        />
        <TextField
          label="OralGlucoseToleranceTest"
          value={formData.oralGlucoseToleranceTest}
          onChange={(e) => handleFormChange("oralGlucoseToleranceTest", e.target.value)}
          fullWidth
        />
        <TextField
          label="Fructosamine"
          value={formData.fructosamine}
          onChange={(e) => handleFormChange("fructosamine", e.target.value)}
          fullWidth
        />
        <TextField
          label="CPeptideTest"
          value={formData.cPeptideTest}
          onChange={(e) => handleFormChange("cPeptideTest", e.target.value)}
          fullWidth
        />
        <TextField
          label="InsulinLevel"
          value={formData.insulinLevel}
          onChange={(e) => handleFormChange("insulinLevel", e.target.value)}
          fullWidth
        />
        <TextField
          label="UrineKetones"
          value={formData.urineKetones}
          onChange={(e) => handleFormChange("urineKetones", e.target.value)}
          fullWidth
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
