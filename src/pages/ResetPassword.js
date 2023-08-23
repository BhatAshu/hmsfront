import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"; // Import axios
import {
  IconButton,
  InputAdornment,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import { Visibility, VisibilityOff,LockOpen  } from "@material-ui/icons";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./style.css";
import { navigate } from "@reach/router";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordChanged, setConfirmPasswordChanged] = useState(false);
  const [isValid, setisValid] = useState({
    emailValid: false,
    passwordValid: false,
  });



  const handleConfirmPasswordChange = (e) => {
    setConfirmPasswordChanged(true);
    handleChange(e);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      setisValid((prevState) => ({
        ...prevState,
        passwordValid: passwordRegex.test(value),
      }));
    } else if (name === "confirmNewPassword") {
      setConfirmNewPassword(value);
      setConfirmPasswordChanged(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data before submission
    if (newPassword !== confirmNewPassword) {
      toast.error("New Password and Confirm password does not match");
      return;
    }

    // Create a data object with the form values
    const data = {
      email: email,
      oldPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmNewPassword,
    };

    // Make the API request to the backend
    axios
      .post("http://localhost:5000/api/hbms/reset_password", data)
      .then((response) => {
        // setMessage(response.data.message);
        toast.success("Password is Updated");
        navigate("/login");
      })
      .catch((error) => {
        // Handle the error response
        toast.error("Username or email does not match");
      });
  };

  return (
    <div className="fp sea-water-theme"> 
    <div className="fp">
      <form onSubmit={handleSubmit} className="fmp">
      <LockOpen />
      <h2> Reset Password</h2>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              value={currentPassword}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCurrentPassword((prevState) => !prevState)}
                      edge="end"
                    >
                      {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword((prevState) => !prevState)}
                      edge="end"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {newPassword && !isValid.passwordValid && (
            <p style={{ fontSize: '14px', color: 'red', marginTop: '4px' }}>
            Please Enter a minimum eight characters, at least one letter, one number, and one special character
          </p>
          )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={handleChange}
              // onChange={handleConfirmPasswordChange}
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((prevState) => !prevState)}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {confirmPasswordChanged &&newPassword !== confirmNewPassword && (
        <p style={{ fontSize: '14px', color: 'red', marginTop: '4px' }}>Password and Confirm Password do not match.</p>
      )}

          </Grid>
          <Grid item xs={12} className="buttoncp">
            <Button type="submit" variant="contained" color="primary" >
              Change Password
            </Button>
            </Grid>
            <Grid item xs={12} className="buttoncp">
            <Link to="/login" >
                Back to Login
            </Link>
        </Grid>
        </Grid>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
};

export default ResetPassword;
