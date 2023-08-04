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
const imageMimeType = /image\/(jpg|jpeg)/i;


function EditIntern({
  editModal,
  handleEdit,
  onClose,
  data,
  setData,
  intern,
}) {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });

  const [isValid, setIsValid] = useState({
    emailValid: false,
    PhoneValid: false,
  });

  const handleNameChange = (e) => {
    const updatedFormData = { ...formData,name: e.target.value };
    setFormData(updatedFormData);
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

  const handledateofbirthChange = (e) => {
    const updatedFormData = { ...formData, dateofbirth: e.target.value };
    setFormData(updatedFormData);
    setData({ ...data, dateofbirth: e.target.value });
  };

  
  const handleGenderChange = (e) => {
    const updatedData = { ...data, gender: e.target.value };
    const updatedFormData = { ...formData, gender: e.target.value };
    setData(updatedData);
    setFormData(updatedFormData);
  };

  const handleAddressChange = (e) => {
    const updatedData = { ...data, address: e.target.value };
    const updatedFormData = { ...formData, address: e.target.value };
    setData(updatedData);
    setFormData(updatedFormData);
  };

  const handlestatusChange = (e) => {
    const updatedData = { ...data, status: e.target.value };
    const updatedFormData = { ...formData, status: e.target.value };
    setData(updatedData);
    setFormData(updatedFormData);
  };
  
  const handledepartmentChange = (e) => {
    const updatedData = { ...data, department: e.target.value };
    const updatedFormData = { ...formData, department: e.target.value };
    setData(updatedData);
    setFormData(updatedFormData);
  };

  const handlestartdateChange = (e) => {
    const updatedData = { ...data, startdate: e.target.value };
    const updatedFormData = { ...formData, startdate: e.target.value };
    setData(updatedData);
    setFormData(updatedFormData);
  };

  const handleenddateChange = (e) => {
    const updatedData = { ...data, enddate: e.target.value };
    const updatedFormData = { ...formData, enddate: e.target.value };
    setData(updatedData);
    setFormData(updatedFormData);
  };
  
  const handleeducationChange = (e) => {
    const updatedData = { ...data, educationalinstitution: e.target.value };
    const updatedFormData = { ...formData, educationalinstitution: e.target.value };
    setData(updatedData);
    setFormData(updatedFormData);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("jj");
    const formData = new URLSearchParams();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("dateofbirth", data.dateofbirth);
    formData.append("address", data.address);
    formData.append("educationalinstitution", data.educationalinstitution);
    formData.append("startdate", data.startdate);
    formData.append("enddate", data.enddate);
    formData.append("status", data.status);

    const config = {
      "Content-Type": "application/x-www-form-urlencoded",
      headers: { auth: localStorage.getItem("access_token") },
    };
    axios
      .put(
        `http://localhost:5000/api/hbms/update_intern/${data.id}`,
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
            dateofbirth: "",
            address: "",
            educationalinstitution: "",
            startdate: "",
            enddate: "",
            status: "",
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
    <Modal isOpen={editModal} toggle={handleEdit} centered className="modal-right">
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
                DOB:
                <input
                  type="text"
                  value={data.dateofbirth}
                  required
                  onChange={handledateofbirthChange}
                />
              </Label>
            </div>
            <div className="col-md-6">
              <Label>
                Address:
                <input
                  type="text"
                  value={data.address}
                  onChange={handleAddressChange}
                  required
                />
              </Label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Label>
                EducationInstitution:
                <input
                  type="text"
                  value={data.educationalinstitution}
                  required
                  onChange={handleeducationChange}
                />
              </Label>
            </div>
            <div className="col-md-6">
              <Label>
                StartDate:
                <input
                  type="text"
                  value={data.startdate}
                  onChange={handlestartdateChange}
                  required
                />
              </Label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Label>
                EndDate:
                <input
                  type="text"
                  value={data.enddate}
                  required
                  onChange={handleenddateChange}
                />
              </Label>
            </div>
          </div>
          <div className="row">
          <div className="col-md-6">
              <Label>
                Status:
                <input
                  type="text"
                  value={data.status}
                  onChange={handlestatusChange}
                  required
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
export default EditIntern;
