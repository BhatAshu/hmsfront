import React from "react";
import { MenuList } from "../data/data";
import Layout from "../components/Layout/Layout";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Menu = () => {
  return (
    <Layout>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {MenuList.map((menu) => (
          <Card sx={{ maxWidth: "390px", display: "flex", m: 2 }}>
            <CardActionArea>
              <CardMedia
                sx={{ minHeight: "400px" }}
                component={"img"}
                src={menu.image}
                alt={menu.name}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom component={"div"}>
                  {menu.name}
                </Typography>
                <Typography variant="body2">{menu.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Layout>
  );
};

export default Menu;



// import React, { useState, useEffect } from "react";
// import Layout from "../components/Layout/Layout";
// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";

// const Menu = () => {
//   const [doctorList, setDoctorList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const config = {
//         headers: { auth: localStorage.getItem("access_token") },
//       };
//       const response = await axios.get("http://localhost:5000/api/hbms/list_doctor", config); // Add the missing semicolon here
//       console.log(response.data); // Log the API response
//       setDoctorList(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//       setLoading(false);
//     }
//   };
  
  
  
  
  

//   return (
//     <Layout>
//       <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//         {loading ? (
//           <CircularProgress />
//         ) : (
//           doctorList.map((doctor) => (
//             <Card sx={{ maxWidth: "390px", display: "flex", m: 2 }} key={doctor.id}>
//               <CardActionArea>
//                 {/* Replace doctor.image with the actual image property */}
//                 <CardMedia
//                   sx={{ minHeight: "400px" }}
//                   component={"img"}
//                   src={doctor.image}
//                   alt={doctor.username} // Display username as alt
//                 />
//                 <CardContent>
//                   <Typography variant="h5" gutterBottom component={"div"}>
//                     {doctor.username} {/* Display username */}
//                   </Typography>
//                   <Typography variant="body2">{doctor.speciality} {/* Display speciality */}</Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           ))
//         )}
//       </Box>
//     </Layout>
//   );
// };

// export default Menu;
