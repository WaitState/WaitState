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
import { styled } from "@mui/system";
import { Hospitals } from "../../api/hospital/Hospital";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  margin: "150px auto",
  textAlign: "center",
  alignItems: "center",
  width: "35%",
});

const Error = styled("span")({
  color: "red",
  marginBottom: "10px",
});

const MyInput = styled(Input)({
  width: "100%",
  height: "50px",
  margin: "15px 0",
});

const Register = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [error, setError] = useState("");
  const { ready, history } = props;
  const role = "Hospital Admin";
  const hospitalDocument = Hospitals.find().fetch();
  var arrayOfHospitals = hospitalDocument.map((item) => item.facilityName);

  //remove duplicated element from hospital array
  arrayOfHospitals = arrayOfHospitals.filter((v, i, a) => a.indexOf(v) === i);
  //console.log(inputValue);
  const handleSubmit = (e) => {
    e.preventDefault();
    const hospitalObject = Hospitals.find(
      { facilityName: hospitalName },
      { limit: 1 }
    ).fetch();
    const hospital = hospitalObject[0].facilityID;
    Meteor.call(
      "createAccount",
      firstname,
      lastname,
      email,
      password,
      role,
      hospital,
      (err) => {
        if (err) {
          setError(err.reason);
        } else {
          history.push("/");
        }
      }
    );
  };

  return (
    <Container>
      <Typography variant="h3">Register</Typography>
      <br />
      {error && <Error>{error}</Error>}
      <form onSubmit={handleSubmit}>
        <Autocomplete
          id="grouped-demo"
          options={arrayOfHospitals}
          inputValue={hospitalName}
          onInputChange={(event, newInputValue) => {
            setHospitalName(newInputValue);
          }}
          sx={{ width: 500 }}
          renderInput={(params) => (
            <TextField {...params} label="Choose a Hospital" />
          )}
        />
        <MyInput
          fullWidth
          id="firstname"
          name="firstname"
          placeholder="First Name"
          onChange={(e) => setFirstname(e.target.value)}
        ></MyInput>
        <MyInput
          fullWidth
          id="lastname"
          name="lastname"
          placeholder="Last Name"
          onChange={(e) => setLastname(e.target.value)}
        ></MyInput>
        <MyInput
          fullWidth
          id="email"
          name="email"
          placeholder="Email"
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
        <Button
          variant="contained"
          sx={{ background: "#03B591" }}
          type="submit"
        >
          {" "}
          Register
        </Button>
      </form>
    </Container>
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
