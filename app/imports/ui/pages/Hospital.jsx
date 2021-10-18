import React from "react";
import { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { styled } from "@mui/system";
import {
  Button,
  Input,
  Typography,
  Paper,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Hospitals } from "../../api/hospital/Hospital";
import PropTypes from "prop-types";

const Container = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  margin: "150px auto",
  padding: " 3em 3em",
  textAlign: "center",
  alignItems: "center",
  width: "250px",
});

const HospitalPage = (props) => {
  const { ready } = props;
  const params = useParams();
  console.log(params.hid);
  const hospital = Hospitals.find({ facilityID: params.hid }).fetch();
  return (
    <Container>
      {ready ? (
        <div>
          <Typography variant="h3">{hospital[0].facilityName}</Typography>
          <Typography>{hospital[0].city}</Typography>
          <Typography>{hospital[0].state}</Typography>
          <Typography>{hospital[0].zipCode}</Typography>
          <Typography>{hospital[0].county}</Typography>
        </div>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Container>
  );
};

HospitalPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

const HospitalPageContainer = withTracker(() => {
  const subscription = Meteor.subscribe("Hospital");

  return {
    ready: subscription.ready(),
  };
})(HospitalPage);

export default HospitalPageContainer;
