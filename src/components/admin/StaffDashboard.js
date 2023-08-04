import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import 'react-calendar/dist/Calendar.css';

import "./style.css";

const RoleCard = ({ title, count, image }) => (
  <Card className="role-card">
    <CardContent>
      <div className="card-content">
        <div className="left-content">
          <Typography variant="h5" component="div">
            {count}
          </Typography>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </div>
        <div className="right-content">
          <img src={image} alt="Role" className="card-image" />
        </div>
      </div>
    </CardContent>
  </Card>
);



const StaffDashboard = () => {

  const staffImage = "https://img.freepik.com/free-photo/happy-smiling-doctors-surgeons-isolated-white_186202-1738.jpg?size=626&ext=jpg&ga=GA1.1.1972406350.1682166795&semt=ais";
  const doctorsImage = "https://img.freepik.com/premium-photo/healthcare-people-medicine-concept-group-doctors-with-stethoscope-clipboard-making-handshake-gesture_380164-84973.jpg?size=626&ext=jpg&ga=GA1.2.1972406350.1682166795&semt=ais";
  const nursesImage = "https://img.freepik.com/premium-photo/team-professional-doctors-isolated-white-background_394555-960.jpg?size=626&ext=jpg&ga=GA1.2.1972406350.1682166795&semt=ais";
  const receptionistsImage = "https://img.freepik.com/free-photo/smiling-secretary-working-with-laptop_1163-341.jpg?size=626&ext=jpg&ga=GA1.1.1972406350.1682166795&semt=ais";
  const patientsImage = "https://img.freepik.com/free-photo/my-daughter-isn-t-afraid-pay-visit-here_329181-7634.jpg?size=626&ext=jpg&ga=GA1.2.1972406350.1682166795&semt=ais";
  const birthImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ5AX2x6cNS4td9v7obZ9zcjdfn9b-FYbpBQ&usqp=CAU"
  const deathImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC0_xmSms580Thin1ma-AGXW1-ab_m--DPzmxHmPlV47j88UBR73kOU07T3pwyPmvjYKA&usqp=CAU"
  
  const [staffCount, setStaffCount] = useState();
  const [doctorsCount, setDoctorsCount] = useState();
  const [nursesCount, setNursesCount] = useState();
  const [receptionistsCount, setReceptionistsCount] = useState();
  const [patientsCount, setPatientsCount] = useState();
  const [BirthCount, setBirthCount] = useState();
  const [DeathCount, setDeathCount] = useState();
  
  useEffect(() => {
    fetchData();
  }, []);

  const header = {
    headers: {
      auth: localStorage.getItem("access_token"),
    },
  };

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/hbms/viewuser", header)
      .then((response) => {
        const staffData = response.data;
        // console.log("Staff Data:", staffData);
  
        const doctorsFiltered = staffData.filter(
          (staff) => staff.role === "Doctor"
        );
  
        const nursesFiltered = staffData.filter(
          (staff) => staff.role === "Nurse"
        );
  
        const receptionistsFiltered = staffData.filter(
          (staff) => staff.role === "Receptionist"
        );
  
        setStaffCount(staffData.length);
        setDoctorsCount(doctorsFiltered.length);
        setNursesCount(nursesFiltered.length);
        setReceptionistsCount(receptionistsFiltered.length);
      })
      .catch((error) => console.error(error));
  
    axios
      .get("http://localhost:5000/api/hbms/list_patient", header)
      .then((response) => {
        const patientsData = response.data;
        setPatientsCount(patientsData.length);
      })
      .catch((error) => console.error(error));
  
    axios
      .get("http://localhost:5000/api/hbms/list_birth", header) 
      .then((response) => {
        const birthData = response.data;
        setBirthCount(birthData.length); 
      })
      .catch((error) => console.error(error));

      axios
      .get("http://localhost:5000/api/hbms/list_death", header)
      .then((response) => {
        const deathData = response.data;
        setDeathCount(deathData.length);
      })
      .catch((error) => console.error(error));
  };
  


  return (
    <div className="c1">
      <RoleCard title="Staff" count={staffCount} image={staffImage} />
      <RoleCard title="Doctors" count={doctorsCount} image={doctorsImage} />
      <RoleCard title="Nurses" count={nursesCount} image={nursesImage}/>
      <RoleCard title="Receptionists" count={receptionistsCount} image={receptionistsImage}/>
      <RoleCard title="Patients" count={patientsCount} image={patientsImage} />
      <RoleCard title="Birth Report" count={BirthCount} image={birthImage} />
      <RoleCard title="Death Report" count={DeathCount} image={deathImage} />
      {/* <Calendar /> */}
    </div>
  );
};

export default StaffDashboard;
