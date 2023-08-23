import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../admin/style.css"
import { MDBTextArea } from "mdb-react-ui-kit";
const imageMimeType = /image\/(jpg|jpeg)/i;


function EditModal({
  editModal,
  handleEdit,
  onClose,
  data,
  setData,
  existingImage,
}) {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  useEffect(() => {
    if (editModal) {
      setFileDataURL(existingImage ? URL.createObjectURL(existingImage) : null);
    }
  }, [editModal, existingImage]);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });
  

  const [isValid, setIsValid] = useState({
    emailValid: false,
    phoneValid: false,
    nameValid: false,
  });
  

  const handleNameChange = (e) => {
    setData({ ...data, name: e.target.value });
  };
  

  const handleEmailChange = (e) => {
    if (/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(e.target.value)) {
      setIsValid({ ...isValid, emailValid: true });
    } else {
      setIsValid({ ...isValid, emailValid: false });
    }
    setData({ ...data, email: e.target.value });
  };

  const handlePhoneChange = (e) => {
    if (/[0-9^]{10}$/.test(e.target.value)) {
      setIsValid({ ...isValid, PhoneValid: true });
    } else {
      setIsValid({ ...isValid, PhoneValid: false });
    }
    setData({ ...data, phone: e.target.value });
  };

  const handleGenderChange = (e) => {
    const updatedFormData = { ...formData, gender: e.target.value };
    setFormData(updatedFormData);
    setData({ ...data, gender: e.target.value });
  };
  const handleChiefcomplaintChange = (e) => {
    const updatedFormData = { ...formData, chiefcomplaint: e.target.value };
    setFormData(updatedFormData);
    setData({ ...data, chiefcomplaint: e.target.value });
  };
  const handleAgeChange = (e) => {
    const updatedFormData = { ...formData, age: e.target.value };
    setFormData(updatedFormData);
    setData({ ...data, age: e.target.value });
  };
  const handleBloodgroupChange = (e) => {
    const updatedFormData = { ...formData, bloodgroup: e.target.value };
    setFormData(updatedFormData);
    setData({ ...data, bloodgroup: e.target.value });
  };
  const handleTimeChange = (e) => {
    const updatedFormData = { ...formData, timeofregistration: e.target.value };
    setFormData(updatedFormData);
    setData({ ...data, timeofregistration: e.target.value });
  };
  const handleAddressChange = (e) => {
    const updatedData = { ...data, address: e.target.value };
    setData(updatedData);
    const updatedFormData = { ...formData, address: e.target.value };
    setFormData(updatedFormData);
  };
  const handleTextAreaChange = (e) => {
    const updatedFormData = { ...formData, message: e.target.value };
    setFormData(updatedFormData);
    setData({ ...data, message: e.target.value });
  };
  
  const Gender = [
    { label: "Male"},
    { label: "Female"},
    { label: "Other" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("jj");
    let formData = new URLSearchParams();;
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("chiefcomplaint", data.chiefcomplaint);
    formData.append("age", data.age);
    formData.append("bloodgroup", data.bloodgroup);
    formData.append("timeofregistration", data.timeofregistration);
    formData.append("address", data.address);
    formData.append("message", data.message);

    const config = {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        auth: localStorage.getItem("access_token") },
    };
    axios
      .put(
        `http://localhost:5000/api/hbms/update_patient/${data.id}`,
        formData,
        config
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          onClose();
          setData({
            name: "",
            email: "",
            phone: "",
            gender: "",
            chiefcomplaint: "",
            age: "",
            bloodgroup: "",
            timeofregistration: "",
            address: "",
            message: "",
          });
          // setData("");
          // setData("");
          // setData("");
          // setData("");
          // setData("");
          // setData("");
          // setData("");
          // setData("");
          // setData("");
          toast.success("Record is successfully updated");
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      isOpen={editModal}
      toggle={handleEdit}
      centered
      className="modal-right"
    >
      <ModalHeader toggle={handleEdit} onClick={() => onClose()}>
        Updating User
      </ModalHeader>
      <form className="container" onSubmit={handleSubmit}>
        <ModalBody>
          <div className="row">
            <div className="col-md-6">
              <Label>
                Name:
                <input
                  type="text"
                  value={data.username}
                  name="name"
                  onChange={handleNameChange}
                  required
                />
              </Label>
            </div>
            <div className="col-md-6" style={{ marginTop: "25px" }}>
              <Label>
                Gender:
                 {/* <select value={data.gender} onChange={handleGenderChange} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select> */}
                <input
                  type="text"
                  value={data.gender}
                  required
                  onChange={handleGenderChange}
                />
              </Label>
            </div>
          </div>
          <div className="row">
           <div className="col-md-6" >
              <Label>
                Chief Complaint:
                <input
                  type="text"
                  value={data.chiefcomplaint}
                  required
                  onChange={handleChiefcomplaintChange}
                />
              </Label>
            </div>
            <div className="col-md-6">
              <Label>
                Age:
                <input
                  type="text"
                  value={data.age}
                  onChange={handleAgeChange}
                  required
                />
              </Label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Label>
                Blood Group:
                <input
                  type="text"
                  value={data.bloodgroup}
                  required
                  onChange={handleBloodgroupChange}
                />
              </Label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Label>
                Prescribe:
                <MDBTextArea
                  value={data.message}
                  onChange={handleTextAreaChange}
                  labelClass="col-form-label"
                />
              </Label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={() => onClose()}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
export default EditModal;
