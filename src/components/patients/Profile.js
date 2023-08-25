// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import "./style.css";

// function Profile() {
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     try {
//       const token = localStorage.getItem("access_token");
//       const decodedToken = jwt_decode(token);
//       const userId = decodedToken.user_id;

//       const response = await axios.get(`http://localhost:5000/api/hbms/profile_patient//${userId}`, {
//         headers: {
//           auth: token,
//         },
//       });

//       const profileData = response.data.patient; // Access the patient data from the response
//       setProfile(profileData);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Profile</h2>
//       <div className="profile-details">
//         <div className="profile-info">
//           {/* <h2>Patient Profile</h2> */}
//           <p>Firstname: {profile.firstname}</p>
// 		  <p>Lastname: {profile.lastname}</p>
//           <p>Email: {profile.email}</p>
//           <p>Phone: {profile.phone}</p>
//           <p>Gender: {profile.gender}</p>
//           <p>Age: {profile.age}</p>
//           <p>Address: {profile.address}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Container, Paper, Grid, Typography, CircularProgress, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WcIcon from '@material-ui/icons/Wc';
import CakeIcon from '@material-ui/icons/Cake';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  profileContainer: {
    padding: theme.spacing(3),
    maxWidth: '600px',
    width: '100%',
  },
  icon: {
    fontSize: theme.spacing(8),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  field: {
    marginBottom: theme.spacing(2), // Add margin between fields
  },
}));

function Profile() {
  const classes = useStyles();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.user_id;

      const response = await axios.get(`http://localhost:5000/api/hbms/profile_patient//${userId}`, {
        headers: {
          auth: token,
        },
      });

      const profileData = response.data.patient; // Access the patient data from the response
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  if (!profile) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Container className={classes.profileContainer}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <div className={classes.icon}>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            <Paper elevation={3} className={classes.profileDetails}>
              <TextField
                fullWidth
                variant="outlined"
                label="First Name"
                value={profile.firstname}
                InputProps={{
                  startAdornment: <AccountCircleIcon />,
                }}
                disabled
                className={classes.field} 
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Last Name"
                value={profile.lastname}
                InputProps={{
                  startAdornment: <AccountCircleIcon />,
                }}
                disabled
                className={classes.field} 
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                value={profile.email}
                InputProps={{
                  startAdornment: <EmailIcon />,
                }}
                disabled
                className={classes.field} 
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Phone"
                value={profile.phone}
                InputProps={{
                  startAdornment: <PhoneIcon />,
                }}
                disabled
                className={classes.field} 
              />
              <Divider className={classes.divider} />
              <TextField
                fullWidth
                variant="outlined"
                label="Gender"
                value={profile.gender}
                InputProps={{
                  startAdornment: <WcIcon />,
                }}
                disabled
                className={classes.field} 
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Age"
                value={profile.age}
                InputProps={{
                  startAdornment: <CakeIcon />,
                }}
                disabled
                className={classes.field} 
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Address"
                value={profile.address}
                InputProps={{
                  startAdornment: <LocationOnIcon />,
                }}
                disabled
                className={classes.field} 
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Profile;
