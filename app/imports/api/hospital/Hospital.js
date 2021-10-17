import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Hospitals = new Mongo.Collection('Hospitals');

const HospitalSchema = new SimpleSchema({
  facilityID: String,
  facilityName: String,
  address: String,
  city: String,
  state: String,
  zipCode: Number,
  countyName: String,
  phoneNumber: String,
  hospitalType: String,
  emergencyServices: String,
  averageWaitTime: {
    type: String,
    defaultValue: "0",
  },
  patientList: {
    type: String,
    defaultValue: "0",
  }

}, { tracker: Tracker });

Hospitals.attachSchema(HospitalSchema);

export { Hospitals, HospitalSchema };