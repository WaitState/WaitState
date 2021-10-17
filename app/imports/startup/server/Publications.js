import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';


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

// Publish a role for each patient
Meteor.publish('Patient', function publish() {
  if (this.userID) {
    return Patients.find({ userID:  this.userID });
  }
    return this.ready();
});

// Publish a role for each patient
Meteor.publish('Hospital', function publish() {
  if (this.userID) {
    return Hospitals.find({ userID:  this.userID });
  }
  return this.ready();
});