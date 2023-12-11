import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Link,
  Grid,
  Typography,
  makeStyles,
  Container,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ForgetPasswordForm from "./ResetPassword";
import "./menu.css";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage:
      'url("https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"), linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))',
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  field: {
    height: '3.6rem', // Set the desired height for all fields
  },
  
}));

const Signup = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isUsername, setisUsername] = useState("");
  const [isEmail, setisEmail] = useState("");
  const [isPhone, setisPhone] = useState("");
  const [isGender, setisGender] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [isBloodgroup, setisBloodgroup] = useState("");
  const [isPassword, setisPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  const handleFirstnameChange = (e) => {
    setisUsername(e.target.value);
  };
  const [isValid, setisValid] = useState({
    emailValid: false,
    passwordValid: false,
  });
  const handleEmailChange = (e) => {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)) {
      setisValid({ ...isValid, emailValid: true });
    } else {
      setisValid({ ...isValid, emailValid: false });
    }
    setisEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setisPhone(e.target.value);
  };

  const handleGenderChange = (selectedOption) => {
    setSelectedGender(selectedOption);
  };

  const handleBloodgroupChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedBloodGroup(selectedOption);
    } else {
      setSelectedBloodGroup(null); // Handle the case where selectedOption is undefined
    }
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

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };
  const handleForgotPasswordClick = () => {
    setShowForgotPasswordForm(true);
  };

  const handleForgotPasswordEmailChange = (e) => {
    setForgotPasswordEmail(e.target.value);
  };
  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
  ];

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: isUsername,
      email: isEmail,
      phone: isPhone,
      gender: selectedGender?.value || "",
      bloodgroup: selectedBloodGroup?.value || "",
      password: isPassword,
    };

    axios
      .post("http://localhost:5000/api/hbms/sign_up", data)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          navigate("/loginuser");
        } else {
          console.log(res.data);
          toast.success(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.container}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {!showForgotPasswordForm ? (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Name"
                  name="username"
                  autoComplete="username"
                  value={isUsername}
                  onChange={handleFirstnameChange}
                  autoFocus
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={isEmail}
                    onChange={handleEmailChange}
                    autoFocus
                  />
                  {isEmail && !isValid.emailValid && (
                    <p>Please Enter a valid Email</p>
                  )}
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <PhoneInput
                    country={"in"} // Set the default country (e.g., United States)
                    value={isPhone}
                    onChange={(phone) => setisPhone(phone)} // Handle phone number changes
                    inputStyle={{
                      width: "100%",
                      height: "3.6rem",
                      fontSize: "1rem",
                      padding: "0.5rem",
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Select
                    options={genderOptions}
                    isSearchable={true}
                    value={selectedGender}
                    onChange={handleGenderChange}
                    components={makeAnimated()}
                    className={classes.field}
                    placeholder="Select Gender"
                    inputStyle={{
                      width: "100%",
                      height: "3.6rem",
                      fontSize: "1rem",
                      padding: "0.5rem",
                    }}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: "white", 
                        opacity: 1, 
                        zIndex: 1, 
                      }),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    options={bloodGroupOptions}
                    isSearchable={true}
                    value={selectedBloodGroup}
                    onChange={handleBloodgroupChange}
                    components={makeAnimated()}
                    placeholder="Select Blood Group"
                    className={classes.field}
                    inputStyle={{
                      width: "100%",
                      fontSize: "1rem",
                      padding: "0.5rem",
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={isPassword}
                  onChange={handlePasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleShowPasswordClick}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {isPassword && !isValid.passwordValid && (
                  <p>
                    Please Enter a minimum eight-character, at least one letter,
                    one number, and one special character
                  </p>
                )}
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/loginuser" variant="body2">
                    Already a user?{" "}
                    <span style={{ fontWeight: "bold" }}>LOGIN</span>
                  </Link>
                </Grid>
              </Grid>
            </form>
          ) : (
            <ForgetPasswordForm
              forgotPasswordEmail={forgotPasswordEmail}
              onEmailChange={handleForgotPasswordEmailChange}
              onForgotPasswordSubmit={handleForgotPasswordSubmit}
              onCancel={() => setShowForgotPasswordForm(false)}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Signup;
