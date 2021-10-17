import React from "react";
import { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { makeStyles } from "@mui/styles";
import { Button, Input, Typography } from "@mui/material";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "150px auto",
    textAlign: "center",
    alignItems: "center",
    width: "35%",
  },
  input: {
    width: "100%",
    height: "50px",
    margin: "15px 0",
  },
});

export default AdminLogin = ({ history }) => {
  const classes = useStyles();
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
    <div className={classes.container}>
      <Typography variant="h3">Admin Login</Typography>
      {error && <span className={classes.error}>{error}</span>}
      <form onSubmit={handleSubmit}>
        <Input
          fullWidth
          className={classes.input}
          id="email"
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          fullWidth
          className={classes.input}
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></Input>

        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};
