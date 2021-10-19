import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Patients = new Mongo.Collection('Patients');

const PatientSchema = new SimpleSchema({
  patientID: String,
  firstName: String,
  lastName: String,
  reason: String,
  checkInStatus: Boolean,
  checkInTime: String,
  adminID: String,
}, { tracker: Tracker });

const grabPatient = schema.pick("patientID");

Patients.attachSchema(PatientSchema);

export { Patients, PatientSchema, grabPatient };