import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from "prop-types";
import { UseParams } from "react-router-dom";
import { Hospitals } from "../../api/hospital/Hospital";
import { Container, Box, CircularProgress, Backdrop, List, ListItem, ListItemButton, ListItemText, TextField, Button } from "@mui/material";

const Directory = (props) => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [searchString, setSearchString] = React.useState(null);
    const [directory, setDirectory] = React.useState([]);
    const { ready } = props;

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    }

    const handleSubmit = (e) => {
        console.log(searchString);
        if (searchString === null) {
            setDirectory(Hospitals.find().fetch());       
        } else {
            setDirectory(Hospitals.find({ state: searchString }).fetch());
        }
    }

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
                <Container sx={{ display: 'flex', alighItems: 'center' }}>
                    <Box component="form" onSubmit={handleSubmit} sx={{ paddingTop: '10px' }}>
                            <TextField
                                helperText="Search by city"
                                id="search-field"
                                label="search-field"
                                defaultValue={null}
                                onChange={(e) => setSearchString(e.target.value)}
                            />
                            <Button type="submit">Submit</Button>
                    </Box>
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'grey' }}>
                        <List component="nav" aria-label="main mailbox folders">
                            {directory.map((item, index) => (
                                <ListItemButton key={index} selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, { index })}>
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
