import React from "react";
import { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { styled } from "@mui/system";
import { Typography, Container, List, ListItem, Card, CardActions, CardContent, CardMedia } from "@mui/material";

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

export default Ticket = ({ history }) => {
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

