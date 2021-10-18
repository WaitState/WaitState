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
  Table, Button, Box
} from "@mui/material";
import { Patients } from '../../api/patient/Patient';
import swal from 'sweetalert';

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

//For header and even Rows
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

const AdminPanel = (props) => {

  const [patientId, setPatientId] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [checkInStatus, setCheckInStatus] = React.useState("");
  const [checkInTime, setCheckInTime] = React.useState("");
  const [checkInUserID, setCheckInUserID] = React.useState("");


  const handleSubmit = event => {
    //submit into the correction collection
    event.preventDefault();

    Patients.insert(
        {
          patientId,
          firstName,
          lastName,
          reason,
          checkInStatus,
          checkInTime,
          checkInUserID,

        },(error) => {
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
        <PanelHeader>List of Current Patients </PanelHeader>
        <AdminTable>
          <Header>
            <RowEven>
              <CellHeader>ID </CellHeader>
              <CellHeader>Patient Name </CellHeader>
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
              <CellRow>test name</CellRow>
              <CellRow>test reason</CellRow>
              <CellRow>test created</CellRow>
              <CellRow>test status</CellRow>
              <CellRow>test time In</CellRow>
              <CellRow>test time Out</CellRow>
              <CellRow /*onClick={(e) => history.push("/patientPage")}} */>edit patient info</CellRow>


            </RowOdd>

            <RowEven /*Loop through the patient records and display them */>
              <CellRow>test id</CellRow>
              <CellRow /*patient.name */>test name</CellRow>
              <CellRow>test reason</CellRow>
              <CellRow>test created</CellRow>
              <CellRow>test status</CellRow>
              <CellRow>test time</CellRow>
              <CellRow>test time out</CellRow>
              <CellRow /*onClick={(e) => history.push("/patientPage")}} */>edit patient info</CellRow>


            </RowEven>
          </TableBody>
        </AdminTable>

        <PanelHeader>Add a New Patient</PanelHeader>
        <form onSubmit={handleSubmit}>

        </form>
      </AdminContainer>
  );

};

export default AdminPanel;
