// import React, { useState, useEffect } from "react";
// import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";

// import  Header  from "./Header";
// import { Link, useNavigate } from "react-router-dom";

// const DoctorList = () => {
//   const [doctorList, setDoctorList] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const header = {
//       headers: {
//         auth: localStorage.getItem("access_token"),
//       },
//     };
//     fetch("http://localhost:5000/api/hbms/list_doctor", header)
//       .then((response) => response.json())
//       .then((data) => setDoctorList(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   useEffect(() => {
//         if (localStorage.getItem("access_token")) {
//           navigate("/home");
//         } else {
//           navigate("/loginuser");
//         }
//       }, []);
//   return (
//     <div>
//       <Header /> 
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           padding: "20px",
//         }}
//       >
//         {doctorList.map((doctor, index) => (
//           <Card
//             key={`${doctor._id}-${index}`}
//             style={{
//               maxWidth: "390px",
//               display: "flex",
//               flexDirection: "column",
//               margin: "10px",
//               borderRadius: "10px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//               textDecoration: "none",
//               color: "black",
//               "&:hover": {
//                 backgroundColor: "#1976D2",
//                 color: "white",
//                 transform: "scale(1.02)",
//               },
//             }}
//           >
//             <Link
//               to={`/patientform/${doctor.username}`}
//               style={{ textDecoration: "none" }}
//             >
//               <CardActionArea>
//                 <CardMedia
//                   style={{ minHeight: "400px", objectFit: "cover" }}
//                   component="img"
//                   src={`http://localhost:5000${doctor.image}`}
//                   alt={doctor.username}
//                 />
//                 <CardContent
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     textAlign: "center",
//                     transition: "color 0.3s ease-in-out",
//                     color: "black",
//                     padding: "20px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       color: "inherit",
//                       marginBottom: "10px",
//                       fontWeight: 600,
//                     }}
//                   >
//                     {doctor.username}
//                   </div>
//                   <div
//                     style={{
//                       color: "inherit",
//                       fontSize: "14px",
//                     }}
//                   >
//                     {doctor.specialist}
//                   </div>
//                 </CardContent>
//               </CardActionArea>
//             </Link>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DoctorList;



import React, { useState, useEffect } from "react";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Header from"./Header";

const ResponsiveAppBar = () => {
  const [doctorList, setDoctorList] = useState([]);
  const navigate = useNavigate();

  const header = {
    headers: {
      auth: localStorage.getItem("access_token"),
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("loginDataID");
    localStorage.removeItem("loginDataF");
    localStorage.removeItem("loginDataL");
    localStorage.removeItem("loginDataE");
    localStorage.removeItem("loginDataP");
    localStorage.removeItem("loginDataG");
    localStorage.removeItem("loginDataB");
    localStorage.removeItem("loginDataU");
    console.log("Logout");
    navigate("/loginuser");
  };

  useEffect(() => {
    // Fetch the doctor data from the API
    fetch("http://localhost:5000/api/hbms/list_doctor", header)
      .then((response) => response.json())
      .then((data) => setDoctorList(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
            if (localStorage.getItem("access_token")) {
              navigate("/home");
            } else {
              navigate("/loginuser");
            }
          }, []);
  return (
    <div>
    <Box>
    <Header/>
    <Container maxWidth="xl">
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              margin: "20px 0",
              fontWeight: "bold",
            }}
          >
            Our Doctors
          </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {doctorList.map((doctor) => (
            <Card
              key={doctor._id}
              sx={{
                maxWidth: "390px",
                display: "flex",
                flexDirection: "column",
                margin: "10px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                "& a": {
                  textDecoration: "none",
                  color: "black",
                  "&:hover": {
                    color: "white",
                  },
                },
                "&:hover": {
                  backgroundColor: "#1976D2",
                  color: "white",
                  transform: "scale(1.02)",
                },
              }}
            >
              <Link
                to={`/patientform/${doctor.id}/${doctor.username}`}
                style={{ textDecoration: "none" }}
              >
                <CardActionArea>
                  <CardMedia
                    sx={{ minHeight: "400px", objectFit: "cover" }}
                    component="img"
                    src={`http://localhost:5000${doctor.image}`}
                    alt={doctor.username}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      transition: "color 0.3s ease-in-out",
                      color: "black",
                      padding: "20px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      component="div"
                      sx={{
                        color: "inherit",
                        marginBottom: "10px",
                        fontWeight: 600,
                      }}
                    >
                      {doctor.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "inherit",
                        fontSize: "14px",
                      }}
                    >
                      {doctor.specialist}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
    </div>
  );
};

export default ResponsiveAppBar;