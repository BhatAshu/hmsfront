import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser,FaEnvelope } from "react-icons/fa";

const CustomSelect = ({ value, onChange, options }) => {
  return (
    <div className="custom-select-container">
      <select className="custom-select" value={value} onChange={onChange} required>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const Signup = () => {
  const [isEmail, setisEmail] = useState("");
  const [isPassword, setisPassword] = useState("");
  const [isValid, setisValid] = useState({
    emailValid: false,
    passwordValid: false,
  });
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)) {
      setisValid({ ...isValid, emailValid: true });
    } else {
      setisValid({ ...isValid, emailValid: false });
    }
    setisEmail(e.target.value);
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

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    const data = {
      email: isEmail,
      password: isPassword,
      role: selectedRole, 
    };

    axios
      .post("http://localhost:4000/api/user/sign_up", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
            navigate("/login");
          } 
        else{
          toast.success(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
    <div className="login-container">
      <div className="form-column">
        <div className="usericon">
      < FaUser size="30px"/>
      </div>
      <h2>
      Sign-Up
        </h2>
        <form onSubmit={handlesubmit}>
        <div className="form-group">
            <CustomSelect
              value={selectedRole}
              onChange={handleRoleChange}
              options={[
                { value: "", label: "Select role" },
                // { value: "admin", label: "Admin" },
                { value: "Doctor", label: "Doctor" },
                { value: "Nurse", label: "Nurse" },
                { value: "Receptionist", label: "Receptionist" },
              ]}
            />
          </div>
          <div className="form-group">
            <div className="input-icon">
              <FaUser />
              <FaEnvelope />
              <input
                required
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
                className="white-placeholder"
              />
            </div>
            {isEmail && !isValid.emailValid && (
              <p>Please enter a valid email address</p>
            )}
          </div>
          <div className="form-group">
            <input
              required
              type="password"
              id="password"
              placeholder="Enter your password"
              value={isPassword}
              onChange={handlePasswordChange}
              className="white-placeholder"
            />
            {isPassword && !isValid.passwordValid && (
              <p>
                Please enter a minimum of eight characters, at least one
                letter, one number, and one special character.
              </p>
            )}
          </div>
          <button type="submit">Signup</button>
        </form>
        </div>
      </div>
    </div>
  );
};


export default Signup;

