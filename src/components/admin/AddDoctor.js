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
  Input,
} from "reactstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./modal.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const imageMimeType = /image\/(jpg|jpeg)/i;
const styles = `
  .password-input {
    position: relative;
  }

  .password-field {
    padding-right: 35px; /* Adjust as needed to make space for the eye icon */
  }

  .toggle-password {
    position: absolute;
    top: 20%;
    right: 0px; /* Adjust as needed to position the icon */
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
  }`;
function AddModalDoctor({ modal, toggle, onClose, data, setData }) {
  const [isEmail, setisEmail] = useState("");
  const [isUsername, setIsUsername] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isAddress, setIsAddress] = useState("");
  const [isImage, setIsImage] = useState("");
  const [isRole, setIsRole] = useState("");
  const [isSpecialist, setIsSpecialist] = useState("");
  const [isPassword, setisPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setIsMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isImageSizeValid, setIsImageSizeValid] = useState(true);
  const [imageSizeErrorMessage, setImageSizeErrorMessage] = useState("");

  const departmentOptions = [
    "General",
    "Pediatrics",
    "Orthopedics",
    "Dermatology",
  ];
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state
  };
  const [isValid, setisValid] = useState({
    emailValid: false,
    passwordValid: false,
  });
  const handleEmailChange = (e) => {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)) {
      setisValid({ ...isValid, emailValid: true });
    } else {
      setisValid({ ...isValid, emailValid: false });
    }
    setisEmail(e.target.value);
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
    const file = e.target.files[0];

    // Check if the selected image exceeds 2MB
    if (file.size > 2 * 1024 * 1024) {
      setIsImageSizeValid(false);
      setImageSizeErrorMessage("Image size should be 2MB or less.");
      return;
    }

    // Check if the selected image format is valid
    const allowedFormats = [".jpg", ".jpeg", ".heic", ".png"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedFormats.includes(`.${fileExtension}`)) {
      setIsImageSizeValid(false);
      setImageSizeErrorMessage(
        "Invalid image format. Allowed formats: JPEG, HEIC, PNG."
      );
      return;
    }

    setIsImage(file);
    setIsImageSizeValid(true);
    setImageSizeErrorMessage(""); // Clear the error message

    // Preview the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const roleOptions = [
    { value: "Doctor", label: "Doctor" },
    { value: "LabTechnician", label: "Lab Technician" },
    { value: "Receptionist", label: "Receptionist" },
  ];
  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption);
  };

  const handleDepartmentChange = (e) => {
    setIsSpecialist(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (e.target.type === "password") {
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          e.target.value
        )
      ) {
        setisValid({ ...isValid, passwordValid: true });
      } else {
        setisValid({ ...isValid, passwordValid: false });
      }
    }
    setisPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("username", isUsername);
    formData.append("email", isEmail);
    formData.append("phone", isPhone);
    formData.append("address", isAddress);
    formData.append("image", isImage);
    formData.append("role", selectedRole ? selectedRole.value : ""); // Use selectedRole instead of isRole
    formData.append("specialist", isSpecialist);
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
          setisEmail("");
          setIsPhone("");
          setIsAddress("");
          setIsImage(null);
          setIsRole("");
          setisPassword("");
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
                {isEmail && !isValid.emailValid && (
                  <p style={{ fontSize: "13px", color: "red" }}>
                    Please Enter a Valid Email
                  </p>
                )}
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>
                Phone:
                <PhoneInput
                  international
                  country={"in"}
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
                <Select
                  options={roleOptions}
                  isSearchable={true}
                  value={selectedRole}
                  onChange={handleRoleChange}
                  components={makeAnimated()}
                  placeholder="Select Role"
                  inputStyle={{
                    width: "100%",
                    height: "0rem",
                    fontSize: "1rem",
                    padding: "0.5rem",
                  }}
                  required
                />
              </Label>
            </Col>
            <Col md={6}>
              <Label>
                Department:
                <Input
                  type="select"
                  value={isSpecialist}
                  onChange={handleDepartmentChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departmentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Input>
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
            <Label>
                Password:
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter the password"
                    value={isPassword}
                    onChange={handlePasswordChange}
                    required
                    className="password-field" // Apply the CSS class here
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      paddingLeft:"20px",
                      marginTop:"9px",
                      fontSize: "1.3rem", // Adjust the size as needed
                    }}
                  >
                    {showPassword ? "👁️" : "👁️"} {/* Eye icon */}
                  </button>
                </div>
              </Label>
              {isPassword && !isValid.passwordValid && (
                  <p>
                    Please Enter a minimum eight-character, at least one letter,
                    one number, and one special character
                  </p>
                )}
            </Col>
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
                {!isImageSizeValid && (
                  <p style={{ fontSize: "13px", color: "red" }}>
                    {imageSizeErrorMessage}
                  </p>
                )}
                {imagePreview && isImageSizeValid && (
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
      <style>{styles}</style>
    </Modal>
  );
}

export default AddModalDoctor;
