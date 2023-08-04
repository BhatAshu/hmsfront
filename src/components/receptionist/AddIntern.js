import React, { useState } from "react";
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
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { format, isValid } from "date-fns";

function AddIntern({ modal, toggle, onClose, data, setData }) {
  const [isName, setIsName] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isGender, setIsGender] = useState("");
  const [isDOB, setIsDOB] = useState("");
  const [isAddress, setIsAddress] = useState("");
  const [isEducation, setIsEducation] = useState("");
  const [isstartdate, setIsstartdate] = useState("");
  const [isenddate, setIsenddate] = useState("");
  const [isstatus, setIsstaus] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); 
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleNameChange = (e) => {
    setIsName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setIsEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setIsPhone(e.target.value);
  };

  const handleGenderChange = (e) => {
    setIsGender(e.target.value);
  };

  const handleDOBChange = (e) => {
    setIsDOB(e.target.value);
  };

  const handleEducationChange = (e) => {
    setIsEducation(e.target.value);
  };

  const handleStartdateChange = (date) => {
    setSelectedStartDate(date); // Set the selected date for StartDate
  };

  const handleenddateChange = (date) => {
    setSelectedEndDate(date); // Set the selected date for EndDate
  };



  
  const handleAddressChange = (e) => {
    setIsAddress(e.target.value);
  };

  const handlestausChange = (e) => {
    setIsstaus(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid(selectedStartDate) || !isValid(selectedEndDate)) {
        toast.error("Please select valid dates!");
        return;
      }

      const formattedStartDate = format(selectedStartDate, "dd-MM-yyyy");
      const formattedEndDate = format(selectedEndDate, "dd-MM-yyyy");
    const formData = new URLSearchParams();
    formData.append("name", isName);
    formData.append("email", isEmail);
    formData.append("phone", isPhone);
    formData.append("gender", isGender);
    formData.append("dateofbirth", isDOB);
    formData.append("address", isAddress);
    formData.append("educationalinstitution", isEducation);
    formData.append("startdate", formattedStartDate);
    formData.append("enddate", formattedEndDate);
    formData.append("status", isstatus);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: localStorage.getItem("access_token"),
      },
    };

    axios
      .post(
        "http://localhost:5000/api/hbms/add_intern",
        formData.toString(),
        config
      )
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          onClose();
          setIsName("");
          setIsEmail("");
          setIsPhone("");
          setIsGender("");
          setIsDOB("");
          setIsAddress("");
          setIsEducation("");
          setIsstartdate("");
          setIsenddate("");
          setIsstaus("");

          toast.success("Item added successfully!");
        } else {
          toast.success(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CustomDatePicker = React.forwardRef(({ value, onClick }, ref) => (
    <div className="date-picker-container">
      <input
        type="text"
        value={value}
        readOnly
        className="date-picker-input"
        ref={ref}
      />
      <button className="date-picker-icon" onClick={onClick}>
        <FaCalendarAlt />
      </button>
    </div>
  ));

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
                  value={isName}
                  onChange={handleNameChange}
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
                Phone:
                <input
                  type="text"
                  placeholder="Enter the Phone number"
                  value={isPhone}
                  required
                  onChange={handlePhoneChange}
                />
              </Label>
            </Col>
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
          </Row>
          <Row>
            <Col md={6}>
              <Label>
                DOB:
                <input
                  type="text"
                  placeholder="Enter the DOB"
                  value={isDOB}
                  onChange={handleDOBChange}
                  required
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
                  required
                  onChange={handleAddressChange}
                />
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>
                educationalinstitution:
                <input
                  type="text"
                  placeholder="Enter the Education"
                  value={isEducation}
                  onChange={handleEducationChange}
                  required
                />
              </Label>
            </Col>
            <Col md={6}>
            <Label>
                StartDate:
                <DatePicker
                  selected={selectedStartDate}
                  onChange={handleStartdateChange} // Use handleStartdateChange to handle date selection
                  dateFormat="dd-MM-yyyy"
                  required
                  customInput={<CustomDatePicker />}
                />
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
            <Label>
                EndDate:
                <DatePicker
                  selected={selectedEndDate}
                  onChange={handleenddateChange} // Use handleEnddateChange to handle date selection
                  dateFormat="dd-MM-yyyy"
                  required
                  customInput={<CustomDatePicker />}
                />
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>
                status:
                <input
                  type="text"
                  placeholder="Enter the status"
                  value={isstatus}
                  onChange={handlestausChange}
                  required
                />
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

export default AddIntern;
