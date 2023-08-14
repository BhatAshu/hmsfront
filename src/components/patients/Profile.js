import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import "./style.css";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("access_token");
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <div className="profile-details">
        <div className="profile-info">
          {/* <h2>Patient Profile</h2> */}
          <p>Firstname: {profile.firstname}</p>
		  <p>Lastname: {profile.lastname}</p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
          <p>Gender: {profile.gender}</p>
          <p>Age: {profile.age}</p>
          <p>Address: {profile.address}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;