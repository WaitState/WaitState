import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from "prop-types";
import { Hospitals } from "../../api/hospital/Hospital";
import { Container, Box, CircularProgress, Backdrop } from "@mui/material";

const Directory = (props) => {
    const { ready } = props;

    return (
        <Box>
            {!Boolean(ready) ? (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme => theme.zIndex.drawer + 1 )}}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                <Container>
                    
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
