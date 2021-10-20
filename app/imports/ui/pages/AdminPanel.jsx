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
import { DataGrid } from "@mui/x-data-grid";
import { Patients } from "../../api/patient/Patient";
import swal from "sweetalert";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Hospitals } from "../../api/hospital/Hospital";
import { withRouter, useHistory } from "react-router-dom";

//style the outer container
const AdminContainer = styled(Container)({
  //background: "#03B591",
  display: "flex !important",
  justifyContent: "space-between !important",
  flexDirection: "column !important",
  margin: "50px auto !important",
  textAlign: "center !important",
  alignItems: "center !important",
  width: "90% !important",
  fontSize: "xx-large !important",
});

//Style the entire table
const AdminTable = styled(Table)({
  margin: "15px auto !important",
});

//Style the Header of the table
const Header = styled(TableHead)({});

//For header and even Rows to change the color
const RowEven = styled(TableRow)({
  background: "#FFFFFF !important",
  borderStyle: "Solid !important",
  borderRight: "Solid !important",
  borderLeft: "Solid !important",
});

//For all odd rows
const RowOdd = styled(TableRow)({
  background: "#D3D3D3 !important",
  borderStyle: "Solid !important",
  borderRight: "Solid !important",
  borderLeft: "Solid !important",
});

//Stylize the Cells in the header
const CellHeader = styled(TableCell)({
  borderTop: "Solid !important",
  borderLeft: "Solid !important",
  borderRight: "Solid !important",
  borderBottom: "Solid !important",
});

//Stylize the cells NOt in the header
const CellRow = styled(TableCell)({
  borderBottom: "Solid !important",
});

const PageHeader = styled(Typography)({
  fontSize: "75px !important",
  fontWeight: "bold !important",
  marginBottom: "10px !important",
});

const PanelHeader = styled(Typography)({
  fontSize: "30px !important",
  textDecoration: "underline !important",
  marginBottom: "5px !important",
  marginTop: "10px !important",
});

const MyTextField = styled(TextField)({
  boxSizing: "border-box !important",
  color: "rgba(0, 0, 0, 0.87) !important",
  height:"1.4375em !important",
  // padding:"18.5px 14px !important",
  fontSize: "1rem !important",
  // alignItems: "center !important",
  fontWeight: "400 !important",
  borderRadius: "4px !important",
  // boxSizing: "content-box !important",
})
const SubmitButton = styled(Button)({
  background: "#03B591 !important",
  color:"#fff !important",
  padding:"6px 16px !important",
  margin: "10px !important",
  fontWeight:"500 !important",
  fontSize:"0.875rem !important",
  borderRadius: "4px !important",
  boxShadow:"0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12) !important",
  transition:"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
  '&:hover' : {background: "#1565c0 !important", boxShadow:"0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12) !important"}
});

const AdminPanel = (props) => {
  const { hospital, ready, history } = props;
  console.log("hospital", hospital);

  var currentTime = "";
  var id = "";
  hospital.map((result) => {
    currentTime = result.averageWaitTime;
    id = result._id;
  });

  //this needs to go to handleUpdate
  console.log("ID :", id);
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
    console.log("CurrentWait Time Prior to update: ", currentWaitTime);
    var currentHostpitalRecord = { _id: hospitalRecord };
    var newTime = { $set: { averageWaitTime: currentWaitTime } };

    Hospitals.update(currentHostpitalRecord, newTime, function (err, res) {
      if (err) {
        swal("Error", error.message, "error").then(function () {
          history.replace("/adminpanel");
        });
      } else {
        swal({
          text: "Success!",
          icon: "success",
        }).then(function () {
          history.replace("/adminpanel");
        });
      }
    });
  }; //end handleUpdate

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
    const roles = "Patient";
    const password = "password";
    const patients = Patients.find({ hospital: hospital }).fetch();
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
            history.replace("/adminpanel");
          });
        } else {
          swal({
            text: "Success!",
            icon: "success",
          }).then(function () {
            history.replace("/adminpanel");
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

  const handleDelete = () => {
    const patientCheck = Patients.find({ patientID: toDelete }).fetch();
    const patientId = patientCheck[0]._id;
    console.log(patientId);
    const email = toDelete.toString() + "@temp.com";
    console.log(email);
    const userCheck = Meteor.users.find({ username: email }).fetch();
    console.log(userCheck);
    const userId = userCheck[0]._id;
    const patientHospital = Patients.find ({ hospital: patientCheck[0].hospital}).fetch();
    for (let i = patientCheck[0].qPos-1; i < patientHospital.length; i++){
      console.log(i);
      if ( patientHospital[i].qPos > patientCheck[0].qPos ) {
        console.log(patientHospital[i]._id);
        console.log(patientHospital[i].qPos - 1);
        Patients.update({ _id: patientHospital[i]._id}, {$set: {qPos: i}})
      }
    }
    // Patients.update(
    //     { patientQ : { $gte: patientQ } },
    //     { $inc: { qPos: - 1 } },
    //     {
    //       multi: true,
    //       arrayFilters: [ { patientQ : { $gte: patientQ }}]
    //     }
    // )
    Meteor.users.remove({ _id: userId });
    Patients.remove({ _id: patientId }, (error) => {
      if (error) {
        swal("Error", error.message, "error").then(function () {
          history.replace("/adminpanel");
        });
      } else {
        swal({
          text: "Success!",
          icon: "success",
        }).then(function () {
          history.replace("/adminpanel");
        });
      }
    });
  };

  // Create columns for grid Table
  const columns = [
    { field: 'Patient ID', editable: true, width: '150', valueGetter: (params) => `${params.row.patientID}` },
    { field: 'First Name', editable: true, width: '150', valueGetter: (params) => `${params.row.firstName}` },
    { field: 'Last Name', editable: true,  width: '150', valueGetter: (params) => `${params.row.lastName}` },
    { field: 'Reason', editable: true, width:'150', valueGetter: (params) => `${params.row.reason}` },
    { field: 'Hospital', editable: true, width:'150', valueGetter: (params) => `${params.row.hospital}` },
    { field: 'Admin ID', editable: true, width:'200', valueGetter: (params) => `${params.row.adminID}` },
    { field: 'Queue Position', editable: true, width:'150', valueGetter: (params) => `${params.row.qPos}` },
];

  return (
      <AdminContainer>
        <PageHeader> Administrator Panel</PageHeader>
        <PanelHeader>Check In a New Patient</PanelHeader>
        <br/>
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
                  <MyTextField
                      id="patient first Name"
                      label=""
                      type="Patient first Name"
                      placeholder="  Bob"
                      onChange={(e) => setFirstName(e.target.value)}
                  >
                    {" "}
                  </MyTextField>
                </CellHeader>
                <CellHeader>
                  Last Name
                  <MyTextField
                      id="patient last  Name"
                      label=""
                      type="Patient last Name"
                      placeholder="  Smith"
                      onChange={(e) => setLastName(e.target.value)}
                  >
                    {" "}
                  </MyTextField>
                </CellHeader>
                <CellHeader>
                  Reason
                  <MyTextField
                      id="reason"
                      label=""
                      type="reason"
                      placeholder="  hurt foot"
                      onChange={(e) => setReason(e.target.value)}
                  >
                    {" "}
                  </MyTextField>
                </CellHeader>
              </RowEven>
            </Header>
          </AdminTable>
          <SubmitButton variant="contained" onClick={generateID}>
            Generate unique patientID
          </SubmitButton>
          <SubmitButton type="submit" variant="contained">
            Add New Patient
            <span> </span>
          </SubmitButton>
        </form>
        <br/>
        <br/>
        <PanelHeader>Change Weighted Wait Time</PanelHeader>

        <form onSubmit={handleUpdate}>
          <AdminTable>
            <Header>
              <RowEven>
                <CellHeader>Current Time</CellHeader>
                <CellHeader>Change To (Minutes)</CellHeader>
                <CellHeader> </CellHeader>
              </RowEven>
            </Header>
            <TableBody>
              <RowOdd>
                <CellRow>{currentTime} </CellRow>
                <CellRow>
                  <MyTextField
                      id="changeTime"
                      label=""
                      type="Change Time"
                      placeholder= {`  ` + currentTime}
                      onChange={(e) => setCurrentTime(e.target.value)}>
                  </MyTextField>
                </CellRow>
                <CellRow /*Submit The Changes*/>
                  <SubmitButton type="submit" variant="contained">
                    Change Average Wait Time
                  </SubmitButton>
                </CellRow>
              </RowOdd>
            </TableBody>
          </AdminTable>
        </form>
        <Container sx={{width: "100% !important"}}>
        <form onSubmit={handleDelete}
        >
          <MyTextField
          type="text" 
          id="patientSelect"
          placeholder="  patient Id"
          onChange={(e) => setToDelete(e.target.value)}

          />
          <SubmitButton type="submit">
            Checkout Patient
          </SubmitButton>
        </form>
        </Container>
        <br/>
        <PanelHeader>List of Current Patients </PanelHeader>
        <div style={{ height: 250, width: '100%' }}>
          <DataGrid
              getRowId={(r) => r._id}
              rows={rows}
              columns={columns}
          />
        </div>
        <br/>
      </AdminContainer>
  );
};

AdminPanel.propTypes = {
  hospital: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

const AdminPanelContainer = withTracker(() => {
  const subscription = Meteor.subscribe("Patient");
  const userSubscription = Meteor.subscribe("allUsers");
  const hospitalSubscription = Meteor.subscribe("Hospital");
  const facility = Meteor.users
    .find({ _id: Meteor.userId }, { limit: 1 })
    .fetch();
  const match = facility[0].profile.hospital;
  return {
    hospital: Hospitals.find({ facilityID: match }).fetch(),
    ready:
      subscription.ready() &&
      hospitalSubscription.ready() &&
      userSubscription.ready(),
  };
})(AdminPanel);

export default withRouter(AdminPanelContainer);
