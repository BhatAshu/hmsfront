import React from "react";
import Layout from "../components/Layout/Layout";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import "./contact.css"; 
const ContactUs = () => {
  return (
    <Layout>
      <Container className="contact-container">
        <Typography variant="h4" className="contact-heading">
          Contact Us
        </Typography>
        <p className="contact-text">
          We're here to provide you with the best possible care and support. If
          you have any questions or concerns, please feel free to reach out to
          us using the contact details below. Our dedicated team is ready to
          assist you.
        </p>
        <Box className="contact-table">
          <TableContainer component={Paper}>
            <Table aria-label="contact table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="table-header">
                    Contact Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <SupportAgentIcon className="icon red-icon" /> 1800-00-0000
                    (Toll-Free)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <MailIcon className="icon blue-icon" />{" "}
                    infomediface@gmail.com
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <CallIcon className="icon green-icon" /> 123-456-7890
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Layout>
  );
};

export default ContactUs;


