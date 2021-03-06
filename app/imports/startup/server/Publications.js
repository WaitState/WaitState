import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Patients } from '../../api/patient/Patient';
import { Hospitals } from '../../api/hospital/Hospital';
//import Hospital from '../../ui/pages/Hospital';


// User-level publication.

Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
});

// If logged in, then publish documents owned by this user. Otherwise publish nothing.

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish('Account', function publish() {
  if (Roles.userIsInRole(this.userId, 'Site Admin')) {
    return Meteor.users.find({userId: this.userId});
  }
  return this.ready();
})

// Publish a role for each patient
Meteor.publish('Patient', function publish() {
  if (this.userId) {
    return Patients.find();
  }
    return this.ready();
});

//Publish a role for each hospital
Meteor.publish('Hospital', function publish() {


    return Hospitals.find()

});

Meteor.users.allow({
  remove: function (userId, doc) {
    if (true) {
      console.log("Access granted. You are an administrator and you are not trying to delete your own document.");
      return true;
    } else {
      console.log("Access denied. You are not an administrator or you are trying to delete your own document.");
      return false;
    }
  },
  fetch: []
});

Meteor.users.allow({
  remove: function (userId, doc) {
    if (true) {
      console.log("Access granted. You are an administrator and you are not trying to delete your own document.");
      return true;
    } else {
      console.log("Access denied. You are not an administrator or you are trying to delete your own document.");
      return false;
    }
  },
  fetch: []
});

Meteor.publish('HospitalSelective', function (key, value) {
  const publications = [];
  publications.push(Company.find(
    {
      key: value,
    },
  ));
});
