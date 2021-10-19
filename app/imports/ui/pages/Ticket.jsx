import React from "react";
import { useState, useEffect } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { withRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { Button, Typography, Container, List, ListItem, Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Hospitals } from '../../api/hospital/Hospital';
import Hospital from './Hospital';


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
const waitTime = 15;
const checkInTime = new Date();
const reason = "knife cuts"

// which hositpal
// number patients at that hostipal

const Ticket = (props) => {
  console.log("props: ", props);

  const { curenntHospital} = props;
  // const  { user } = props;
  //
  //
  // var facilityID = ""
  // user.map((result) => {
  //   facilityID = result.facilityID;
  // });

  console.log("USer Id " ,  Meteor.userId())
  //console.log("Facility " ,  facilityID)
  return (

    <MyContainer>

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
          Estimated Check-In Time: {checkInTime.getHours() + ":" + checkInTime.getMinutes()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reason of Visit: {reason}
        </Typography>
      </CardContent>
    </Card>
    </MyContainer>
  );
};

//Modelled after the Vaccination Page from
// Covid Trail
Ticket.propTypes = {
  hospital: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

const TicketContainer = withTracker(() => {
  const subscription = Meteor.subscribe("Hospital");
  return {
    hospital: Hospitals.find({facilityID: "10001"}).fetch(),
    ready: subscription.ready(),
  };
})(Ticket);

export default withRouter(TicketContainer);

