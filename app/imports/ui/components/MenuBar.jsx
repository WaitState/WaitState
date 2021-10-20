import React from "react";
import { Meteor } from "meteor/meteor";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  Box,
  Toolbar,
  Menu,
  Drawer,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  InputBase,
  IconButton,
  Dialog,
  DialogTitle,
  Divider,
} from "@mui/material";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Hospitals } from "../../api/hospital/Hospital";
const MyAppBar = styled(AppBar)({
  backgroundColor: "#0a9396",
});

const MenuBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerAnchorEl, setDrawerAnchorEl] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [data, setData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const isDrawerOpen = Boolean(drawerAnchorEl);
  const isProfileMenuOpen = Boolean(anchorEl);
  const isSiteAdmin =
    Roles.userIsInRole(Meteor.userId(), "admin") ||
    Roles.userIsInRole(Meteor.userId(), "Site Admin");

  const isHospitalAdmin =
    Roles.userIsInRole(Meteor.userId(), "admin") ||
    Roles.userIsInRole(Meteor.userId(), "Hospital Admin");

  const isPatient =
      Roles.userIsInRole(Meteor.userId(), "Patient")

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

  const handleSearch = () => {
    console.log(searchValue);
    setData(
      Hospitals.find(
        { facilityName: { $regex: searchValue, $options: "i" } },
        { limit: 15 }
      ).fetch()
    );
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
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
        <ListItem button component={Link} to={"/"} >
          <img src="https://i.ibb.co/898sp8Q/Untitled-2.png" width="100" height="50"></img>
        </ListItem>
          {[
            ["Hospital Directory", "/directory"],
          ].map((text, index) => (
            <ListItem button component={Link} to={text[1]} key={text[0]}>
              <ListItemText primary={text[0]} />
            </ListItem>
          ))}
          <Divider />
          {/* Admin Menu Options */}
          {isSiteAdmin ? (
            <div>
              <ListItem button component={Link} to="/addadmin">
                <ListItemText primary={"Add Admin"} />
              </ListItem>
            </div>
          ) : null}
          {isHospitalAdmin ? (
            <div>
              <ListItem button component={Link} to="/adminpanel">
                <ListItemText primary="Admin Panel" />
              </ListItem>
            </div>
          ) : null}
          { isPatient ? (
              <div>
                <ListItem button component={Link} to="/ticket">
                  <ListItemText primary="Patient Ticket" />
                </ListItem>
              </div>
          ) : null}
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
      <MyAppBar position="static">
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
          <Box sx={{flexGrow: 1}} />
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
      </MyAppBar>
      {renderProfileMenu}
    </Box>
  );
};

MenuBar.propTypes = {
  ready: PropTypes.bool.isRequired,
};

const MenuBarContainer = withTracker(() => {
  const subscription = Meteor.subscribe("Hospital");

  return {
    ready: subscription.ready(),
  };
})(MenuBar);
export default withRouter(MenuBarContainer);
