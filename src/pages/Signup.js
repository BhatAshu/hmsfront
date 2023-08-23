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
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ForgetPasswordForm from "./ResetPassword";
import "./style.css";
import { useNavigate } from "react-router-dom";

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
}));

const Signup = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isUsername, setisUsername] = useState("");
  const [isEmail, setisEmail] = useState("");
  const [isPhone, setisPhone] = useState("");
  const [isGender, setisGender] = useState("");
  const [isBloodgroup, setisBloodgroup] = useState("");
  const [isPassword, setisPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleFirstnameChange = (e) => {
    setisUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setisEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setisPhone(e.target.value);
  };

  const handleGenderChange = (e) => {
    setisGender(e.target.value);
  };

  const handleBloodgroupChange = (e) => {
    setisBloodgroup(e.target.value);
  };

  const handlePasswordChange = (e) => {
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

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: isUsername,
      email: isEmail,
      phone: isPhone,
      gender: isGender,
      bloodgroup: isBloodgroup,
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
                    label="username"
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
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    value={isPhone}
                    onChange={handlePhoneChange}
                    autoFocus
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="gender"
                    label="Gender"
                    name="gender"
                    autoComplete="gender"
                    value={isGender}
                    onChange={handleGenderChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="bloodgroup"
                    label="Bloodgroup"
                    name="bloodgroup"
                    autoComplete="bloodgroup"
                    value={isBloodgroup}
                    onChange={handleBloodgroupChange}
                    autoFocus
                  />
                </Grid>
              </Grid>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="/loginuser"
                    variant="body2"
                  >
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
