import React from "react";
import { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { styled } from "@mui/system";
import { Button, Input, Typography } from "@mui/material";

const Container = styled('div')({
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

export default AdminLogin = ({ history }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        console.log(err.reason);
        setError(err.reason);
      } else {
        history.push("/");
        console.log(Accounts.users);
      }
    });
  };

  return (
    <Container>
      <Typography variant="h3">Admin Login</Typography>
      {error && <span>{error}</span>}
      <form onSubmit={handleSubmit}>
        <MyInput
          fullWidth
          
          id="email"
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></MyInput>
        <MyInput
          fullWidth
          
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></MyInput>

        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
};
