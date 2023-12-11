import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileMedical  } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';

const styles = `
  .appointment-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: white;
  }

  .appointment-details {
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 80%;
    margin-top: 20px;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

function MedicalHistory() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    fetchAppointmentDetails();
  }, []);

  const fetchAppointmentDetails = async () => {
    try {
      const userId = localStorage.getItem('loginDataID');
      
      if (userId) {
        const response = await axios.get(`http://localhost:5000/api/hbms/report_tracking/${userId}`);
        const patientProfile = response.data.patient;
        setProfile(patientProfile);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching appointment details:', error);
      setError('Error fetching appointment details.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header /> 
      <div className="appointment-container">
        <h2><FontAwesomeIcon icon={faFileMedical} /> Electronic Medical Record</h2>
        <div className="appointment-details">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{profile.username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{profile.email}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{profile.phone}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{profile.gender}</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>{profile.date}</td>
              </tr>
              <tr>
                <td>Bloodgroup</td>
                <td>{profile.bloodgroup}</td>
              </tr>
              <tr>
                <td>Chiefcomplaint</td>
                <td>{profile.chiefcomplaint}</td>
              </tr>
              <tr>
                <td>Prescribe</td>
                <td>{profile.message}</td>
              </tr>
              <tr>
                <td>Doctor</td>
                <td>{profile.doctorName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <style>{styles}</style>
    </div>
  );
}

export default MedicalHistory;