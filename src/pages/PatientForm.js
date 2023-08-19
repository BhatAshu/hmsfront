import React, { useState } from "react";
import axios from "axios";
import "./PatForm.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PatientForm = () => {
  const navigate = useNavigate();
  // const storedSignupData = JSON.parse(localStorage.getItem("signupData")) || {};
  const loginfirstname = localStorage.getItem("loginDataF");
  const loginlastname = localStorage.getItem("loginDataL");
  const loginemail = localStorage.getItem("loginDataE");
  const loginphone = localStorage.getItem("loginDataP");
  const logingender = localStorage.getItem("loginDataG");
  const loginbloodgroup = localStorage.getItem("loginDataB");
  const [formData, setFormData] = useState({
    username: loginfirstname + " " + loginlastname,
    email: loginemail,
    gender: logingender,
    age: "",
    phone: loginphone,
    dateofbirth: "",
    chiefcomplaint: "",
    bloodgroup: loginbloodgroup,
    date: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/hbms/patient_form",
        formData
      );

      if (response.status === 201) {
        navigate("/home");
      } else {
        console.log(response.data);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error registering patient");
    }
  };

  return (
    <div>
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled
          />
        </label>
        <br />
        {/* <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            disabled
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label> */}
        <label>
          Gender:
          <input
            type="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            disabled
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
            required
          />
        </label>
        <br />
        <label>
          Chief Complaint:
          <input
            type="text"
            name="chiefcomplaint"
            value={formData.chiefcomplaint}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          BloodGroup:
          <input
            type="text"
            name="bloodgroup"
            value={formData.bloodgroup}
            onChange={handleChange}
            required
            disabled
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
            required
          />
        </label>
        <br />
        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default PatientForm;
