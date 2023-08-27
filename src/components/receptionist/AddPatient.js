import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Label,
} from "reactstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddModal({ modal, toggle, onClose, data, setData }) {
  const [isname, setIsname] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isGender, setIsGender] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isAge, setIsAge] = useState("");
  const [isBloodGroup, setIsBloodGroup] = useState("");
  const [isChiefcomplaint, setIsChiefcomplaint] = useState("");
  const [isTimeofregistration, setIsTimeofregistration] = useState("");
  const [isDepartment,setIsDepartment]=useState("");
  const [isBloodpressure, setIsBloodpressure] = useState("");
  const [isSugarlevel, setIsSugarlevel] = useState("");
  const [isAddress, setIsAddress] = useState("");
  const [isMessage, setIsMessage] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [role, setRole] = useState("Doctor");

  const header = {
    headers: {
      auth: localStorage.getItem("access_token"),
    },
  };

  const handleUsernameChange = (e) => {
    setIsname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setIsEmail(e.target.value);
  };

  const handlePhoneChange = (value) => {
    setIsPhone(value);
  };

  const handleGenderChange = (e) => {
    setIsGender(e.target.value);
  };

  const handleChiefcomplaintChange = (e) => {
    setIsChiefcomplaint(e.target.value);
  };

  const handleAgeChange = (e) => {
    setIsAge(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setIsDepartment(e.target.value);
  };

  const handleTimeofregistrationChange = (e) => {
    setIsTimeofregistration(e.target.value);
  };

  const handleSugarlevelChange = (e) => {
    setIsSugarlevel(e.target.value);
  };

  const handleBloodpressureChange = (e) => {
    setIsBloodpressure(e.target.value);
  };

  const handleAddressChange = (e) => {
    setIsAddress(e.target.value);
  };
  const handleMessageChange = (e) => {
    setIsMessage(e.target.value);
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctorId(e.target.value);
    setSelectedDoctorName(e.target.options[e.target.selectedIndex].text);
  };

  // Fetch the list of doctors when the component mounts
  const fetchDoctors = () => {
    if (role === "Doctor") {
      axios
        .get("http://localhost:5000/api/hbms/list_doctor", header)
        .then((response) => {
          console.log("API Response:", response.data);
          // setDoctors(response.data.map((doctor) => doctor.username));
          setDoctors(response.data);
        })
        .catch((error) => console.error(error));
    }
  };

  const departmentOptions = [
    "General",
    "Pediatrics",
    "Orthopedics",
    "Dermatology",
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(selectedDoctorId, selectedDoctorName);

    const requestData = {
      name: isname,
      email: isEmail,
      phone: isPhone,
      gender: isGender,
      age: isAge,
      chiefcomplaint: isChiefcomplaint,
      // bloodgroup: isBloodGroup,
      timeofregistration: isTimeofregistration,
      // sugarlevel: isSugarlevel,
      // bloodpressure: isBloodpressure,
      // message: isMessage,
      address: isAddress,
      doctorId: selectedDoctorId,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        auth: localStorage.getItem("access_token"),
      },
    };

    axios
      .post("http://localhost:5000/api/hbms/add_patient", requestData, config)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          onClose();
          setIsname("");
          setIsEmail("");
          setIsPhone("");
          setIsGender("");
          setIsAge("");
          setIsChiefcomplaint("");
          setIsDepartment("");
          // setIsBloodGroup("");
          setIsTimeofregistration("");
          // setIsSugarlevel("");
          // setIsBloodpressure("");
          // setIsMessage("");
          setIsAddress("");
          setSelectedDoctorId("");
          setSelectedDoctorName("");
          toast.success("Item added successfully!");
        } else {
          toast.error("Failed to add item.");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error occurred.");
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
                Name:
                <input
                  type="text"
                  placeholder="Enter the Name"
                  value={isname}
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
                  placeholder="Enter the Email"
                  value={isEmail}
                  required
                  onChange={handleEmailChange}
                />
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>
                Gender:
                <input
                  type="text"
                  placeholder="Enter the Gender"
                  value={isGender}
                  required
                  onChange={handleGenderChange}
                />
              </Label>
            </Col>
            <Col md={6}>
              <Label>
                Phone:
                <PhoneInput
                  inputClass="form-control"
                  inputStyle={{
                    width: "200px",
                  }}
                  international
                  defaultCountry="IN"
                  value={isPhone}
                  onChange={handlePhoneChange}
                  required
                />
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>
                Age:
                <input
                  type="text"
                  placeholder="Enter the Age"
                  value={isAge}
                  onChange={handleAgeChange}
                  required
                />
              </Label>
            </Col>
            <Col md={6}>
              <Label>
                Address:
                <input
                  type="text"
                  placeholder="Enter the Address"
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
                Chief Complaint:
                <input
                  type="text"
                  placeholder="Enter the chief complaint"
                  value={isChiefcomplaint}
                  onChange={handleChiefcomplaintChange}
                  required
                />
              </Label>
            </Col>
            <Col md={6}>
              <Label>
                Time of Registration:
                <input
                  type="text"
                  placeholder="Enter the Time"
                  value={isTimeofregistration}
                  onChange={handleTimeofregistrationChange}
                  required
                />
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>
                Department:
                <input
                  type="text"
                  placeholder="Enter the Department"
                  value={isDepartment}
                  onChange={handleDepartmentChange}
                  required
                />
              </Label>
            </Col>
          <Col md={6}>
            <Label>
              Doctor:
              <div>
                <select
                  value={selectedDoctorId}
                  onChange={handleDoctorChange}
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((username, index) => {
                    return (
                      <option key={index} value={username.id}>
                        {username.username}
                      </option>
                    );
                  })}
                </select>
              </div>
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
        </ModalFooter>
      </form>
      <ToastContainer />
    </Modal>
  );
}

export default AddModal;