import * as React from "react";
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
import { Link, useNavigate } from 'react-router-dom';
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Profile from "./Profile";

const pages = ["Book An Appointment", "Track Medical", "Profile"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const [userData, setUserData] = React.useState(null); // State to store user data

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/hbms/profile_patient");
      const data = await response.json();
      setUserData(data); // Set user data in the state
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleProfileClick = () => {
    fetchUserProfile(); // Fetch user profile data
    handleCloseUserMenu(); // Close the menu
    navigate("/Profile"); //  Navigate to the Profile page
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalHospitalIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MEDIFACE
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
             {pages.map((page) => (
          <Button
            key={page}
            onClick={handleCloseNavMenu}
            component={Link} // Use Link component for navigation
            to={
                page === "Book An Appointment"
                  ? "/patientform"
                  : page === "Profile"
                  ? "/userprofile"
                  : "/"
              }
            sx={{
              my: 2,
              color: "white",
              display: "block",
              marginLeft: 2,
            }}
          >
            {page}
          </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                 <MenuItem key={setting} onClick={setting === "Profile" ? handleProfileClick : handleCloseUserMenu}>
                {setting === "Profile" ? (
                  <Typography textAlign="center">{setting}</Typography>
                ) : (
                  <Typography textAlign="center">{setting}</Typography>
                )}
              </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
