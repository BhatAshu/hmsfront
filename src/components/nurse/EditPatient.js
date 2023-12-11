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
// import "../admin/style.css"


function EditModal({
  editModal,
  handleEdit,
  onClose,
  data,
  setData,
}) {
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
  const handleSugarLevelChange = (e) => {
    const updatedFormData = { ...formData, sugarlevel: e.target.value };
    setFormData(updatedFormData);
    setData({ ...data, sugarlevel: e.target.value });
  };
  const handleBloodPressureChange = (e) => {
    const updatedFormData = { ...formData, bloodpressure: e.target.value };
    setFormData(updatedFormData);
    setData({ ...data, bloodpressure: e.target.value });
  };
  const handleTimeChange = (e) => {
    const updatedFormData = { ...formData, timeofregistration: e.target.value };
    setFormData(updatedFormData);
    setData({ ...data, timeofregistration: e.target.value });
  };
  const handleAddressChange = (e) => {
    const updatedFormData = { ...formData, address: e.target.value };
    setFormData(updatedFormData);
    setData({ ...data, address: e.target.value });
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
    formData.append("sugarlevel", data.sugarlevel);
    formData.append("bloodpressure", data.bloodpressure);
    formData.append("address", data.address);

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
            sugarlevel: "",
            bloodpressure: "",
            address: "",
          });
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
                  value={data.name}
                  name="name"
                  onChange={handleNameChange}
                  required
                />
              </Label>
            </div>
            <div className="col-md-6">
              <Label>
                Email:
                <input
                  type="text"
                  value={data.email}
                  required
                  onChange={handleEmailChange}
                />
              </Label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Label>
                Phone:
                <PhoneInput
                  type="number"
                  value={data.phone}
                  required
                  onChange={(value) => setData({ ...data, phone: value })}
                />
              </Label>
            </div>
            <div className="col-md-6" style={{ marginTop: "25px" }}>
              <Label>
                Gender:
                {/* <input
                  type="text"
                  value={data.gender}
                  onChange={handleGenderChange}
                  required
                /> */}
                 <select value={data.gender} onChange={handleGenderChange} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
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
                  onChange={handleBloodgroupChange}
                />
              </Label>
            </div>
            <div className="col-md-6">
              <Label>
                Time of Registraion:
                <input
                  type="text"
                  value={data.timeofregistration}
                  onChange={handleTimeChange}
                  required
                />
              </Label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Label>
                Sugar Level:
                <input
                  type="text"
                  value={data.sugarlevel}
                  onChange={handleSugarLevelChange}
                />
              </Label>
            </div>
            <div className="col-md-6">
              <Label>
                BloodPressure:
                <input
                  type="text"
                  value={data.bloodpressure}
                  onChange={handleBloodPressureChange}
                />
              </Label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Label>
                Address:
                <input
                  type="text"
                  value={data.address}
                  required
                  onChange={handleAddressChange}
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
