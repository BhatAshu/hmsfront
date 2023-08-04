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

  const handleCauseChange = (e) => {
    const updatedData = { ...data, cause: e.target.value };
    setData(updatedData);
  };

  const handleDateChange = (e) => {
    // const updatedData = { ...data, date: new Date(date) };
    const updatedData = { ...data, date: e.target.value };
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
    formData.append("cause", data.cause);
    formData.append("date", data.date);
  
    const config = {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        auth: localStorage.getItem("access_token") },
    };
  
    axios
      .put(
        `http://localhost:5000/api/hbms/update_death/${data.id}`,
        formData,
        config
      )
      .then((res) => {
        if (res.status === 200) {
          onClose();
          setData({
            name: "",
            cause: "",
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
            Cause:
            <input
              type="text"
              value={data.cause}
              onChange={handleCauseChange || ""}
              required
            />
          </Label>
          <Label>
            Date:
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
