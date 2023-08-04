import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import backgroundImage from "../assets/undraw_medicine_b-1-ol.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "white",
    padding: "0 16px",
    boxSizing: "border-box",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    minWidth: "300px",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  formContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "400px",
    padding: theme.spacing(3),
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: theme.spacing(2),
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
    margin: "175px",
    [theme.breakpoints.down("sm")]: {
      margin: "15px",
      maxWidth: "400px",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "15px",
      maxWidth: "270px",
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "dodgerblue", 
    color:"black",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "black",
    borderRadius: "15px",
    backgroundColor: "lightblue",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "dodgerblue", 
      color:"white",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "300px",
    },
  },
  iconHover: {
    cursor: "pointer",
  },
}));

const Login = () => {
 
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isEmail, setisEmail] = useState("");
  const [isPassword, setisPassword] = useState("");
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setisEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setisPassword(e.target.value);
  };

  const handleChangePasswordClick = () => {
    navigate('/changepassword');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      
      email: isEmail,
      password: isPassword,
    };

    axios
      .post("http://localhost:5000/api/hbms/login_admin", data)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.role === "Admin") {
            navigate("/admin");
            localStorage.setItem("access_token", res.data.access_token);
          } else if (res.data.role === "Doctor") {
            navigate("/doctor");
            localStorage.setItem("access_token", res.data.access_token);
          } else if (res.data.role === "Nurse") {
            navigate("/nurse");
            localStorage.setItem("access_token", res.data.access_token);
          } else if (res.data.role === "Receptionist") {
            navigate("/receptionist");
            localStorage.setItem("access_token", res.data.access_token);
          } else {
            // console.log(data);
            toast.error("Invalid role");
          }
        }
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Unauthorized User");
      });
  };

  return (
    <div className={classes.container}>
      <CssBaseline />
      <div className={classes.imageContainer}>
        <img src={backgroundImage} alt="Background" className={classes.image} />
      </div>
      <div className={classes.formContainer}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ color: "black" }}>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={isEmail}
            onChange={handleEmailChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon style={{ color: "black" }} />
                </InputAdornment>
              ),
            }}
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
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon style={{ color: "black" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <div
                    className={classes.iconHover}
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </div>
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
            Login
          </Button>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
            <Link to="#" variant="body2" onClick={handleChangePasswordClick}>
                Change password
                </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default Login;
