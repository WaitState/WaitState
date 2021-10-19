import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Patients, grabPatient } from 'app/imports/api/patient/Patient';
import { Hospitals } from 'app/imports/api/hospital/Hospital';

const HospitalPatients = new Mongo.Collection('HospitalPatients');

const HospitalPatientSchema = new SimpleSchema({
  patientID: { type: String },
  facilityID: { type: String },
}, { tracker: Tracker });

HospitalPatients.attachSchema(HospitalPatientSchema);

export { HospitalPatients, HospitalPatientSchema };