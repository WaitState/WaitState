import React from "react";
import { Meteor } from "meteor/meteor";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AppBar, Box, Toolbar, Menu, Drawer, List, ListItem, ListItemText, MenuItem, InputBase, IconButton } from "@mui/material";
import { Link, withRouter } from "react-router-dom";

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
      <MenuItem onClick={handleClose}>Login</MenuItem>
      <MenuItem onClick={handleClose}>Signup</MenuItem>
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
