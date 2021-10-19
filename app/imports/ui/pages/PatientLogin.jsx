import React from "react";
import { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { styled } from "@mui/system";
import { Button, Input, Typography } from "@mui/material";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  margin: "150px auto",
  textAlign: "center",
  alignItems: "center",
  width: "35%",
});

const MyInput = styled(Input)({
  width: "100%",
  height: "50px",
  margin: "15px 0",
});

export default PatientLogin = ({ history }) => {
  const [uniqueID, setuniqueID] = useState("");
  const [error, setError] = useState("");
  const password = "password";

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(uniqueID, password, (err) => {
      if (err) {
        console.log(err.reason);
        setError(err.reason);
      } else {
        history.push("/ticket");
        console.log(Accounts.users);
      }
    });
  };

  return (
    <Container>
      <Typography variant="h3">Check Patient Status</Typography>
      {error && <span>{error}</span>}
      <form onSubmit={handleSubmit}>
        <MyInput
          fullWidth
          id="UniqueID"
          name="UniqueID"
          placeholder="Unique ID"
          onChange={(e) => setuniqueID(e.target.value)}
        ></MyInput>
        <Button variant="contained" type="submit">
          Check Status
        </Button>
      </form>
    </Container>
  );
};
