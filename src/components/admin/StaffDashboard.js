import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import { CalendarToday, Notifications } from "@mui/icons-material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import "./style.css"

const tileContent = ({ date, view }) => {
  if (view === "month" && date.getDate() === new Date().getDate()) {
    return <div className="circle"></div>;
  }
};

// const RoleCard = ({ title, count, image }) => (
//   <Card className="role-card">
//     <CardContent>
//       <div className="card-content">
//         <div className="left-content">
//           <Typography variant="h5" component="div">
//             {count}
//           </Typography>
//           <Typography variant="h6" component="div">
//             {title}
//           </Typography>
//         </div>
//         <div className="right-content">
//           <img src={image} alt="Role" className="card-image" />
//         </div>
//       </div>
//     </CardContent>
//   </Card>
// );
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

  const staffImage = "https://cdn-icons-png.flaticon.com/128/4807/4807695.png";
  const doctorsImage = "https://www.nicepng.com/png/detail/867-8678512_doctor-icon-physician.png";
  const nursesImage = "https://cdn-icons-png.flaticon.com/128/1540/1540809.png";
  const receptionistsImage = "https://cdn-icons-png.flaticon.com/512/1028/1028853.png";
  const patientsImage = "https://img.freepik.com/free-photo/my-daughter-isn-t-afraid-pay-visit-here_329181-7634.jpg?size=626&ext=jpg&ga=GA1.2.1972406350.1682166795&semt=ais";
  
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
};


return (
  <div className="c1">
    <div className="role-counts">
      <div className="role-count">
        <RoleCard title="Doctors" count={doctorsCount} image={doctorsImage} />
      </div>
      <div className="role-count">
        <RoleCard title="Staff" count={staffCount} image={staffImage} />
      </div>
    </div>
    <div className="calendar-and-notification">
      <div className="calendar-container">
        <Calendar className="mui-calendar" tileContent={tileContent} />
      </div>
      <div className="notification-container">
        <Notifications className="notification-icon" />
      </div>
    </div>
    <div className="role-card-container">
      <div className="role-card-row">
        <RoleCard title="Nurses" count={nursesCount} image={nursesImage} />
        <RoleCard
          title="Receptionists"
          count={receptionistsCount}
          image={receptionistsImage}
        />
      </div>
      <div className="role-card-row">
        <RoleCard title="Patients" count={patientsCount} image={patientsImage} />
      </div>
    </div>
  </div>
);
};

export default StaffDashboard;
