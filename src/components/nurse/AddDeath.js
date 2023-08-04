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
import "./AddBirth.css";

function AddBirth({ modal, toggle, onClose, data, setData }) {
  const [isName, setIsName] = useState("");
  const [isCause, setIsCause] = useState("");
  const [isDate, setIsDate] = useState(null);

  const handleNameChange = (e) => {
    setIsName(e.target.value);
  };

  const handleCauseChange = (e) => {
    setIsCause(e.target.value);
  };

  const handleDateChange = (date) => {
    setIsDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append("name", isName);
    formData.append("cause", isCause);
    formData.append("date", isDate);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: localStorage.getItem("access_token"),
      },
    };

    axios
      .post(
        "http://localhost:5000/api/hbms/add_death",
        formData.toString(),
        config
      )
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          onClose();
          setIsName("");
          setIsCause("");
          setIsDate(null);

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
          </Row>
          <Row>
            <Col md={6}>
              <Label>
                Cause:
                <input
                  type="text"
                  placeholder="Enter the Cause"
                  value={isCause}
                  required
                  onChange={handleCauseChange}
                />
              </Label>
            </Col>
            <Col md={6}>
              <Label>
                Date:
                <div className="date-input-container">
                  <DatePicker
                    selected={isDate}
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

export default AddBirth;
