// import React from "react";
// import { MenuList } from "../data/data";
// import Layout from "../components/Layout/Layout";
// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   Typography,
// } from "@mui/material";

// const Menu = () => {
//   return (
//     <Layout>
//       <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//         {MenuList.map((menu) => (
//           <Card sx={{ maxWidth: "390px", display: "flex", m: 2 }}>
//             <CardActionArea>
//               <CardMedia
//                 sx={{ minHeight: "400px" }}
//                 component={"img"}
//                 src={menu.image}
//                 alt={menu.name}
//               />
//               <CardContent>
//                 <Typography variant="h5" gutterBottom component={"div"}>
//                   {menu.name}
//                 </Typography>
//                 <Typography variant="body2">{menu.description}</Typography>
//               </CardContent>
//             </CardActionArea>
//           </Card>
//         ))}
//       </Box>
//     </Layout>
//   );
// };

// export default Menu;


import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Menu = () => {
  const [doctorList, setDoctorList] = useState([]);
  const header = {
    headers: {
      auth: localStorage.getItem("access_token"),
    },
  };

  useEffect(() => {
    // Fetch the doctor data from the API
    fetch("http://localhost:5000/api/hbms/list_doctor", header)
      .then((response) => response.json())
      .then((data) => setDoctorList(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Layout>
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
            key={doctor._id} // Use doctor._id instead of doctor.id
            sx={{
              maxWidth: "390px",
              display: "flex",
              flexDirection: "column",
              margin: "10px",
            }}
          >
           <Link to={`/patientform/${doctor.id}/${doctor.username}`}>
              <CardActionArea>
                <CardMedia
                  sx={{ minHeight: '400px' }}
                  component="img"
                  src={`http://localhost:5000${doctor.image}`}
                  alt={doctor.username}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom component="div">
                    {doctor.username}
                  </Typography>
                  <Typography variant="body2">{doctor.specialist}</Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        ))}
      </Box>
    </Layout>
  );
};

export default Menu;






// import React, { useState, useEffect } from 'react';
// import Layout from '../components/Layout/Layout';
// import { Link } from 'react-router-dom';
// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   Typography,
// } from '@mui/material';

// const Menu = () => {
//   const [doctorList, setDoctorList] = useState([]);
//   const header = {
//     headers: {
//       auth: localStorage.getItem('access_token'),
//     },
//   };

//   useEffect(() => {
//     fetch('http://localhost:5000/api/hbms/list_doctor', header)
//       .then((response) => response.json())
//       .then((data) => setDoctorList(data))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <Layout>
//       <Box
//         sx={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           justifyContent: 'center',
//           padding: '20px',
//         }}
//       >
//         {doctorList.map((doctor) => (
//           <Card
//             key={doctor.id}
//             sx={{
//               maxWidth: '390px',
//               display: 'flex',
//               flexDirection: 'column',
//               margin: '10px',
//             }}
//           >
//             <Link to={`/patientform/${doctor.id}`}>
//               <CardActionArea>
//                 <CardMedia
//                   sx={{ minHeight: '400px' }}
//                   component="img"
//                   src={`http://localhost:5000${doctor.image}`}
//                   alt={doctor.username}
//                 />
//                 <CardContent>
//                   <Typography variant="h5" gutterBottom component="div">
//                     {doctor.username}
//                   </Typography>
//                   <Typography variant="body2">{doctor.specialist}</Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Link>
//           </Card>
//         ))}
//       </Box>
//     </Layout>
//   );
// };

// export default Menu;


