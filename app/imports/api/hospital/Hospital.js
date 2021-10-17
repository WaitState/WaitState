import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Hospitals = new Mongo.Collection('Hospitals');

const HospitalSchema = new SimpleSchema({
  FacilityID: String,
  FacilityName: String,
    Address: String,

}, { tracker: Tracker });

Hospitals.attachSchema(HospitalSchema);

export { Hospitals, HospitalSchema };