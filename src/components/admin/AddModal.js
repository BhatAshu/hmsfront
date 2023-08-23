import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Col,
  Row,
} from "reactstrap";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const imageMimeType = /image\/(jpg|jpeg)/i;

function AddModal({ modal, toggle, onClose, data, setData }) {
  const [isEmail, setIsEmail] = useState("");
  const [isUsername, setIsUsername] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isAddress, setIsAddress] = useState("");
  const [isImage, setIsImage] = useState("");
  const [isRole, setIsRole] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const [message, setIsMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleEmailChange = (e) => {
    setIsEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setIsUsername(e.target.value);
  };

  const handleAddressChange = (e) => {
    setIsAddress(e.target.value);
  };

  const handlePhoneChange = (value) => {
    setIsPhone(value);
  };

  const handleImageChange = (e) => {
    setIsImage(e.target.files[0]);
    const file = e.target.files[0];
    // Preview the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRoleChange = (e) => {
    setIsRole(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setIsPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    let formData = new FormData();
    formData.append("username", isUsername);
    formData.append("email", isEmail);
    formData.append("phone", isPhone);
    formData.append("address", isAddress);
    formData.append("image", isImage);
    formData.append("role", isRole);
    formData.append("password", isPassword);

    const config = {
      headers: { auth: localStorage.getItem("access_token") },
    };

    axios
      .post("http://localhost:5000/api/hbms/add_staff", formData, config)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          onClose();
          setIsUsername("");
          setIsEmail("");
          setIsPhone("");
          setIsAddress("");
          setIsImage(null);
          setIsRole("");
          setIsPassword("");
          setImagePreview(null);

          toast.success("Item added successfully!");
        } else {
          toast.success(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal isOpen={modal} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Adding Staff</ModalHeader>
      <form className="container" onSubmit={handleSubmit}>
      <ModalBody>
          <Row>
            <Col md={6}>
              <Label>
                Username:
                <input
                  type="text"
                  placeholder="Enter the Name"
                  value={isUsername}
                  onChange={handleUsernameChange}
                  required
                />
              </Label>
            </Col>
            <Col md={6}>
              <Label>
                Email:
                <input
                  type="text"
                  placeholder="Enter the email"
                  value={isEmail}
                  required
                  onChange={handleEmailChange}
                />
              </Label>
            </Col>
          </Row>
          <Row >
            <Col md={6}>
              <Label >
                Phone:
                <PhoneInput
                  international
                  defaultCountry="IN" 
                  value={isPhone}
                  onChange={handlePhoneChange}
                  required
                  className="ph1"
                />
              </Label>
            </Col>
            <Col md={6}>
              <Label>
                Address:
                <input
                  type="text"
                  placeholder="Enter the address"
                  value={isAddress}
                  onChange={handleAddressChange}
                  required
                />
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>
                Role:
                <input
                  type="text"
                  placeholder="Enter the role"
                  value={isRole}
                  onChange={handleRoleChange}
                  required
                />
              </Label>
            </Col>
            <Col md={6}>
              <Label>
                Password:
                <input
                  type="password"
                  placeholder="Enter the password"
                  value={isPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>
                Image:
                <input
                  id="exampleFile"
                  name="file"
                  type="file"
                  accept=".jpg, .jpeg"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </Label>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Submit
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </ModalFooter>
      </form>
      <ToastContainer />
    </Modal>
  );
}

export default AddModal;
