import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography,Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../store";

axios.defaults.withCredentials = true;
const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error("Unable To Logout. Please try again");
  };
  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };

  const [value, setValue] = useState();

  return (
    <div >
      <AppBar position="sticky">
        <Toolbar>
        <Avatar alt="Anime image" src="./logo.jpg" />
          <Typography variant="h3">Anime's Hub</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, val) => setValue(val)}
              value={value}
              textColor="inherit"
            >
              {!isLoggedIn && (
                <>
                  {" "}
                  <Tab to="/login" LinkComponent={Link}   textColor="success"
label="Login" />
                  <Tab to="/signup" LinkComponent={Link} textColor="success" label="Signup" />
                </> 
              )}
              {isLoggedIn && (
                <Tab
                  onClick={handleLogout}
                  to="/"
                  LinkComponent={Link} textColor="success" 
                  label="Logout"
                />
              )}{" "}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
