import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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

  const handleInputChange = (field, value) => {
    // Update the profile state with the new value
    setProfile(prevProfile => ({
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
        {profile.image && <img src={`http://localhost:5000/${profile.image}`} alt="Profile" />}
      </div>
      <div className="profile-details">
        <h2><FontAwesomeIcon icon={faUser} />Profile</h2>
        <form className="profile-form">
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              value={profile.username}
              // onChange={e => handleInputChange('username', e.target.value)}
              style={{ width: '50vw', height: '50px', fontSize: '20px' }} // Adjust these values
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              value={profile.email}
              // onChange={e => handleInputChange('email', e.target.value)}
              style={{ width: '50vw' , height: '50px', fontSize: '20px' }} // Adjust these values
            />
          </div>
         
          <div className="form-field">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              value={profile.phone}
              // onChange={e => handleInputChange('phone', e.target.value)}
              style={{ width: '50vw', height: '50px', fontSize: '20px' }} // Adjust these values
            />
          </div>
          <div className="form-field">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              value={profile.address}
              // onChange={e => handleInputChange('address', e.target.value)}
              style={{  width: '50vw' , height: '50px', fontSize: '20px' }} // Adjust these values
            />
          </div>
          {/* Add other profile details as needed */}
        </form>
      </div>
    </div>
  );
}

export default Profile;

// Inline CSS styles
const styles = `
  .profile-container {
    display: flex;
    align-items: stretch;
    padding: 20px;
    width: 100%;
    height: 100%;
  }

  .profile-image {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }

  .profile-image img {
    max-width: 100%;
    border-radius: 50%;
    margin-bottom: 170%;
  }

  .profile-details {
    flex: 2;
    background-color: white;
    padding: 50px;
    padding-right: 30%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .profile-details h2 {
    margin-top: 0;
    padding-left: 10px;
  }

  .form-field {
    margin-bottom: 20px;
    font-size: 18px;
  }

  .form-field label {
    font-weight: bold;
    font-size: 18px;
  }

  
  
  @media (max-width: 1100px) {
    .profile-container {
      flex-direction: column;
    }
  
    .profile-details {
      padding: 20px;
    }
    .profile-image img {
      margin-bottom: 0; /* Remove the margin-bottom specifically for this responsive condition */
      width: 50%;
      height: 100%;
    }
  
    .form-field label {
      font-size: 16px;
    }
  }
  /* Your existing styles */
  @media (max-width: 1008px) {
    .profile-container {
      flex-direction: column;
      padding: 20px;
    }
  
    .profile-image img {
      margin-bottom: 0; /* Remove the margin-bottom specifically for this responsive condition */
      
    }
    
    .profile-details {
      flex: 1 1 auto; /* Set flex basis to auto to prevent growth */
      padding: 20px;
      box-sizing: border-box; /* Include padding in element's width */
    }
  }
/* Media queries for responsiveness */
@media (max-width: 838px) {
  .profile-container {
    flex-direction: column;
    padding: 20px;
  }

  .profile-image img {
    margin-bottom: 0;
    
    
  }
  .profile-details {
    // padding: 20px;
    box-sizing: border-box; /* Include padding in element's width */
  }
}
@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
    padding: 20px;
  }

  .profile-image img {
    margin-bottom: 0;
   
  }

  .profile-details {
    flex: 1 1 auto; /* Set flex basis to auto to prevent growth */
    padding: 20px;
    box-sizing: border-box; /* Include padding in element's width */
  }

  .profile-image img {
    margin-bottom: 0; 
   
  }
}
/* Media queries for responsiveness */
  @media (max-width: 600px) {
    .profile-container {
      flex-direction: column;
    }

    .profile-details {
      padding: 20px;
    }
    .profile-image img {
      margin-bottom: 0; 
     
    }

    .form-field label {
      font-size: 16px;
    }
  }
/* Media queries for responsiveness */


`;

// Apply the styles to the DOM
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);