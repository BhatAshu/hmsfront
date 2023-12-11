import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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

      const response = await axios.get(
        `http://localhost:5000/api/hbms/profile/${userId}`,
        {
          headers: {
            auth: token,
          },
        }
      );

      const profileData = response.data.profile;
      setProfile(profileData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleInputChange = (field, value) => {
    // Update the profile state with the new value
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-image">
        {profile.image && (
          <img src={`http://localhost:5000/${profile.image}`} alt="Profile" />
        )}
      </div>
      <div className="profile-details">
        <h2>
          <FontAwesomeIcon icon={faUser} />
          Profile
        </h2>
        <form className="profile-form">
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              style={{ width: "50vw", height: "50px", fontSize: "20px" }}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              value={profile.email}
              onChange={e => handleInputChange('email', e.target.value)}
              style={{ width: "50vw", height: "50px", fontSize: "20px" }} // Adjust these values
            />
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              value={profile.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
              style={{ width: "50vw", height: "50px", fontSize: "20px" }} // Adjust these values
            />
          </div>
          <div className="form-field">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              value={profile.address}
              onChange={e => handleInputChange('address', e.target.value)}
              style={{ width: "50vw", height: "50px", fontSize: "20px" }} // Adjust these values
            />
          </div>
          {/* Add other profile details as needed */}
        </form>
      </div>
    </div>
  );
}

export default Profile;

