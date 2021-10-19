import React from "react";
import { Meteor } from "meteor/meteor";
import { styled } from "@mui/system";
import {
  Typography,
  Container,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table, Button, Box, Input, TextField
} from "@mui/material";
import { Patients } from '../../api/patient/Patient';
import { Hospitals } from '../../api/hospital/Hospital';
import swal from 'sweetalert';
import { Accounts } from 'meteor/accounts-base';

//style the outer container
const AdminContainer = styled(Container)({
  //background: "#03B591",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  margin: "50px auto",
  textAlign: "center",
  alignItems: "center",
  width: "90%",
  fontSize: 'xx-large',

});

//Style the entire table
const AdminTable = styled(Table)({

  margin: "15px auto",

});

//Style the Header of the table
const Header = styled(TableHead)({});

//For header and even Rows to change the color
const RowEven = styled(TableRow)({

  background: "#FFFFFF",
  borderStyle: "Solid",
  borderRight: "Solid",
  borderLeft: "Solid",

});

//For all odd rows
const RowOdd = styled(TableRow)({

  background: "#D3D3D3",
  borderStyle: "Solid",
  borderRight: "Solid",
  borderLeft: "Solid",

});

//Stylize the Cells in the header
const CellHeader = styled(TableCell)({
  borderTop: "Solid",
  borderLeft: "Solid",
  borderRight: "Solid",
  borderBottom: "Solid",

  
});

//Stylize the cells NOt in the header
const CellRow = styled(TableCell)({
  borderBottom: "Solid",
});

const PageHeader = styled(Typography)({
  fontSize: "75px",
  fontWeight: 'bold',
  marginBottom: "10px",

});

const PanelHeader = styled(Typography)({
  fontSize: "30px",
  textDecoration: "underline",
  marginBottom: "5px",
  marginTop: "10px",

});

const SubmitPatientButton = styled(Button)({
  background: "#03B591",
  margin: "10px",
  fontSize: "17px",

});

const AdminPanel = (props) => {

  //Set chekInUserID OR patientID should be created by us to be random
  const [patientId, setPatientId] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [reason, setReason] = React.useState("");
  //Set chekInUserID OR patientID should be created by us to be random


  const handleSubmit = (event) => {
    //submit into the correction collection
    event.preventDefault();
    const adminUser = Meteor.users.find({ _id: Meteor.userId }, { limit: 1}).fetch();
    console.log(adminUser);
    const adminID = adminUser[0]._id;
    const hospital = adminUser[0].profile.hospital;
    const checkInTime = new Date();
    console.log(checkInTime)
    Patients.insert(
        {
          patientId,
          firstName,
          lastName,
          reason,
          checkInTime,
          adminID,
          hospital,
        }, (error) => {
          if (error) {
            swal("Error", "Missing required fields", "error").then(function () {

              window.location = "/#/adminpanel";
            });
          } else {
            swal({
              text: "Success!",
              icon: "success",
            }).then(function () {
              window.location = "/#/adminpanel";
            });
          }
        }
    );

  };

  return (

      <AdminContainer>
        <PageHeader> Administrator Panel</PageHeader>

        <PanelHeader>Check In a New Patient</PanelHeader>
        <form onSubmit={handleSubmit}>
        <AdminTable>
          <Header>
            <RowEven>
              <CellHeader>
                Patient ID
                <TextField
                    id="patientID"
                    label="patientID"
                    type="patientID"
                    placeholder="XX1234"
                    onChange={(e) => setPatientId(e.target.value)}
                > </TextField>
              </CellHeader>
              <CellHeader>
                  First Name
                <TextField
                    id="patient first Name"
                    label="patient first Name"
                    type="Patient first Name"
                    placeholder="Bob"
                    onChange={(e) => setFirstName(e.target.value)}
                > </TextField>
              </CellHeader>
              <CellHeader>Last Name

                <TextField
                    id="patient last  Name"
                    label="patient last Name"
                    type="Patient last Name"
                    placeholder="Smith"
                    onChange={(e) => setLastName(e.target.value)}
                > </TextField></CellHeader>

              <CellHeader>Reason
                <TextField
                    id="reason"
                    label="reason"
                    type="reason"
                    placeholder="hurt foot"
                    onChange={(e) => setReason(e.target.value)}
                > </TextField>
              </CellHeader>
              <CellHeader>Check In Status
                <TextField
                    id="date"
                    label=""
                    type="date"
                    placeholder=""
                    onChange={(e) => setCheckInTime(e.target.value)}
                > </TextField>
              </CellHeader>
              <CellHeader>Check-In Status
                <TextField
                    id="checked in"
                    label="checked in"
                    type="boolean"
                    placeholder="false"
                    onChange={(e) => setCheckInStatus(e.target.value)}
                > </TextField>
              </CellHeader>
              <CellHeader>Check-In Time
                <TextField
                    id="check in time"
                    label="check in time"
                    type="check in time"
                    placeholder="9:00 AM"
                    onChange={(e) => setCheckInTime(e.target.value)}
                > </TextField>
              </CellHeader>
              <CellHeader>Checked-Out
                <TextField
                    id="checked Out"
                    label="checked out"
                    type="checked out"
                    placeholder=""
                    onChange={(e) => setCheckOutTime(e.target.value)}
                > </TextField>
              </CellHeader>
            </RowEven>
          </Header>
        </AdminTable>
        <SubmitPatientButton
        type="submit"
        variant= "contained"
        >
          Add New Patient
        </SubmitPatientButton>
        </form>

        <PanelHeader>Change Weighted Wait Time</PanelHeader>

        <AdminTable>
          <Header>
            <RowEven>
              <CellHeader>Current Time</CellHeader>
              <CellHeader>Change To</CellHeader>
              <CellHeader> </CellHeader>
            </RowEven>
          </Header>
          <TableBody>
            <RowOdd>
              <CellRow /*Display Current Time */> </CellRow>
              <CellRow /*Change Time TO*/> </CellRow>
              <CellRow /*Submit The Changes*/>Submit</CellRow>
            </RowOdd>
          </TableBody>
        </AdminTable>

        <PanelHeader>List of Current Patients </PanelHeader>
        <AdminTable>
          <Header>
            <RowEven>
              <CellHeader>ID </CellHeader>
              <CellHeader>Patient First Name </CellHeader>
              <CellHeader>Patient Last Name </CellHeader>
              <CellHeader>Reason </CellHeader>
              <CellHeader>Created At</CellHeader>
              <CellHeader>Check-In Status</CellHeader>
              <CellHeader>Check-In Time</CellHeader>
              <CellHeader>Check-Out Time</CellHeader>
              <CellHeader> </CellHeader>
            </RowEven>
          </Header>

          <TableBody>

            <RowOdd /*Loop through the patient records and display them */>
              <CellRow>test id</CellRow>
              <CellRow>test first name</CellRow>
              <CellRow>test last name</CellRow>
              <CellRow>test reason</CellRow>
              <CellRow>test created</CellRow>
              <CellRow>test status</CellRow>
              <CellRow>test time In</CellRow>
              <CellRow>test time Out</CellRow>
              <CellRow /*onClick={(e) => history.push("/patientPage")}} */>edit patient info</CellRow>


            </RowOdd>

            <RowEven /*Loop through the patient records and display them */>
              <CellRow>test id</CellRow>
              <CellRow /*patient.name */>test first name</CellRow>
              <CellRow /*patient.name */>test last name</CellRow>
              <CellRow>test reason</CellRow>
              <CellRow>test created</CellRow>
              <CellRow>test status</CellRow>
              <CellRow>test time</CellRow>
              <CellRow>test time out</CellRow>
              <CellRow /* Allow Admin to edit all the patient info here if clicked*/>edit patient info</CellRow>


            </RowEven>
          </TableBody>
        </AdminTable>


      </AdminContainer>

  );

};

export default AdminPanel;
