import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MedicalHistory() {
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = async () => {
    try {
      const userId = localStorage.getItem('loginDataID');
      
      if (userId) {
        const response = await axios.get(`http://localhost:5000/api/hbms/report_tracking/${userId}`);
        const medicalHistoryData = response.data.medicalHistory;
        setMedicalHistory(medicalHistoryData);

        const patientProfile = response.data.patient;
        setProfile(patientProfile);

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching medical history:', error);
      setError('Error fetching medical history.');
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
      <h2>Profile</h2>
      <div className="profile-details">
        <div className="profile-info">
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
          <p>Gender: {profile.gender}</p>
          <p>Address: {profile.address}</p>
        </div>
      </div>
      <hr />
      <h3>Appointment Details</h3>
      <div className="appointment-details">
        <p>Email: {profile.email}</p>
        <p>Date: {profile.date}</p>
        <p>Bloodgroup: {profile.bloodgroup}</p>
        <p>Chief Complaint: {profile.chiefcomplaint}</p>
        <p>Doctor: {profile.doctorName}</p>
        <p>Prescribe: {profile.message}</p>
      </div>
    </div>
  );
}

export default MedicalHistory;