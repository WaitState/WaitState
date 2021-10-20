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
  Table,
  Button,
  TextField,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Patients } from "../../api/patient/Patient";
import swal from "sweetalert";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Hospitals } from '../../api/hospital/Hospital';
import { withRouter } from 'react-router-dom';

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
  fontSize: "xx-large",
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
  fontWeight: "bold",
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

  const { hospital } = props;
  console.log("hospital", hospital)

  var currentTime = ""
  var id = ""
  hospital.map((result) => {
    currentTime = result.averageWaitTime;
    id = result._id;
  });

  //this needs to go to handleUpdate
  console.log("ID :", id)
  //right info
  console.log("Time: ", currentTime);
  const [currentWaitTime, setCurrentTime] = React.useState("");
  const hospitalRecordID = id;
  const [patientID, setPatientID] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [toDelete, setToDelete] = React.useState(null);

  const generateID = () => {
    const tempID = Math.floor(Math.random() * 100000).toString();
    const uniqueTest = Patients.find({ patientID: tempID }).fetch();
    if (uniqueTest.length === 0) {
      setPatientID(tempID);
    } else {
      generateID();
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    //document ID
    //average waitTime
    //
    // const location = Meteor.users
    //     .find({ _id: Meteor.userId }, { limit: 1 })
    //     .fetch();

    const hospitalRecord = hospitalRecordID;

    console.log("Hospital to update: ", hospitalRecord);
    //This is good
    console.log("CurrentWait Time Prior to update: ", currentWaitTime)
    var currentHostpitalRecord = {_id: hospitalRecord}
    var newTime = {$set: {averageWaitTime: currentWaitTime }}

    Hospitals.update(currentHostpitalRecord, newTime, function (err,res) {
      if (err) {
        swal("Error", error.message, "error").then(function () {
              window.location = "/#/adminpanel";
            }
        )
      } else {
        swal({
          text: "Success!",
          icon: "success",
        }).then(function () {
          window.location = "/#/adminpanel";
        });
      }
    })
  } //end handleUpdate

  const handleSubmit = (event) => {
    //submit into the correction collection
    event.preventDefault();
    const adminUser = Meteor.users
        .find({ _id: Meteor.userId }, { limit: 1 })
        .fetch();
    const adminID = adminUser[0]._id;
    const hospital = adminUser[0].profile.hospital;
    const checkInTime = new Date().toString();
    const firstname = firstName;
    const lastname = lastName;
    const email = patientID + "@temp.com";
    const roles = "";
    const password = "password";
    const patients = Patients.find({hospital: hospital}).fetch();
    const qPos = patients.length + 1;
    console.log(qPos);
    Meteor.call(
        "createAccount",
        firstname,
        lastname,
        email,
        password,
        roles,
        hospital,
        (err) => {
          if (err) {
            setError(err.reason);
          }
        }
    );
    Patients.insert(
        {
          patientID,
          firstName,
          lastName,
          reason,
          checkInTime,
          adminID,
          hospital,
          qPos,
        },
        (error) => {
          if (error) {
            swal("Error", error.message, "error").then(function () {
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

  const matchAdmin = Meteor.users
      .find({ _id: Meteor.userId }, { limit: 1 })
      .fetch();
  const matchHospital = matchAdmin[0].profile.hospital;

  // Grab rows where the hospital value is equal to the hospital connected to the admin.
  const rows = Patients.find({ hospital: matchHospital }).fetch();

  // // A selected patient row where Patient is removed if selected patientID is = Patient.patientID
  // const deletePatient = (selectedPatient) => {
  //   Meteor.users.remove(rows.filter((user) => user.patientID === selectedPatient.patientID));
  //   console.log(selectedPatient.patientID);
  // }

  const handleDelete = (e) => {
    e.preventDefault();
    const patientCheck = Patients.find({ patientID: toDelete }).fetch();
    console.log(patientCheck);
    const patientId = patientCheck[0]._id;
    console.log(patientId);
    const email = toDelete.toString()+"@temp.com";
    console.log(email);
    const userCheck = Meteor.users.find({}).fetch();
    console.log(userCheck);
    const userId = userCheck[0]._id;
    Meteor.users.remove({ _id: userId });
    Patients.remove( { _id: patientId  });
  }

  // Create columns for grid Table
  const columns = [
    { field: 'Patient ID', editable: true, width: '150', valueGetter: (params) => `${params.row.patientID}` },
    { field: 'First Name', editable: true, width: '150', valueGetter: (params) => `${params.row.firstName}` },
    { field: 'Last Name', editable: true,  width: '150', valueGetter: (params) => `${params.row.lastName}` },
    { field: 'Reason', editable: true, width:'150', valueGetter: (params) => `${params.row.reason}` },
    { field: 'Hospital', editable: true, width:'150', valueGetter: (params) => `${params.row.hospital}` },
    { field: 'Admin ID', editable: true, width:'200', valueGetter: (params) => `${params.row.adminID}` },
    { field: 'Queue Position', editable: true, width:'150', valueGetter: (params) => `${params.row.qPos}` },
    { field: 'Delete', width:'100', renderCell: (patientID) => (
          <Button
              variant="contained"
              color="primary"
              onClick={() => deletePatient(patientID)}
          >
            Delete
          </Button>
          )
    },
];

  return (
      <AdminContainer>
        <PageHeader> Administrator Panel</PageHeader>
        <PanelHeader>Check In a New Patient</PanelHeader>
        <form onSubmit={handleSubmit}>
          <AdminTable>
            <Header>
              <RowEven>
                <CellHeader>
                  Patient ID:
                  {patientID}
                </CellHeader>
                <CellHeader>
                  First Name
                  <TextField
                      id="patient first Name"
                      label="patient first Name"
                      type="Patient first Name"
                      placeholder="Bob"
                      onChange={(e) => setFirstName(e.target.value)}
                  >
                    {" "}
                  </TextField>
                </CellHeader>
                <CellHeader>
                  Last Name
                  <TextField
                      id="patient last  Name"
                      label="patient last Name"
                      type="Patient last Name"
                      placeholder="Smith"
                      onChange={(e) => setLastName(e.target.value)}
                  >
                    {" "}
                  </TextField>
                </CellHeader>
                <CellHeader>
                  Reason
                  <TextField
                      id="reason"
                      label="reason"
                      type="reason"
                      placeholder="hurt foot"
                      onChange={(e) => setReason(e.target.value)}
                  >
                    {" "}
                  </TextField>
                </CellHeader>
              </RowEven>
            </Header>
          </AdminTable>
          <SubmitPatientButton variant="contained" onClick={generateID}>
            Generate unique patientID
          </SubmitPatientButton>
          <SubmitPatientButton type="submit" variant="contained">
            Add New Patient
          </SubmitPatientButton>
        </form>

        <PanelHeader>Change Weighted Wait Time</PanelHeader>

        <form onSubmit={handleUpdate}>
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
                <CellRow>{currentTime} </CellRow>
                <CellRow>
                  <TextField
                      id="changeTime"
                      label="changeTime"
                      type="Change Time"
                      placeholder={currentTime}
                      onChange={(e) => setCurrentTime(e.target.value)}>
                  </TextField>
                </CellRow>
                <CellRow /*Submit The Changes*/>Submit
                  <Button type="submit" variant="contained">
                    Change Average Wait Time
                  </Button>
                </CellRow>
              </RowOdd>
            </TableBody>
          </AdminTable>
        </form>

        <form onSubmit={handleDelete}
        >
          <input
          type="text" id="patientSelect"
          onChange={(e) => setToDelete(e.target.value)}
          />
          <Button type="submit">
            Submit
          </Button>
        </form>

        <PanelHeader>List of Current Patients </PanelHeader>
        <div style={{ height: 250, width: '100%' }}>
          <DataGrid
              getRowId={(r) => r._id}
              rows={rows}
              columns={columns}
              checkboxSelection
          />
        </div>
      </AdminContainer>
  );
};

AdminPanel.propTypes = {
  hospital: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

const AdminPanelContainer = withTracker(() => {
  const subscription = Meteor.subscribe("Patient");
  const userSubscription = Meteor.subscribe('allUsers');
  const hospitalSubscription = Meteor.subscribe("Hospital");
  const facility = Meteor.users
      .find({ _id: Meteor.userId }, { limit: 1 })
      .fetch();
  const match = facility[0].profile.hospital;
  return {
    hospital: Hospitals.find({ facilityID: match }).fetch(),
    ready: subscription.ready() && hospitalSubscription.ready() && userSubscription,
  };
})(AdminPanel);

export default withRouter(AdminPanelContainer);
