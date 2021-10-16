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

const handleSubmit = (e) => {
  e.preventDefault();
  // Meteor.call("createAccount", firstname, lastname, email, password, "user");
  // history.push("/Login");
};

export default AdminLogin = ({ history }) => {
  const classes = useStyles();
  const [error, setError] = useState("");
  return (
    <div className={classes.container}>
      <Typography variant="h3">Login</Typography>
      {error && <span className={classes.error}>{error}</span>}
      <form onSubmit={handleSubmit}>
        <Input
          fullWidth
          className={classes.input}
          id="email"
          name="email"
          placeholder="email"
          // onChange={(e) => setFirstname(e.target.value)}
        ></Input>
        <Input
          fullWidth
          className={classes.input}
          id="passwork"
          name="password"
          type="password"
          placeholder="Password"
          // onChange={(e) => setLastname(e.target.value)}
        ></Input>

        <Button variant="contained" type="submit">
          {" "}
          Login
        </Button>
      </form>
    </div>
  );
};
