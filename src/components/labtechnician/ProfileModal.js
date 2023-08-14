import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./style.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    <div className="profile-container">
      <div className="profile-right">
        <div className="profile-image">
          {profile.image && (
            <img
              src={`http://localhost:5000/${profile.image}`}
              alt="Profile"
              width="200px"
              height="200px"
              className="p2"
            />
          )}
        </div>

        <form className="profile-form">
          <div className="form-group">
            <label htmlFor="name" className="label-left">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="form-control form-group-small"
              value={profile.username}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label-left">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="form-control form-group-small"
              value={profile.email}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="label-left">
              Address:
            </label>
            <input
              type="text"
              id="address"
              className="form-control form-group-small"
              value={profile.address}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="label-left">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              className="form-control form-group-small"
              value={profile.phone}
              disabled
            />
          </div>
          <Button color="primary" onClick={handleModalOpen}>
            Update Profile
          </Button>
        </form>
      </div>
      <Modal isOpen={modalOpen} toggle={handleModalClose}>
        <ModalHeader toggle={handleModalClose}>User Profile</ModalHeader>
        <ModalBody>
          <div className="modal-profile-details">
            <div className="profile-image">
              <img src='http://localhost:5000/${profile.image}' alt="Profile" />
            </div>
            <div className="profile-info">
              <form className="modal-profile-form">
                <div className="form-group">
                  <label htmlFor="modalName" className="label-top">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="modalName"
                    className="form-control"
                    value={profile.username}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modalEmail" className="label-top">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="modalEmail"
                    className="form-control"
                    value={profile.email}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modalAddress" className="label-top">
                    Address:
                  </label>
                  <input
                    type="text"
                    id="modalAddress"
                    className="form-control"
                    value={profile.address}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modalPhone" className="label-top">
                    Phone:
                  </label>
                  <input
                    type="text"
                    id="modalPhone"
                    className="form-control"
                    value={profile.phone}
                    disabled
                  />
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Profile;
