import React from "react";
import { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { styled } from "@mui/system";
import { Button, Input, Typography, Paper} from "@mui/material";

const Container = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  margin: "150px auto",
  padding: " 3em 3em",
  textAlign: "center",
  alignItems: "center",
  width: "250px",
});

export default Hospital = ({ history }) => {
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
};
