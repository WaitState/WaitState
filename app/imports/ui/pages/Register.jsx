//this page is used to create hospital admins
import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Typography,
  TextField,
  Autocomplete,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Hospitals } from "../../api/hospital/Hospital";

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

const Register = (props) => {
  const classes = useStyles();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hospital, setHospital] = useState("");
  const [error, setError] = useState("");
  const { ready, history } = props;
  const roles = ["Hospital Admin", "Site Admin", "Temp User"];
  const hospitalDocument = Hospitals.find().fetch();
  var arrayOfHospitals = hospitalDocument.map((item) => item.facilityName);

  //remove duplicated element from hospital array
  arrayOfHospitals = arrayOfHospitals.filter((v, i, a) => a.indexOf(v) === i);
  //console.log(inputValue);
  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call(
      "createAccount",
      firstname,
      lastname,
      email,
      password,
      roles[0],
      hospital
    );
    history.push("/admin/login");
  };

  return (
    <div className={classes.container}>
      <Typography variant="h3">Register</Typography>
      <br />
      {error && <span className={classes.error}>{error}</span>}
      <form onSubmit={handleSubmit}>
        <Autocomplete
          id="grouped-demo"
          options={arrayOfHospitals}
          inputValue={hospital}
          onInputChange={(event, newInputValue) => {
            setHospital(newInputValue);
          }}
          sx={{ width: 500 }}
          renderInput={(params) => (
            <TextField {...params} label="Choose a Hospital" />
          )}
        />
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
      <Button variant="contained" onClick={(e) => history.push("/admin/login")}>
        Log in
      </Button>
    </div>
  );
};

Register.propTypes = {
  ready: PropTypes.bool.isRequired,
};

const RegisterContainer = withTracker(() => {
  const subscription = Meteor.subscribe("Hospital");

  return {
    ready: subscription.ready(),
  };
})(Register);

export default RegisterContainer;
