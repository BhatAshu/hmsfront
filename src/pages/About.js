import React from "react";
import Layout from "../components/Layout/Layout";
import { Box, Typography } from "@mui/material";


const About = () => {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: 15,
          flexDirection: "row", // Ensure horizontal alignment
          "@media (max-width:600px)": {
            flexDirection: "column",
            textAlign: "center",
          },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            flex: 1,
            background: "url('https://thumbs.dreamstime.com/b/young-team-group-doctors-picture-32588094.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "600px", // Adjust the height as needed
          }}
        />
        
        {/* Content */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Add a semi-transparent background
          }}
        >
          <Typography variant="h4"
          style={{
            fontSize: "4rem",
            color: "#222",
            marginBottom: "50px",
          }}
          >About Us</Typography>

          <p
          style={{
            fontSize: "1.2rem",
            color: "#333",
            lineHeight: "1.6",
            
          }}
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae molestias delectus facilis,
            temporibus eum consectetur, a debitis exercitationem quae distinctio aliquid ea ipsam vitae esse amet soluta maxime dolorem?
            Inventore ut maiores illo ipsum nisi, nulla eligendi unde reiciendis quod voluptas velit sit voluptate perferendis cum pariatur molestiae
            tenetur repellat!
          </p>
        </Box>
      </Box>
    </Layout>
  );
};

export default About;