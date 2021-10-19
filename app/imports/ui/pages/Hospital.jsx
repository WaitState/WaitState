import React from "react";
import { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { styled } from "@mui/system";
import {
  Button,
  Input,
  Typography,
  Paper,
  Container,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Hospitals } from "../../api/hospital/Hospital";
import PropTypes from "prop-types";

const MyContainer = styled(Paper)({
  background: "#F5F5F5",
  display: "flex",
  flexDirection: "column",
  margin: "150px auto",
  padding: " 3em 2em",
  textAlign: "center",
  alignItems: "center",
  width: "280px",
});

const Information = styled(Container)({
  display: "flex",
  flexDirection: "column",
  width: "95%",
  textAlign: "left",
});

const SubHeadingTypography = styled(Typography)({
  textDecoration: "underline",
  textDecorationColor: "#03B591",
  margin: "5px 0",
});

const HospitalPage = (props) => {
  const { ready } = props;
  const params = useParams();
  var hospital = [];
  if (hospital.length === 0) {
    hospital = Hospitals.find({ facilityID: params.hid }).fetch();
  }
  console.log(hospital);
  const handleBackButton = (e) => {
    e.preventDefault();
    // <CircularProgress color="inherit" />;
    props.history.push("/directory/");
  };
  return (
    <MyContainer>
      {ready ? (
        <>
          <Typography variant="h5">{hospital[0].facilityName}</Typography>
          <Information>
            <SubHeadingTypography variant="h6">Address</SubHeadingTypography>
            <Typography>{hospital[0].address}</Typography>
            <Typography>
              {hospital[0].city +
                `, ` +
                hospital[0].state +
                `, ` +
                hospital[0].zipCode}
            </Typography>
            <SubHeadingTypography variant="h6">
              Phone Number
            </SubHeadingTypography>
            <Typography>{hospital[0].phoneNumber}</Typography>
            <SubHeadingTypography variant="h6">Status</SubHeadingTypography>
            <Typography>
              {`Current Patients: ` + hospital[0].patientList}
            </Typography>
            <Typography>
              {`Wait time: ` + hospital[0].averageWaitTime}
            </Typography>
          </Information>
        </>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Button
        variant="contained"
        sx={{ margin: "20px 0", background: "#03B591" }}
        onClick={handleBackButton}
      >
        Back
      </Button>
    </MyContainer>
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
