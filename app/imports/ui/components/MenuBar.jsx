import React from "react";
import { Meteor } from "meteor/meteor";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, withRouter } from "react-router-dom";
import { Register } from "../pages/Register";

const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const MenuBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerAnchorEl, setDrawerAnchorEl] = React.useState(null);
  const isDrawerOpen = Boolean(drawerAnchorEl);
  const isProfileMenuOpen = Boolean(anchorEl);
  const isAdmin =
    Roles.userIsInRole(Meteor.userId(), "admin") ||
    Roles.userIsInRole(Meteor.userId(), "Hospital Admin") ||
    Roles.userIsInRole(Meteor.userId(), "Site Admin");

  const openDrawer = (event) => {
    setDrawerAnchorEl(event.currentTarget);
  };

  const closeDrawer = () => {
    setDrawerAnchorEl(null);
  };

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Meteor.logout();
  };

  const drawerId = "drawerMenu";
  const renderDrawer = (
    <Drawer
      id={drawerId}
      anchor="left"
      open={isDrawerOpen}
      onClose={closeDrawer}
    >
      <Box role="presentation" onClick={closeDrawer} onKeyDown={closeDrawer}>
        <List>
          {[
            ["WaitState", "/"],
            ["Hospital Directory", "/directory/1"],
          ].map((text, index) => (
            <ListItem button component={Link} to={text[1]} key={text[0]}>
              <ListItemText primary={text[0]} />
            </ListItem>
          ))}
          
          {/* Admin Menu Options */}
          {isAdmin == true && (
            <ListItem button component={Link} to="/register">
              <ListItemText primary={"Add Admin"} />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );

  const profileMenuId = "profileMenu";
  const renderProfileMenu = (
    <Menu
      id={profileMenuId}
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
      open={isProfileMenuOpen}
      onClose={handleClose}
    >
      {/* check if user is logged in */}
      {Meteor.userId() === null ? ( 
        <div>
          <MenuItem component={Link} to="/admin/login" onClick={handleClose}>
            Admin Login
          </MenuItem>
          <MenuItem component={Link} to="/login" onClick={handleClose}>
            Patient Login
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem component={Link} to="/" onClick={handleLogout}>
            Logout
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls={drawerId}
            sx={{ mr: 2 }}
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
          {renderDrawer}
          <SearchBox>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search hospitals"
              inputProps={{ "aria-label": "search" }}
            />
          </SearchBox>
          <IconButton
            size="large"
            aria-label="user account"
            aria-controls={profileMenuId}
            aria-haspopup="true"
            onClick={handleProfileMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderProfileMenu}
    </Box>
  );
};

export default MenuBar;
