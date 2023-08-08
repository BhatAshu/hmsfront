import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import { Notifications } from "@mui/icons-material";

const App = () => {
  const [notificationClicked, setNotificationClicked] = useState(false);

  const handleNotificationClick = () => {
    // Handle the click event
    setNotificationClicked(true);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ position: "relative" }}>
        {/* Your main content goes here */}
        <IconButton
          color="inherit"
          onClick={handleNotificationClick}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            "&:hover": {
              backgroundColor: notificationClicked ? "#f0f0f0" : "transparent",
            },
          }}
        >
          <Badge color="error">
          {/* <Badge badgeContent={3} color="error"> */}
            <Notifications />
          </Badge>
        </IconButton>
      </div>
    </div>
  );
};

export default App;
