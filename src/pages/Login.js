// import React, { useState } from "react";
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   Link,
//   Grid,
//   Typography,
//   InputAdornment,
//   makeStyles,
// } from "@material-ui/core";
// import TextField from '@mui/material/TextField';
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import backgroundImage from "../assets/undraw_medicine_b-1-ol.svg";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// // import "./style.css";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     backgroundColor: "white",
//     padding: "0 16px",
//     boxSizing: "border-box",
//     [theme.breakpoints.down("xs")]: {
//       flexDirection: "column",
//     },
//   },
//   imageContainer: {
//     flex: 1,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: theme.spacing(2),
//     minWidth: "300px",
//   },
//   image: {
//     maxWidth: "100%",
//     maxHeight: "100%",
//   },
//   formContainer: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     maxWidth: "400px",
//     padding: theme.spacing(3),
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//     borderRadius: theme.spacing(2),
//     boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
//     margin: "175px",
//     [theme.breakpoints.down("sm")]: {
//       margin: "15px",
//       maxWidth: "400px",
//     },
//     [theme.breakpoints.down("xs")]: {
//       margin: "15px",
//       maxWidth: "270px",
//     },
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: "dodgerblue",
//     color: "black",
//   },
//   form: {
//     width: "100%",
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//     color: "black",
//     borderRadius: "15px",
//     backgroundColor: "lightblue",
//     transition: "background-color 0.3s ease",
//     "&:hover": {
//       backgroundColor: "dodgerblue",
//       color: "white",
//     },
//     [theme.breakpoints.down("sm")]: {
//       maxWidth: "300px",
//     },
//   },
//   iconHover: {
//     cursor: "pointer",
//   },
// }));

// const Login = () => {
//   const classes = useStyles();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isEmail, setisEmail] = useState("");
//   const [isPassword, setisPassword] = useState("");
//   const navigate = useNavigate();

//   const handleTogglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleEmailChange = (e) => {
//     setisEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setisPassword(e.target.value);
//   };

//   const handleChangePasswordClick = () => {
//     navigate("/changepassword");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = {
//       email: isEmail,
//       password: isPassword,
//     };

//     axios
//       .post("http://localhost:5000/api/hbms/login_admin", data)
//       .then((res) => {
//         if (res.status === 200) {
//           if (res.data.role === "Admin") {
//             navigate("/admin");
//             localStorage.setItem("access_token", res.data.access_token);
//           } else if (res.data.role === "Doctor") {
//             localStorage.setItem("access_token", res.data.access_token);
//             navigate("/doctor");
//           } else if (res.data.role === "Nurse") {
//             localStorage.setItem("access_token", res.data.access_token);
//             navigate("/nurse");
//           } else if (res.data.role === "Receptionist") {
//             localStorage.setItem("access_token", res.data.access_token);
//             navigate("/receptionist");
//           } else if (res.data.role === "LabTechnician") {
//             localStorage.setItem("access_token", res.data.access_token);
//             navigate("/labtech");
//           } else {
//             // console.log(data);
//             toast.error("Invalid role");
//           }
//         }
//       })
//       .catch((err) => {
//         // console.log(err);
//         toast.error("Unauthorized User");
//       });
//   };

//   return (
//     <div className={classes.container}>
//       <CssBaseline />
//       <div className={classes.imageContainer}>
//         <img src={backgroundImage} alt="Background" className={classes.image} />
//       </div>
//       <div className={classes.formContainer}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5" style={{ color: "black" }}>
//           Sign in
//         </Typography>
//         <form className={classes.form} onSubmit={handleSubmit}>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             value={isEmail}
//             onChange={handleEmailChange}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <EmailOutlinedIcon style={{ color: "black" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             id="password"
//             autoComplete="current-password"
//             value={isPassword}
//             onChange={handlePasswordChange}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <LockOutlinedIcon style={{ color: "black" }} />
//                 </InputAdornment>
//               ),
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <div
//                     className={classes.iconHover}
//                     onClick={handleTogglePasswordVisibility}
//                   >
//                     {showPassword ? <Visibility /> : <VisibilityOff />}
//                   </div>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Login
//           </Button>
//           <Grid
//             container
//             spacing={2}
//             justifyContent="center"
//             alignItems="center"
//           >
//             <Grid item>
//               <Link to="#" variant="body2" onClick={handleChangePasswordClick}>
//                 Change password
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ForgetPasswordForm from "./ResetPassword";
import "./style.css";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: 'url("https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"), linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))',
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

const Login = () => {
  const navigate=useNavigate();
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
  }


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
            localStorage.setItem("access_token", res.data.access_token);
            navigate("/doctor");
          } else if (res.data.role === "Nurse") {
            localStorage.setItem("access_token", res.data.access_token);
            navigate("/nurse");
          } else if (res.data.role === "Receptionist") {
            localStorage.setItem("access_token", res.data.access_token);
            navigate("/receptionist");
          } else if (res.data.role === "LabTechnician") {
            localStorage.setItem("access_token", res.data.access_token);
            navigate("/labtech");
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {!showForgotPasswordForm ? (
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
                    href="/changepassword"
                    variant="body2"
                    // onClick={handleForgotPasswordClick}
                  >
                    Change Password
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

export default Login;