import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider, unknownMember } from "../store/State";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

export default function NavBar() {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [member, setMember] = useAuthProvider();

  const handleHome = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const handleSearch = () => {
    navigate("/search");
  };

  const handleLogout = () => {
    handleClose();
    setMember(unknownMember);
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
            onClick={handleHome}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Carpark-Where
          </Typography>
          {!member.isAuth && (
            <div>
              <IconButton size="small" color="inherit" onClick={handleLogin}>
                Login
              </IconButton>
            </div>
          )}
          {member.isAuth && (
            <div>
              <IconButton
                size="large"
                aria-label="search icon"
                aria-controls="search-appbar"
                aria-haspopup="true"
                onClick={handleSearch}
                color="inherit"
              >
                <SearchIcon />
              </IconButton>
            </div>
          )}
          {member.isAuth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
