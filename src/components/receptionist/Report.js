import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, FormControl, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';


const Report = () => {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/hbms/search_patient/${username}`);
      if (response.status === 200) {
        const searchData = response.data;
        setSearchResults(searchData);
        setSelectedPatientId(null); 
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const handleGenerateReport = async (patientId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/hbms/report_generate/${patientId}`,
        {
          responseType: 'blob', 
        }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      window.open(url);
    } catch (error) {
      console.error('Error fetching patient report:', error);
    }
  };

  const handleNameClick = async (patientId) => {
    try {
      await handleGenerateReport(patientId);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };
  return (
    <div>
       <h2 style={{ textAlign: 'center' }}>Generate Patient Report</h2>
      <Form>
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Enter patient username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <Button onClick={handleSearch}>Search</Button>
      </Form>
      {searchResults.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.username}</td>
                <td>
                  <span
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => handleNameClick(patient.id)}
                  >
                    {patient.email}
                  </span>
                </td>
                <td>{patient.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Report;
