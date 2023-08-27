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
import {
  FaUserNurse,
  FaUserCog,
  FaUserMd,
  FaUserCheck,
  FaUserPlus,
} from "react-icons/fa";
import React, { useState } from "react";
import HandleRoleClick from "./HandleRoleClick";
import AddModal from "./AddModal";
import StaffDashboard from "./StaffDashboard";
import "./style.css";
import Patients from "./Patients";
const drawerWidth = 240;

const buttonStyles = {
  width: "100%",
  color: "black",
  borderRadius: "15px 15px",
  backgroundColor: "lightsteelblue",
  "&:hover": {
    backgroundColor: "blue",
    color: "white", // Change the text and icon color to white on hover
  },
};

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  // const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  // const handleRoleClick = (role) => {
  //   setSelectedRole(role);
  //   if (role === "AddStaff") {
  //     setAddModalOpen(true);
  //   }
  // };

  const drawer = (
    <div
      sx={{
        backgroundColor: "blue",
      }}
    >
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
          { text: "Doctor", iconComponent: <FaUserMd />, role: "Doctor" },
          // { text: "Nurse", iconComponent: <FaUserNurse />, role: "Nurse" },
          {
            text: "Receptionist",
            iconComponent: <FaUserCheck />,
            role: "Receptionist",
          },
          {
            text: "LabTechnician",
            iconComponent: <FaUserCheck />,
            role: "LabTechnician",
          },
          {
            text: "Patients",
            iconComponent: <FaUserPlus />,
            role: "Patients",
          },
          {
            text: "Profile",
            iconComponent: <FaUserPlus />,
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
              onClick={() => handleRoleClick(role)}
            >
              <ListItemIcon
                sx={{
                  color: "black",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                {iconComponent}
              </ListItemIcon>
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
          backgroundColor: "whitesmoke",
          color: "black",
          height: "70px",
        }}
      >
        <Toolbar className="sihe">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className="sihe">
            <FaUserCog />
            <span sx={{ ml: "8px" }} className="sihe">
              Admin Dashboard
            </span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
        ) : (
          <>
            {selectedRole ? (
              <HandleRoleClick role={selectedRole} />
            ) : (
              <>
                <Typography paragraph></Typography>
                <StaffDashboard />
              </>
            )}
          </>
        )}

        {/* <AddModal
          open={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
        /> */}
        <AddModal />
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
