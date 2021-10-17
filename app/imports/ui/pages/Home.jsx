import React from "react";
import { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { styled } from "@mui/system";
import { Button, Typography, Container, List, ListItem } from "@mui/material";

const MyContainer = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  margin: "150px auto",
  textAlign: "center",
  alignItems: "center",
  width: "60%",
});

const MyButton = styled(Button)({
  margin: "10px",
  background: "#03B591",
});

const SecondHeadingTypography = styled(Typography)({
  // background: "#43C59E",
  textDecoration: "underline",
  textDecorationColor: "#03B591",
  // margin: "50px 0 0 0",
  padding: "10px",
  borderRadius: "4px",
});

const Instructions = styled(List)({
  width: "calc(50vw)",
  alignItems: "center",
});
const Home = (props) => {
  return (
    <MyContainer>
      <Typography variant="h2">WaitState</Typography>
      <Container sx={{ margin: "30px 0 " }}>
        <MyButton
          variant="contained"
          // onClick={(e) => history.push("/search")}
        >
          Search Nearby Hospital
        </MyButton>
        <MyButton
          variant="contained"
          // onClick={(e) => history.push("/ticket")}
        >
          Check your Wait Time
        </MyButton>
      </Container>
      <SecondHeadingTypography variant="h4">
        Instructions
      </SecondHeadingTypography>
      <Instructions>
        <ListItem>
          1. Search Nearby Hospital to determine available hospitals.
        </ListItem>
        <ListItem>
          2. Once arrived, Health Desk worker will assist you and will prove a
          temporary login ID to access wait time status.
        </ListItem>
        <ListItem>
          3. Click Check Your Wait Time to view information on your wait time
          status.
        </ListItem>
      </Instructions>
    </MyContainer>
  );

};

export default Home;
