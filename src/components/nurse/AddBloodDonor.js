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
import "./AddBirth.css";

function AddBloodDonor({ modal, toggle, onClose, data, setData }) {
  const [isName, setIsName] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isGender, setIsGender] = useState("");
  const [isAge, setIsAge] = useState("");
  const [isBloodGroup, setIsBloodGroup] = useState("");
  const [isNoofBags, setIsNoofBags] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAddress, setIsAddress] = useState("");
  

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

  const handleAgeChange = (e) => {
    setIsAge(e.target.value);
  };

  const handleBloodGroupChange = (e) => {
    setIsBloodGroup(e.target.value);
  };

  const handleNoofBagsChange = (e) => {
    setIsNoofBags(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  
  const handleAddressChange = (e) => {
    setIsAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid(selectedDate)) {
      toast.error("Please select a valid date!");
      return;
    }

    const formattedDate = format(selectedDate, "dd-MM-yyyy");
    const formData = new URLSearchParams();
    formData.append("name", isName);
    formData.append("email", isEmail);
    formData.append("phone", isPhone);
    formData.append("gender", isGender);
    formData.append("age", isAge);
    formData.append("bloodgroup", isBloodGroup);
    formData.append("noofbags", isNoofBags);
    formData.append("date", formattedDate);
    formData.append("address", isAddress);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: localStorage.getItem("access_token"),
      },
    };

    axios
      .post(
        "http://localhost:5000/api/hbms/add_blood",
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
          setIsAge("");
          setIsBloodGroup("");
          setSelectedDate(null);
          setIsAddress("");

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
                BloodGroup:
                <input
                  type="text"
                  placeholder="Enter the BloodGroup"
                  value={isBloodGroup}
                  required
                  onChange={handleBloodGroupChange}
                />
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>
                No of Bags:
                <input
                  type="text"
                  placeholder="Enter the Noof Bags"
                  value={isNoofBags}
                  onChange={handleNoofBagsChange}
                  required
                />
              </Label>
            </Col>
            <Col md={6}>
            <Label>
                Date:
                <div className="date-input-container">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd-MM-yyyy"
                    required
                    className="date-picker-input"
                  />
                  <FaCalendarAlt className="calendar-icon" />
                </div>
              </Label>
            </Col>
          </Row>
          <Row>
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

export default AddBloodDonor;
