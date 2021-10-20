import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Patients = new Mongo.Collection('Patients');

const PatientSchema = new SimpleSchema({
  patientID: String,
  firstName: String,
  lastName: String,
  reason: String,
  checkInTime: String,
  adminID: String,
  hospital: String,
  qPos: Number,
}, { tracker: Tracker });

Patients.attachSchema(PatientSchema);

export { Patients, PatientSchema };