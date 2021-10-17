import React from "react";
import PropTypes from "prop-types";
import { ListItemButton, ListItemText } from "@mui/material";

class HospitalListItem extends React.Component {
    render() {
        console.log(this.props.item)
        return (
            <ListItemButton>
                <ListItemText primary={this.props.item} />
            </ListItemButton>
        )
    }
}

HospitalListItem.propTypes = {
    item: PropTypes.string.isRequired,
}

export default HospitalListItem;