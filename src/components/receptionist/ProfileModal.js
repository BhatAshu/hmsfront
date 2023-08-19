// import React, { useEffect, useState } from 'react';
// import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import "../admin/style.css"

// function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     try {
//       const token = localStorage.getItem("access_token");
//       const decodedToken = jwt_decode(token);
//       const userId = decodedToken.user_id;

//       const response = await axios.get(`http://localhost:5000/api/hbms/profile/${userId}`, {
//         headers: {
//           auth: token,
//         },
//       });

//       const profileData = response.data.profile;
//       setProfile(profileData);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   const handleModalOpen = () => {
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='p1'>
//       <h2> Profile</h2>
//       <div className="profile-details">
//       <div className="profile-image">
//           {profile.image && <img src={`http://localhost:5000/${profile.image}`} alt="Profile" width='200px' height='200px' className='p2' />}
//         </div>
//         <div className="profile-info">
//           <p><strong>Name:</strong> {profile.username}</p>
//           <p><strong>Email:</strong> {profile.email}</p>
//           <p><strong>Address:</strong> {profile.address}</p>
//           <p><strong>Phone:</strong> {profile.phone}</p>
//         </div>
//       </div>
//       <Modal isOpen={modalOpen} toggle={handleModalClose}>
//         <ModalHeader toggle={handleModalClose}>User Profile</ModalHeader>
//         <ModalBody>
//           <div className="modal-profile-details">
//             <div className="profile-image">
//               <img src={profile.image} alt="Profile"/>
//             </div>
//             <div className="profile-info">
//               <p><strong>Name:</strong> {profile.username}</p>
//               <p><strong>Email:</strong> {profile.email}</p>
//               <p><strong>Address:</strong> {profile.address}</p>
//               <p><strong>Phone:</strong> {profile.phone}</p>
//             </div>
//           </div>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// }

// export default Profile;



import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Avatar, Typography, Paper, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const ProfileContainer = styled('div')({
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

function Profile() {
  const [profile, setProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.user_id;

      const response = await axios.get(`http://localhost:5000/api/hbms/profile/${userId}`, {
        headers: {
          auth: token,
        },
      });

      const profileData = response.data.profile;
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <StyledPaper elevation={3}>
        <Avatar alt="Profile" src={`http://localhost:5000/${profile.image}`} sx={{ width: 120, height: 120 }} />
        <Typography variant="h6">Name: {profile.username}</Typography>
        <Typography variant="body1">Email: {profile.email}</Typography>
        <Typography variant="body1">Address: {profile.address}</Typography>
        <Typography variant="body1">Phone: {profile.phone}</Typography>
        {/* <Button onClick={handleModalOpen} variant="contained" color="primary">
          View Full Profile
        </Button> */}
      </StyledPaper>
      <Modal isOpen={modalOpen} toggle={handleModalClose}>
        {/* Rest of your code */}
      </Modal>
    </ProfileContainer>
  );
}

export default Profile;

