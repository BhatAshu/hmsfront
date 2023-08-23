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
import LogoDevIcon from "@mui/icons-material/LogoDev";
import { Link, useNavigate } from "react-router-dom";

const pages = ["Book An Appointment", "MedicalHistory", "Profile"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("loginDataF");
    localStorage.removeItem("loginDataL");
    localStorage.removeItem("loginDataE");
    localStorage.removeItem("loginDataP");
    localStorage.removeItem("loginDataG");
    localStorage.removeItem("loginDataB");
    localStorage.removeItem("loginDataU");
    setIsLoggedIn(false);
    console.log("Logout");
    navigate("/loginuser");
  };

  const [userData, setUserData] = React.useState(null);
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/hbms/profile_patient"
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoDevIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  component={Link}
                  to={
                    page === "Book An Appointment"
                      ? "/patientform"
                      : page === "Profile"
                      ? "/userprofile"
                      : page === "MedicalHistory"
                      ? "/reporttrack"
                      : "/"
                  }
                  onClick={() => {
                    console.log(`Menu item "${page}" clicked`); // Add this line
                    if (page === "Logout") {
                      handleLogout();
                    } else {
                      handleCloseNavMenu();
                    }
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LogoDevIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MEDIFACE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                component={Link} // Use the Link component for navigation
                to={
                  page === "Book An Appointment"
                    ? "/patientform" // Navigate to /patientform when "Book An Appointment" is clicked
                    : page === "Profile"
                    ? "/userprofile"
                    : page === "MedicalHistory"
                    ? "/reporttrack"
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
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === "Logout" ? handleLogout : handleCloseUserMenu
                  }
                >
                  <Typography textAlign="center">{setting}</Typography>
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
