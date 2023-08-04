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

function AddPatient({ modal, toggle, onClose, data, setData }) {
  const [isName, setIsName] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isGender, setIsGender] = useState("");
  const [isComplaint, setIsComplaint] = useState("");
  const [isAge, setIsAge] = useState("");
  const [isBloodGroup, setIsBloodGroup] = useState("");
  const [istime, setIsTime] = useState("");
  const [issugar, setIssugar] = useState("");
  const [isbp, setIsbp] = useState("");
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
  const handlecomplaintChange = (e) => {
    setIsComplaint(e.target.value);
  };

  const handleAgeChange = (e) => {
    setIsAge(e.target.value);
  };

  const handleBloodGroupChange = (e) => {
    setIsBloodGroup(e.target.value);
  };

  const handletimeChange = (e) => {
    setIsTime(e.target.value);
  };

  const handlesugarChange = (e) => {
    setIssugar(e.target.value);
  };

  const handlebpChange = (e) => {
    setIsbp(e.target.value);
  };

  
  const handleAddressChange = (e) => {
    setIsAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("name", isName);
    formData.append("email", isEmail);
    formData.append("phone", isPhone);
    formData.append("gender", isGender);
    formData.append("complaint", isComplaint);
    formData.append("age", isAge);
    formData.append("time", istime);
    formData.append("sugarlevel", issugar);
    formData.append("bloodpressure", isbp);
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
          setIsComplaint("");
          setIsAge("");
          setIsBloodGroup("");
          setIsTime("");
          setIssugar("");
          setIsbp("");
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

//   const CustomDatePicker = React.forwardRef(({ value, onClick }, ref) => (
//     <div className="date-picker-container">
//       <input
//         type="text"
//         value={value}
//         readOnly
//         className="date-picker-input"
//         ref={ref}
//       />
//       <button className="date-picker-icon" onClick={onClick}>
//         <FaCalendarAlt />
//       </button>
//     </div>
//   ));

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
                chiefcomplaint:
                <input
                  type="text"
                  placeholder="Enter the chiefcomplaint"
                  value={isComplaint}
                  onChange={handlecomplaintChange}
                  required
                />
              </Label>
            </Col>
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
                 Time of Registration:
                <input
                  type="text"
                  placeholder="Enter the Time"
                  value={istime}
                  onChange={handletimeChange}
                  required
                />
              </Label>
            </Col>
            <Col md={6}>
            <Label>
                SugarLevel:
                <input
                  type="text"
                  placeholder="Enter the sugarlevel"
                  value={issugar}
                  onChange={handlesugarChange}
                  required
                />
              </Label>
            </Col>
          </Row>
          <Row>
          <Col md={6}>
            <Label>
                BloodPressure:
                <input
                  type="text"
                  placeholder="Enter the bloodpressure"
                  value={isbp}
                  onChange={handlesugarChange}
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

export default AddPatient;
