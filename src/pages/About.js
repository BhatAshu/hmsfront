import React from "react";
import Layout from "../components/Layout/Layout";
import "./Home.css";
import { Box, Typography } from "@mui/material";

function About() {
  return (
    <Layout>
      <div className="homec">
        <div className="paragraphs">
          <p className="pa1">About Us</p>
          <p className="pab2">
            Our mission is to provide compassionate and cutting-edge healthcare
            to our community. With a team of skilled medical professionals and
            state-of-the-art facilities, we are dedicated to delivering
            personalized care that addresses your unique health needs. We take
            pride in our commitment to innovation, research, and continuous
            improvement, all with the goal of ensuring your well-being. We are
            here to be your trusted partner in health. Your health and comfort
            are at the heart of everything we do, and we look forward to serving
            you with excellence.
          </p>
        </div>
        <div className="image">
          <img
            src="https://thumbs.dreamstime.com/b/young-team-group-doctors-picture-32588094.jpg"
            alt="Doctor"
          />
        </div>
      </div>
    </Layout>
  );
}

export default About;
