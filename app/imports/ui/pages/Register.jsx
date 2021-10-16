import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";
import { useState, useEffect } from "react";
import {Button, Input, Typography} from '@mui/material';
import { makeStyles } from "@mui/styles";
  
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

export default Register = ({ history }) => {
    const classes = useStyles();
  
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
     // Meteor.call("createAccount", firstname, lastname, email, password, "user");
     // history.push("/Login");
    };
    return (
        <div className={classes.container}>
        <Typography variant="h3">Register</Typography>
        {error && <span className={classes.error}>{error}</span>}
        <form onSubmit={handleSubmit}>
          <Input
            fullWidth
            className={classes.input}
            id="firstname"
            name="firstname"
            placeholder="First Name"
            onChange={(e) => setFirstname(e.target.value)}
          ></Input>
          <Input
            fullWidth
            className={classes.input}
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            onChange={(e) => setLastname(e.target.value)}
          ></Input>
          <Input
            fullWidth
            className={classes.input}
            id="email"
            name="email"
            placeholder="Email"
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
            {" "}
            Register
          </Button>
        </form>
        <span>or</span>
        <Button
          variant="contained"
        //   onClick={(e) => history.push("/login")}
        >
          Log in
        </Button>
      </div>
        
    );
};
