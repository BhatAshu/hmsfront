import React, { useState } from "react";
import axios from "axios";
import "./PatForm.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import Patient from "../component/admin/Patient";

const PatientForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    gender: "",
    age: "",
    phone: "",
    dateofbirth: "",
    chiefcomplaint: "",
    date: "",
    time: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
	try {
		const response = await axios.post("http://localhost:3000/api/hbms/patient_form", formData);
  
		if (response.status === 201) {
		  // Registration successful, redirect to the patient page
		  navigate("/patient");
		} else {
		  console.log(response.data);
		  toast.success(response.data.message);
		}
	  } catch (error) {
		console.log(error);
		toast.error("Error registering patient");
	  }
	};

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <br />
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
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
          <input type="text" name="chiefcomplaint" value={formData.chiefcomplaint} onChange={handleChange} required />
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
          Time:
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default PatientForm;