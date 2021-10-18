import React from "react";
import { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { styled } from "@mui/system";
import { Button, Input, Typography, Paper} from "@mui/material";
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

  return (
    <Container>
       <Typography variant="h3"> Hospital
       </Typography>
       <Typography> City
       </Typography>
       <Typography> State
       </Typography>
       <Typography> ZipCode
       </Typography>
       <Typography> County
       </Typography>
    </Container>
  );
}

HospitalPage.propTypes = {
  ready: PropTypes.bool.isRequired,
}

const HospitalPageContainer = withTracker(() => {
  const subscription = Meteor.subscribe('Hospital');

  return {
    ready: subscription.ready(),
  };
})(HospitalPage);

export default HospitalPageContainer;
