import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { FaUserCheck } from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

// import HandlePatient from "./HandlePatient";
import Profile from "./Profile";
// import AddStaff from "../admin/AddStaff";
// import Interns from "./Interns";

const drawerWidth = 240;

const buttonStyles = {
  width: "100%",
  color: "black",
  borderRadius: "10px",
  backgroundColor: "whitesmoke",
  "&:hover": {
    backgroundColor: "lightblue",
  },
};
const iconStyles = {
  fontSize: "1.5rem",
};

const drawerHeaderStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
};

const mainContentStyles = {
  flexGrow: 1,
  p: 3,
  width: { sm: `calc(100% - ${drawerWidth}px)` },
};

function PatientSidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePatient = (role) => {
    setSelectedRole(role);
    if (role === "Logout") {
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const fieldColors = {
    Appointments: "#2196F3",
    "Medical Records": "#673AB7",
    Prescriptions: "#FF5722",
    Billing: "#4CAF50",
    Profile: "#FFC107",
    "Health Tracking": "#9C27B0",
    Logout: "#F44336",
  };

  const getIconColor = (field) => {
    return fieldColors[field] || "#000000"; // Default color if field color is not defined
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
        {[
          { text: "Appointments", iconComponent: <EventNoteIcon />, role: "Appointments" },
          { text: "Medical Records", iconComponent: <DescriptionIcon />, role: "Medical Records" },
          { text: "Prescriptions", iconComponent: <LocalHospitalIcon />, role: "Prescriptions" },
          { text: "Billing", iconComponent: <AccountBalanceIcon />, role: "Billing" },
          { text: "Profile", iconComponent: <AccountCircleIcon />, role: "Profile" },
          { text: "Health Tracking", iconComponent: <LocalDrinkIcon />, role: "Health Tracking" },
          { text: "Logout", iconComponent: <LogoutIcon />, role: "Logout" },
        ].map(({ text, iconComponent, role }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                ...buttonStyles,
                "& .MuiListItemIcon-root": {
                  color: getIconColor(role),
                },
              }}
              onClick={() => handlePatient(role)}
            >
              <ListItemIcon>{iconComponent}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "whitesmoke",
          color: "black",
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
            <FaUserCheck sx={{ marginRight: "0.5rem" }} />
            Patient
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          bgcolor: "whitesmoke",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-Paper": {
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
            "& .MuiDrawer-Paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={mainContentStyles}>
        <Toolbar />
        {selectedRole === "Profile" ? (
          <Profile />
        // ) : selectedRole === "Appointments" ? (
        //   <HandlePatient />
        // ) : selectedRole === "Medical Records" ? (
        //   <MedicalRecords /> 
        // ) : selectedRole === "Prescriptions" ? (
        //   <Prescriptions />
        // ) : selectedRole === "Billing" ? (
        //   <Billing />
        // ) : selectedRole === "Health Tracking" ? (
        //   <HealthTracking /> 
        ) : (
          <>
            {!selectedRole && (
              <>
                <Typography paragraph></Typography>
                {/* <AddStaff /> */}
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

PatientSidebar.propTypes = {
  window: PropTypes.func,
};

export default PatientSidebar;