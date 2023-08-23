import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-calendar/dist/Calendar.css";
import "./staff.css";

const tileContent = ({ date, view }) => {
  if (view === "month" && date.getDate() === new Date().getDate()) {
    return <div className="circle"></div>;
  }
};
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
  const staffImage =
    "https://cdn2.iconfinder.com/data/icons/health-care-set-3/384/16-512.png";
  const doctorsImage =
    "data:image/png;base64,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";
  const nursesImage = "https://cdn-icons-png.flaticon.com/128/1540/1540809.png";
  const receptionistsImage =
    "https://www.iconbunny.com/icons/media/catalog/product/2/5/2521.5-hospital-reception-icon-iconbunny.jpg";
  const patientsImage =
    "https://t3.ftcdn.net/jpg/01/85/66/96/360_F_185669627_d10p9rAQ3DmTxzpS0RRbL7gCeUfy9yid.jpg";

  const [staffCount, setStaffCount] = useState();
  const [doctorsCount, setDoctorsCount] = useState();
  const [nursesCount, setNursesCount] = useState();
  const [receptionistsCount, setReceptionistsCount] = useState();
  const [patientsCount, setPatientsCount] = useState();

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
      <div className="role-count">
        <RoleCard title="Staff" count={staffCount} image={staffImage} />
      </div>
      <div className="role-count">
        <RoleCard title="Doctors" count={doctorsCount} image={doctorsImage} />
      </div>
      <div className="role-count">
        <RoleCard
          title="Receptionists"
          count={receptionistsCount}
          image={receptionistsImage}
        />
      </div>
      <div className="role-count">
        <RoleCard
          title="Patients"
          count={patientsCount}
          image={patientsImage}
        />
      </div>
      <div className="calendar-container">
        <Calendar className="full-width-calendar" />
      </div>
    </div>
  );
};

export default StaffDashboard;
