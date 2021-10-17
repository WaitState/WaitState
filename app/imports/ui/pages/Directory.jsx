import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from "prop-types";
import { Hospitals } from "../../api/hospital/Hospital";
import { Container, Box, CircularProgress, Backdrop, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const Directory = (props) => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
}

    const { ready } = props;
    var directory = [];
    if (ready ) {
        directory = Hospitals.find({ state: "HI" }).fetch();
    }
    var arr = ["hello", "asdf"];
    return (
        <Box>
            {!Boolean(ready) ? (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme => theme.zIndex.drawer + 1) }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                <Container>
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'grey' }}>
                        <List component="nav" aria-label="main mailbox folders">
                            {directory.map((item, index) => (
                                <ListItemButton key={index} selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, {index})}>
                                    <ListItemText primary={item.facilityName} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Box>
                </Container>
            )}
        </Box>
    );
};

Directory.propTypes = {
    ready: PropTypes.bool.isRequired,
}

const DirectoryContainer = withTracker(() => {
    const subscription = Meteor.subscribe('Hospital');

    return {
        ready: subscription.ready(),
    }
})(Directory);

export default DirectoryContainer;
