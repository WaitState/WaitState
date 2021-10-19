import React from "react";
import { Meteor } from "meteor/meteor";
import SearchIcon from "@mui/icons-material/Search";
import { Dialog, List, DialogTitle, ListItem, Button, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

const SearchDialog = (props) => {
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
          to={"/directory"}
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

export default withRouter(SearchDialog);