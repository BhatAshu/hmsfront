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
import { Select, MenuItem } from "@mui/material";

function EditPatients({
  editModal,
  handleEdit,
  onClose,
  data,
  setData,
  doctors,
}) {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  // const [doctors, setDoctors] = useState([]);

  const [isValid, setIsValid] = useState({
    emailValid: false,
    PhoneValid: false,
  });

  const handleNameChange = (e) => {
    const updatedData = { ...data, username: e.target.value };
    setData(updatedData);
    setFormData({ ...formData, username: e.target.value });
  };

  const handleEmailChange = (e) => {
    const updatedData = { ...data, email: e.target.value };
    setData(updatedData);
    setFormData({ ...formData, email: e.target.value });
    if (/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(e.target.value)) {
      setIsValid({ ...isValid, emailValid: true });
    } else {
      setIsValid({ ...isValid, emailValid: false });
    }
  };

  const handlePhoneChange = (e) => {
    const updatedData = { ...data, phone: e.target.value };
    setData(updatedData);
    setFormData({ ...formData, phone: e.target.value });
    if (/[0-9^]{10}$/.test(e.target.value)) {
      setIsValid({ ...isValid, PhoneValid: true });
    } else {
      setIsValid({ ...isValid, PhoneValid: false });
    }
  };

  const handleGenderChange = (e) => {
    const updatedData = { ...data, gender: e.target.value };
    setData(updatedData);
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleAgeChange = (e) => {
    const updatedData = { ...data, age: e.target.value };
    setData(updatedData);
    setFormData({ ...formData, age: e.target.value });
  };

  const handleDepartmentChange = (e) => {
    const updatedData = { ...data, department: e.target.value };
    setData(updatedData);
    // Remove the line below, as the 'doctor' function is not defined
    // doctor();
  };

  const handlChiefComplaintChange = (e) => {
    const updatedData = { ...data, chiefcomplaint: e.target.value };
    setData(updatedData);
    setFormData({ ...formData, chiefcomplaint: e.target.value });
  };

  const handleTimeChange = (e) => {
    const updatedData = { ...data, timeofregistration: e.target.value }; 
    setData(updatedData);
    setFormData({ ...formData, timeofregistration: e.target.value });
  };

  const handleAddressChange = (e) => {
    const updatedData = { ...data, address: e.target.value }; 
    setData(updatedData);
    setFormData({ ...formData, address: e.target.value });
  };

  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId);
    if (selectedDoctor) {
      const updatedData = {
        ...data,
        doctorId: doctorId,
        doctorName: selectedDoctor.username, 
      };
      setData(updatedData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("jj");
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("age", data.age);
    formData.append("department", data.department);
    formData.append("chiefcomplaint", data.chiefcomplaint);
    formData.append("timeofregistration", data.timeofregistration);
    formData.append("address", data.address);
    formData.append("doctorId", data.doctorId);

    const config = {
      "Content-Type": "application/x-www-form-urlencoded",
      headers: { auth: localStorage.getItem("access_token") },
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
            username: "",
            email: "",
            phone: "",
            gender: "",
            age: "",
            department: "",
            chiefcomplaint: "",
            timeofregistration: "",
            address: "",
            doctorId: "",
            doctorName: "",
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
                  value={data.username}
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
                  require
                  onChange={(value) => setData({ ...data, phone: value })}
                />
              </Label>
            </div>
            <div className="col-md-6">
              <Label>
                Gender:
                <input
                  type="text"
                  value={data.gender}
                  onChange={handleGenderChange}
                  required
                />
              </Label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Label>
                Age:
                <input
                  type="text"
                  value={data.age}
                  required
                  onChange={handleAgeChange}
                />
              </Label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Label>
                ChiefComplaint:
                <input
                  type="text"
                  value={data.chiefcomplaint}
                  required
                  onChange={handlChiefComplaintChange}
                />
              </Label>
            </div>
            <div className="col-md-6">
              <Label>
                Timeofregistration:
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
          <div className="row">
            <Label>
              Doctor:
              <div>
                <Select
                  name="doctor"
                  value={data.doctorId || ''} 
                  onChange={handleDoctorChange}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.username} 
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </Label>
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

export default EditPatients;
