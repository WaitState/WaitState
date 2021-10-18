import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import { Hospitals } from "../../api/hospital/Hospital";
import {
  Container,
  Box,
  CircularProgress,
  Backdrop,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Button,
  Pagination,
  Paper,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";

const Directory = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [searchString, setSearchString] = React.useState(null);
  const [directory, setDirectory] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuIndex, setMenuIndex] = React.useState(3);
  const [searchField, setSearchField] = React.useState("state");
  const { ready } = props;
  const searchFields = [
    { label: "Name", field: "facilityName" },
    { label: "Address", field: "address" },
    { label: "City", field: "city" },
    { label: "State", field: "state" },
    { label: "Zipcode", field: "zipCode" },
    { label: "County", field: "countyName" },
  ];
  const params = useParams();
  const isMenuOpen = Boolean(anchorEl);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (event, index) => {
    setMenuIndex(index);
    setSearchField(searchFields[index].field);
    setAnchorEl(null);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleSubmit = () => {
    console.log(searchField);
    var query = {};
    query[searchField] = { $regex: searchString, $options: "i" };
    if (searchString === null) {
      setDirectory(Hospitals.find({ state: "HI" }).fetch());
    } else {
      setDirectory(Hospitals.find(query).fetch());
    }
  };

  return (
    <Box>
      {!Boolean(ready) ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Container sx={{ display: "flex", alighItems: "center" }}>
          <Grid sx={{ justifyContent: "center", width: "100%" }}>
            <Grid
              item
              component="form"
              autoComplete="true"
              onSubmit={handleSubmit}
              xs={12}
              sx={{ paddingTop: "10px" }}
            >
              <TextField
                id="search-field"
                label="search"
                defaultValue=""
                onChange={(e) => setSearchString(e.target.value)}
              />
              <List component="nav">
                <ListItem
                  button
                  id="field-button"
                  aria-controls="field-menu"
                  aria-expanded={isMenuOpen ? "true" : undefined}
                  onClick={openMenu}
                >
                  <ListItemText
                    primary="Search Field"
                    secondary={"Search By " + searchFields[menuIndex].label}
                  />
                </ListItem>
              </List>
              <Menu
                id="field-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                MenuListProps={{
                  "aria-labelledby": "menu-button",
                  role: "listbox",
                }}
              >
                {searchFields.map((option, index) => (
                  <MenuItem
                    key={option.label}
                    selected={index === menuIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Menu>

              <Button type="submit">Submit</Button>
            </Grid>
            <Grid item>
              <Paper elevation={1}>
                <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "grey" }}>
                  <List component="nav" aria-label="directory-list-output">
                    {directory.map((item, index) => (
                      <ListItemButton
                        component={Link}
                        to={"/hospital/" + item.facilityID}
                        key={index}
                        selected={selectedIndex === 0}
                        onClick={(event) =>
                          handleListItemClick(event, { index })
                        }
                      >
                        <ListItemText primary={item.facilityName} />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
};

Directory.propTypes = {
  ready: PropTypes.bool.isRequired,
};

const DirectoryContainer = withTracker(() => {
  const subscription = Meteor.subscribe("Hospital");

  return {
    ready: subscription.ready(),
  };
})(Directory);

export default DirectoryContainer;
