import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Table,
  Modal,
} from "react-bootstrap";
import { toast } from "react-toastify";

const Billing = () => {
  const [username, setUsername] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [consultationFee, setConsultationFee] = useState("");
  const [laboratoryFee, setLaboratoryFee] = useState("");
  const [pdfBlob, setPdfBlob] = useState(null);
  const [date, setDate] = useState("");
  const [selectedPatientName, setSelectedPatientName] = useState("");

  const [addedBilling, setAddedBilling] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/hbms/search_patient/${username}`
      );
      if (response.status === 200) {
        const searchData = response.data;
        setSearchResults(searchData);
        setSelectedPatientId(null);
        setSelectedPatientName("");
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/hbms/add_billing/${selectedPatientId}`,
        {
          consultationFee,
          laboratoryFee,
        }
      );
      if (response.status === 200) {
        toast.success("Billing information updated successfully");
        setShowModal(false);
        setSelectedPatientName("");
        try {
          if (!selectedPatientId) {
            return;
          }
          const pdfResponse = await axios.get(
            `http://localhost:5000/api/hbms/list_billing/${selectedPatientId}`,
            { responseType: "arraybuffer" }
          );
          const pdfBlob = new Blob([pdfResponse.data], {
            type: "application/pdf",
          });
          setPdfBlob(pdfBlob);
          if (pdfBlob) {
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl);
          }
        } catch (error) {
          console.error("Error fetching PDF:", error);
          toast.error("Error fetching PDF");
        }
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error generating PDF");
    }
  };

  const handleViewPreviousBillingReport = async (patientId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/hbms/list_billing/${patientId}`,
        { responseType: "arraybuffer" }
      );

      if (response.status === 200) {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        setPdfBlob(pdfBlob);

        if (pdfBlob) {
          const pdfUrl = URL.createObjectURL(pdfBlob);
          window.open(pdfUrl);
        }
      } else {
        toast.error("Error fetching previous billing data");
      }
    } catch (error) {
      console.error("Error fetching previous billing data:", error);
      toast.error("Error fetching previous billing data");
    }
  };
  
  
  
  return (
    <div>
       <h2 style={{ textAlign: 'center' }}>Patient Invoices</h2>
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
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.username}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => {
                      setSelectedPatientId(patient.id);
                      setSelectedPatientName(patient.username);
                      setShowModal(true);
                    }}
                  >
                    Add
                  </Button>{" "}
                  <Button
                    variant="info"
                    onClick={() => handleViewPreviousBillingReport(patient.id)}
                      
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Generate PDF Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong style={{ color: "blue" }}>Patient Name:</strong>{" "}
            <span style={{ fontWeight: "bold", color: "blue" }}>
              {selectedPatientName}
            </span>
          </p>
          <Form>
            <FormGroup>
              <FormControl
                type="number"
                placeholder="Consultation Fee"
                value={consultationFee}
                onChange={(e) => setConsultationFee(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                type="number"
                placeholder="Laboratory Fee"
                value={laboratoryFee}
                onChange={(e) => setLaboratoryFee(e.target.value)}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={handleGeneratePDF}>Generate PDF</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Billing;