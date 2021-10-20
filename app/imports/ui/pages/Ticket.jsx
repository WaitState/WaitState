import React from "react";
import { useState, useEffect } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { withRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import {
  Button,
  Typography,
  Container,
  List,
  ListItem,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  CardMedia,
  Backdrop,
  Media,
} from "@mui/material";
import { Hospitals } from "../../api/hospital/Hospital";
import Hospital from "./Hospital";
import { Patients } from "../../api/patient/Patient";
import { useParams } from "react-router-dom";

const MyContainer = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  margin: "150px auto",
  textAlign: "center",
  alignItems: "center",
  width: "60%",
});
const id = "ABC1234";
var waitTime = 15;
const checkInTime = new Date();
const reason = "knife cuts";


const Ticket = (props) => {
  var numbPatients = "";
  var average = "";
  const { ready, patient } = props;
  const [hospital, setHospital] = React.useState([]);
  if (ready && hospital === []) {
    setHospital(Hospitals.find({ facilityID: patient[0].hospital }).fetch());
  }
  console.log(patient, hospital);
  hospital.map((result) => {
    numbPatients = result.patientList.length - 1;
    average = result.averageWaitTime;
  });

  waitTime = numbPatients * average;

  return (
    <MyContainer>
      {ready ? (
        <div>
      <Typography variant="h4">Ticket ID: {id}</Typography>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://i.ibb.co/rfJ4LSB/patient-waiting-room.jpg"
          alt="Patient-Loading"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Wait Time: {waitTime} mins
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            Estimated Check-In Time:{" "}
            {checkInTime.getHours() + ":" + checkInTime.getMinutes()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Reason of Visit: {reason}
          </Typography>
        </CardContent>
      </Card>
      </div>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </MyContainer>
  );
};

//Modelled after the Vaccination Page from
// Covid Trail
Ticket.propTypes = {
  ready: PropTypes.bool.isRequired,
  patient: PropTypes.array,
};

const TicketContainer = withTracker(() => {
  const subscription = Meteor.subscribe("Hospital");
  const patientSub = Meteor.subscribe("Patient");
  const params = useParams();
  return {
    //Facility ID will need to be changed to match the hospital the patient is
    //actually at
    ready: subscription.ready() && patientSub.ready(),
    patient: Patients.find({ patientID: params.pid }, { limit: 1 }).fetch(),
  };
})(Ticket);

export default withRouter(TicketContainer);
