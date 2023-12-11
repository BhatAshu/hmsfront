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
// import "./style.css";
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginUser = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isEmail, setisEmail] = useState("");
  const [isPassword, setisPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleEmailChange = (e) => {
    setisEmail(e.target.value);
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
      email: isEmail,
      password: isPassword,
    };

    axios
      .post("http://localhost:5000/api/hbms/log_user", data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          const loginData = { firstname: res.data.firstname };
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("loginDataID", res.data.user_id);
          localStorage.setItem("loginDataU", res.data.username);
          localStorage.setItem("loginDataL", res.data.lastname);
          localStorage.setItem("loginDataE", res.data.email);
          localStorage.setItem("loginDataP", res.data.phone);
          localStorage.setItem("loginDataG", res.data.gender);
          localStorage.setItem("loginDataB", res.data.bloodgroup);
          const registrationComplete = localStorage.getItem(
            "registrationComplete"
          );
          if (registrationComplete === "true") {
            navigate("/patientform");
          } else {
            navigate("/home");
          }
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
          <Typography component="h1" variant="h5" gutterBottom>
            Sign in
          </Typography>
          {!showForgotPasswordForm ? (
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="outlined-basic"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={isEmail}
                onChange={handleEmailChange}
                autoFocus
              />
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
                    href="/signup"
                    variant="body2"

                    // onClick={handleForgotPasswordClick}
                  >
                    Don't have an account?{" "}
                    <span style={{ fontWeight: "bold" }}>Sign Up</span>
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

export default LoginUser;
