import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventIcon from "@mui/icons-material/Event";
import {
  FaUserNurse,
  FaUserCog,
  FaUserMd,
  FaUserCheck,
  FaUserCircle,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import StaffDashboard from "../admin/StaffDashboard";
import ProfileModal from "./ProfileModal";
import Interns from "./Intern";
import Report from "./Report";
import { useNavigate } from "react-router-dom";
import Patients from "./Patients";

const drawerWidth = 240;

const buttonStyles = {
  width: "100%",
  color: "black",
  borderRadius: "15px 15px",
  backgroundColor: "lightsteelblue",
  "&:hover": {
    backgroundColor: "cornflowerblue",
  },
};

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setProfileModalOpen(role === "Profile");
    if (role === "Logout") {
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
    console.log("Logout clicked");
  };

  const header = {
    headers: {
      auth: localStorage.getItem("access_token"),
    },
  };

  const drawer = (
    <div>
      <Toolbar />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          marginLeft: "16px",
          marginRight: "16px",
        }}
      >
        <ListItem disablePadding>
          <ListItemIcon sx={{ color: "black", margin: "-130px 0px 0px 0px" }}>
            <img
              src="https://media.istockphoto.com/id/1365830421/vector/hands-holding-house-symbol-with-heart-shape-thick-line-icon-with-pointed-corners-and-edges.jpg?s=612x612&w=0&k=20&c=OcBjtznQ1DKxk07kYzVxH-UC9-QC6HtKlRU5cNGcmfM="
              alt="Logo"
              style={{ width: "50px", height: "50px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Mediface"
            primaryTypographyProps={{
              variant: "h6",
              sx: {
                fontWeight: "bolder",
                color: "black",
                margin: "-80px 5px",
                // fontFamily: "cursive", // Apply a cursive font
                textTransform: "uppercase", // Convert text to uppercase
                letterSpacing: "2px", // Add letter spacing
              },
            }}
          />
        </ListItem>
        {[
          {
            text: "Appointment",
            iconComponent: <EventIcon />,
            role: "Appointment",
          },
          { text: "Patient", iconComponent: <FaUserNurse />, role: "Patients" },
          {
            text: "Report Generate",
            iconComponent: <LocalHospitalIcon />,
            role: "Report",
          },
          {
            text: "Interns",
            iconComponent: <FaUserNurse />,
            role: "Interns",
          },
          {
            text: "Profile",
            iconComponent: <FaUserCircle />,
            role: "Profile",
          },
          {
            text: "Logout",
            iconComponent: <LogoutIcon />,
            role: "Logout",
          },
        ].map(({ text, iconComponent, role }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={text !== "Logout" ? buttonStyles : buttonStyles}
              onClick={() => handleRoleClick(role)} // Update the onClick handler
            >
              <ListItemIcon>{iconComponent}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:"whitesmoke",
          color:"black",
          height:"70px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <FaUserCog sx={{ marginRight: "0.5rem" }} />
            <span sx={{ ml: "8px" }}>Receptionist Dashboard</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {selectedRole === "Patients" ? (
          <Patients />
        ) : selectedRole === "Profile" ? (
          <ProfileModal />
        ) : selectedRole === "Interns" ? (
          <Interns />
        ) : selectedRole === "Report" ? (
          <Report />
        ) : (
          <>
            {!selectedRole && (
              <>
                <Typography paragraph></Typography>
                <StaffDashboard />
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
