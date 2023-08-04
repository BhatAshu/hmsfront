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

function EditModal({
  editModal,
  handleEdit,
  onClose,
  data,
  setData,
}) {

  const handleNameChange = (e) => {
    const updatedData = { ...data, name: e.target.value };
    setData(updatedData);
  };

  const handleBloodgroupChange = (e) => {
    const updatedData = { ...data, bloodgroup: e.target.value };
    setData(updatedData);
  };

  const handleNoofbgasChange = (e) => {
    const updatedData = { ...data, noofbags: e.target.value };
    setData(updatedData);
  };

  const handleDateChange = (date) => {
    const updatedData = { ...data, date: new Date(date) };
    setData(updatedData);
  };
//   const handleNameChange = (e) => {
//     setData({ ...data, name: e.target.value });
//   };
//   const handleBirthtypeChange = (e) => {
//     setData({ ...data, birthtype: e.target.value });
//   };
//   const handleDoctorChange = (e) => {
//     setData({ ...data, doctor: e.target.value });
//   };
//   const handleDateChange = (e) => {
//     setData({ ...data, date: e.target.value });
//   };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new URLSearchParams();
    formData.append("name", data.name);
    formData.append("bloodgroup", data.bloodgroup);
    formData.append("noofbags", data.noofbags);
    formData.append("date", data.date);
  
    const config = {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        auth: localStorage.getItem("access_token") },
    };
  
    axios
      .put(
        `http://localhost:5000/api/hbms/update_dispatch//${data.id}`,
        formData,
        config
      )
      .then((res) => {
        if (res.status === 200) {
          onClose();
          setData({
            name: "",
            bloodgroup: "",
            noofbags: "",
            date: "",
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
              onChange={handleNameChange || ""}
              required
            />
          </Label>
          <Label>
            Birth Type:
            <input
              type="text"
              value={data.bloodgroup}
              onChange={handleBloodgroupChange || ""}
              required
            />
          </Label>
          <Label>
            Doctor:
            <input
              type="text"
              value={data.noofbags}
              onChange={handleNoofbgasChange || ""}
              required
            />
          </Label>
          <Label>
            Date:
            {/* <DatePicker
              selected={data.date}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy"
              required
            /> */}
             <input
              type="text"
              value={data.date}
              onChange={handleDateChange || ""}
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
