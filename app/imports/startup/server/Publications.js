import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Patients } from '../../api/patient/Patient';
import { Hospitals } from '../../api/hospital/Hospital';


// User-level publication.
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
    return Patients.find({ userID:  this.userId });
  }
    return this.ready();
});

//Publish a role for each hospital
Meteor.publish('Hospital', function publish() {
  return Hospitals.find();
  return this.ready();
});

