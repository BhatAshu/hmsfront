
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
// import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   document: {
//     fontFamily: 'Helvetica',
//     padding: 20,
//   },
//   header: {
//     textAlign: 'center',
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   image: {
//     width: '100px',
//     height: '100px',
//     marginBottom: 10,
//     alignSelf: 'center',
//   },
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#E4E4E4',
//     padding: 20,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   value: {
//     marginBottom: 10,
//   },
//   reportDetails: {
//     fontSize: 16,
//   },
// });

// const generatePDFDocument = (hospitalName, patientData) => (
//   <Document>
//     <Page style={styles.page}>
//       {/* Header */}
//       <Text style={styles.header}>{hospitalName}</Text>
//       <Image style={styles.image} src="path/to/hospital-image.png" />

//       {/* Report Details */}
//       <View style={styles.section}>
//         <Text style={styles.label}>Report Details:</Text>
//         <View style={styles.reportDetails}>
//           <Text style={styles.value}>Hospital Name: {hospitalName}</Text>
//           {Object.entries(patientData).map(([key, value]) => (
//             <Text style={styles.value} key={key}>
//               {key}: {value}
//             </Text>
//           ))}
//         </View>
//       </View>
//     </Page>
//   </Document>
// );

// const Report = () => {
//   const [firstname, setFirstname] = useState('');

//   const handleGenerateReport = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/hbms/report_generate/${firstname}`, {
//         responseType: 'blob',
//       });

//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = URL.createObjectURL(blob);

//       // Open the PDF in a new tab
//       window.open(url);
//     } catch (error) {
//       console.error('Error fetching patient report:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Generate Patient Report</h2>
//       <Form>
//         <FormGroup>
//           <FormControl
//             type="text"
//             placeholder="Enter patient username"
//             value={firstname}
//             onChange={(e) => setFirstname(e.target.value)}
//           />
//         </FormGroup>
//         <Button onClick={handleGenerateReport}>Generate Report</Button>
//       </Form>
//     </div>
//   );
// };

// export default Report;

import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import { PDFViewer, Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import { PDFDocument } from 'pdf-lib';

const styles = StyleSheet.create({
  // Your styles here
  document: {
    fontFamily: 'Helvetica',
    padding: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: '100px',
    height: '100px',
    marginBottom: 10,
    alignSelf: 'center',
  },
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    marginBottom: 10,
  },
  reportDetails: {
    fontSize: 16,
  },
});

const generatePDFDocument = (hospitalName, patientData) => (
  <Document>
    <Page style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>{hospitalName}</Text>
      <Image style={styles.image} src="https://img.freepik.com/free-icon/hospital_318-574559.jpg" />

      {/* Patient Details */}
      {patientData.map((patient, index) => (
        <View key={patient.id} style={styles.section}>
          <Text style={styles.label}>Report for Patient ID: {patient.id}</Text>
          <Text style={styles.value}>Patient Name: {patient.firstname}</Text>
          <Text style={styles.value}>Email: {patient.email}</Text>
          <Text style={styles.value}>Gender: {patient.gender}</Text>
          <Text style={styles.value}>Phone: {patient.phone}</Text>
          <Text style={styles.value}>Age: {patient.age}</Text>
          <Text style={styles.value}>Blood Group: {patient.bloodgroup}</Text>
          <Text style={styles.value}>Chief Complaint: {patient.chiefcomplaint}</Text>
          <Text style={styles.value}>Sugar Level: {patient.sugarlevel}</Text>
          <Text style={styles.value}>Blood Pressure: {patient.bloodpressure}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

const Report = () => {
  const [firstname, setFirstname] = useState('');
  const [hospitalName, setHospitalName] = useState('Mediface'); // Set your hospital name here
  const [patientData, setPatientData] = useState([]);

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/hbms/report_generate/${firstname}`);
      console.log('Response received:', response);
      const fetchedPatientData = response.data; // Assuming the response.data contains the patient data array
      setPatientData(fetchedPatientData);
  
      // Generate the PDF blob using pdf-lib
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const content = generatePDFDocument(hospitalName, fetchedPatientData);
      page.drawSvgPath(content);
  
      // Serialize the PDF document to a blob
      const pdfBytes = await pdfDoc.save();
  
      // Open the PDF blob in a new tab
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    } catch (error) {
      console.error('Error fetching patient report:', error);
    }
  };
  
  
  
  
  
  

  return (
    <div>
      <h2>Generate Patient Report</h2>
      <Form>
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Enter patient username"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </FormGroup>
        <Button onClick={handleGenerateReport}>Generate Report</Button>
      </Form>
    </div>
  );
};

export default Report;
