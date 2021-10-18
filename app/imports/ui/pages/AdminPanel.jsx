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
//Change tablehead to Header
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
  fontSize: 'xx-large',
  fontWeight: 'bold',
  marginBottom: "15px",

});

const RightBox = styled(Box)({

  display: 'flex',
  flexDirection: "Row",
  textAlign: "Right",
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  alignmentBaseline: "right",



});

const AdminPanel = (props) => {
  return (

      <AdminContainer>

        <PageHeader> Administrator Panel</PageHeader>
        <RightBox component = "span">
          <Button > Add a Patient</Button>
        </RightBox>
        <AdminTable>
          <Header>
            <RowEven>
              <CellHeader>ID </CellHeader>
              <CellHeader>Patient Name </CellHeader>
              <CellHeader>Reason </CellHeader>
              <CellHeader>Created At</CellHeader>
              <CellHeader>Check-In Status</CellHeader>
              <CellHeader>Check-In Time</CellHeader>
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
              <CellRow>test time</CellRow>
              <CellRow /*onClick={(e) => history.push("/patientPage")}} */>edit patient info</CellRow>


            </RowOdd>

            <RowEven /*Loop through the patient records and display them */>
              <CellRow>test id</CellRow>
              <CellRow /*patient.name */>test name</CellRow>
              <CellRow>test reason</CellRow>
              <CellRow>test created</CellRow>
              <CellRow>test status</CellRow>
              <CellRow>test time</CellRow>
              <CellRow /*onClick={(e) => history.push("/patientPage")}} */>edit patient info</CellRow>


            </RowEven>
          </TableBody>
        </AdminTable>

      </AdminContainer>
  );

};

export default AdminPanel;
