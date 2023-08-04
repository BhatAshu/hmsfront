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
const imageMimeType = /image\/(jpg|jpeg)/i;

function AddBirth({ modal, toggle, onClose, data, setData }) {
  const [isName, setIsName] = useState("");
  const [isBirthtype, setIsBirthType] = useState("");
  const [isDoctor, setIsDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  

  const handleNameChange = (e) => {
    setIsName(e.target.value);
  };

  const handleBirthtypeChange = (e) => {
    setIsBirthType(e.target.value);
  };

  const handleDoctorChange = (e) => {
    setIsDoctor(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
    formData.append("birthtype", isBirthtype);
    formData.append("doctor", isDoctor);
    formData.append("date", formattedDate);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: localStorage.getItem("access_token"),
      },
    };

    axios
      .post(
        "http://localhost:5000/api/hbms/add_birth",
        formData.toString(),
        config
      )
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          onClose();
          setIsName("");
          setIsBirthType("");
          setIsDoctor("");
          setSelectedDate(null);

          toast.success("Item added successfully!");
        } else {
          toast.success(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
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
                Birth Type:
                <input
                  type="text"
                  placeholder="Enter the Birth type"
                  value={isBirthtype}
                  required
                  onChange={handleBirthtypeChange}
                />
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label>
                Doctor:
                <input
                  type="text"
                  placeholder="Enter the Doctor Name"
                  value={isDoctor}
                  required
                  onChange={handleDoctorChange}
                />
              </Label>
            </Col>
            <Col md={6}>
              <Label>
                Date:
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  required
                  customInput={<CustomDatePicker />}
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

export default AddBirth;
