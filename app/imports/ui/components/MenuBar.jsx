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

function SearchDialog(props) {
  const { data, onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Hospitals</DialogTitle>
      <List sx={{ pt: 0 }}>
        {data.map((hospital) => (
          <ListItem
            button
            onClick={() => handleListItemClick(data)}
            key={hospital.facilityName}
          >
            <ListItemText primary={hospital.facilityName} />
          </ListItem>
        ))}
        <ListItem
          button
          component={Link}
          onClick={handleClose}
          to="/directory"
          key="more"
        >
          <ListItemText sx={{ color: "blue" }} primary="See full directory" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SearchDialog.propTypes = {
  data: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

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
          {[
            ["WaitState", "/"],
            ["Hospital Directory", "/directory/"],
          ].map((text, index) => (
            <ListItem button component={Link} to={text[1]} key={text[0]}>
              <ListItemText primary={text[0]} />
            </ListItem>
          ))}
          <Divider />
          {/* Admin Menu Options */}
          {isSiteAdmin == true && (
            <div>
              <ListItem button component={Link} to="/register">
                <ListItemText primary={"Add Admin"} />
              </ListItem>
            </div>
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
          <SearchBox>
            <form onSubmit={handleSearch}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search hospitals"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
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
      </MyAppBar>
      {renderProfileMenu}
      <SearchDialog data={data} open={openDialog} onClose={closeDialog} />
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
export default MenuBarContainer;
