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
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { format, isValid } from "date-fns";
import "./AddBirth.css";

function AddDispatchBlood({ modal, toggle, onClose, data, setData }) {
  const [isName, setIsName] = useState("");
  const [isBloodGroup, setIsBloodGroup] = useState("");
  const [isnoofbags, setIsnoofbags] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleNameChange = (e) => {
    setIsName(e.target.value);
  };

  const handleBloodGroupChange = (e) => {
    setIsBloodGroup(e.target.value);
  };

  const handlenofbagsChange = (e) => {
    setIsnoofbags(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = format(selectedDate, "dd-MM-yyyy");
    const formData = new URLSearchParams();
    formData.append("name", isName);
    formData.append("bloodgroup", isBloodGroup);
    formData.append("noofbags", isnoofbags);
    formData.append("date", formattedDate);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: localStorage.getItem("access_token"),
      },
    };

    axios
      .post(
        "http://localhost:5000/api/hbms/add_disptach",
        formData.toString(),
        config
      )
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          onClose();
          setIsName("");
          setIsBloodGroup("");
          setIsnoofbags("");
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
            <Row>
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
            <Col md={6}>
            <Label>
                NoOfBags:
                <input
                  type="text"
                  placeholder="Enter the BloodGroup"
                  value={isnoofbags}
                  required
                  onChange={handlenofbagsChange}
                />
              </Label>
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

export default AddDispatchBlood;
