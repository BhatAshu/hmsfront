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
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddBirth.css";
import "react-datepicker/dist/react-datepicker.css";
import { isDate } from "date-fns";

function EditModal({
  editModal,
  handleEdit,
  onClose,
  data,
  setData,
  existingImage,
}) {
  const handleNameChange = (e) => {
    const updatedData = { ...data, name: e.target.value };
    setData(updatedData);
  };

  const handleEmailChange = (e) => {
    const updatedData = { ...data, email: e.target.value };
    setData(updatedData);
  };

  const handlePhoneChange = (e) => {
    const updatedData = { ...data, phone: e.target.value };
    setData(updatedData);
  };

  const handleGenderChange = (e) => {
    const updatedData = { ...data, gender: e.target.value };
    setData(updatedData);
  };

  const handleAgeChange = (e) => {
    const updatedData = { ...data, age: e.target.value };
    setData(updatedData);
  };

  const handleBloodGroupChange = (e) => {
    const updatedData = { ...data, bloodgroup: e.target.value };
    setData(updatedData);
  };

  const handleNoofBagsChange = (e) => {
    const updatedData = { ...data, noofbags: e.target.value };
    setData(updatedData);
  };

  const handleDateChange = (e) => {
    const updatedData = { ...data, date: e.target.value };
    setData(updatedData);
  };

  const handleAddressChange = (e) => {
    const updatedData = { ...data, address: e.target.value };
    setData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("age", data.age);
    formData.append("bloodgroup", data.bloodgroup);
    formData.append("noofbags", data.noofbags);
    formData.append("date", data.date);
    formData.append("address", data.address);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: localStorage.getItem("access_token"),
      },
    };

    axios
      .put(
        `http://localhost:5000/api/hbms/update_blood/${data.id}`,
        formData,
        config
      )
      .then((res) => {
        if (res.status === 200) {
          onClose();
          setData({
            name: "",
            email: "",
            phone: "",
            gender: "",
            age: "",
            bloodgroup: "",
            noofbags: "",
            date: "",
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
    <Modal isOpen={editModal} toggle={handleEdit} centered>
      <ModalHeader toggle={handleEdit}>Edit Staff</ModalHeader>
      <form className="container" onSubmit={handleSubmit}>
        <ModalBody>
          <Label>
            Name:
            <input
              type="text"
              value={data.name}
              onChange={handleNameChange}
              required
            />
          </Label>
          <Label>
            Email:
            <input
              type="text"
              value={data.email}
              required
              onChange={handleEmailChange}
            />
          </Label>
          <Label>
            Phone:
            <input
              type="text"
              value={data.phone}
              required
              onChange={handlePhoneChange}
            />
          </Label>
          <Label>
            Gender:
            <input
              type="text"
              value={data.gender}
              required
              onChange={handleGenderChange}
            />
          </Label>
          <Label>
            Age:
            <input
              type="text"
              value={data.age}
              onChange={handleAgeChange}
              required
            />
          </Label>
          <Label>
            BloodGroup:
            <input
              type="text"
              value={data.bloodgroup}
              required
              onChange={handleBloodGroupChange}
            />
          </Label>
          <Label>
            No of Bags:
            <input
              type="text"
              value={data.noofbags}
              onChange={handleNoofBagsChange}
              required
            />
          </Label>
          <Label>
            Date:
            <input
              type="text"
              value={data.date}
              onChange={handleDateChange}
              required
            />
          </Label>
          <Label>
            Address:
            <input
              type="text"
              value={data.address}
              onChange={handleAddressChange}
              required
            />
          </Label>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Submit
          </Button>
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default EditModal;
