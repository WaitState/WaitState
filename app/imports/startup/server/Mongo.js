import { Meteor } from 'meteor/meteor';
import { Hospitals } from '../../api/hospital/Hospital';
/* eslint-disable no-console */

if (Hospitals.find().count() === 0) {
  var data = JSON.parse(Assets.getText("hospitalGeneralInformation.json"));
  data['hospitals'].map( (item) => {
    Hospitals.insert(item);
  });
}

// Initialize collections here
