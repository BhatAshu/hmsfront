import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/userprofile");
    } else {
      navigate("/loginuser");
    }
  }, []);
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.user_id;

      const response = await axios.get(`http://localhost:5000/api/hbms/profile_patient/${userId}`, {
        headers: {
          auth: token,
        },
      });

      const profileData = response.data.patient;
      setProfile(profileData);
      setEditedProfile({ ...profileData });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prevEditedProfile => ({
      ...prevEditedProfile,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.put(`http://localhost:3000/api/hbms/update_patient/${profile._id}`, editedProfile, {
        headers: {
          auth: token,
        },
      });

      setProfile({ ...editedProfile });
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  const styles = `
  /* Profile.css */

  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width:100%;
    height:100%;
    background-color: #f5f5f5;
    background-size: cover;
  }
  
  h3 {
    color: #333;
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 13px;
    text-align: center;
    margin-top:10px;
  }
  
  .profile-details {
    flex: 2;
    background-color: white;
    padding: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 50%;
    margin-top: 20px;
  }
  
  h2 {
    color: #333;
    font-size: 30px;
    margin-bottom: 16px;
    text-align: center;
  }
  
  .profile-info label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
    font-size: 23px;
    color: #333;
  }
  
  .profile-info input,
  .profile-info textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }  
  `;

  return (
    <div className="profile-container">
      <Header/>
      <h3><FontAwesomeIcon icon={faUser} />Profile</h3>
      <div className="profile-details">
        <div className="profile-info">
          <label htmlFor="username">Patient Name:</label>
          <input
            type="text"
            id="username"
            value={editedProfile.username}
            disabled
            style={{ width: '35vw' , height: '60px', fontSize: '25px' }} 
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={editedProfile.email}
            disabled
            style={{ width: '35vw' , height: '60px', fontSize: '25px' }} 
          />
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={editedProfile.phone}
            disabled
            style={{ width: '35vw' , height: '60px', fontSize: '25px' }} 
          />
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            value={editedProfile.gender}
            disabled
            style={{ width: '35vw' , height: '60px', fontSize: '25px' }} 
          />
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            value={editedProfile.age}
            disabled
            style={{ width: '35vw' , height: '60px', fontSize: '25px' }} 
          />
          {/* <button onClick={handleSubmit}>Save Changes</button> */}
        </div>
      </div>
      <style>{styles}</style>
    </div>
  );
}

export default Profile;




