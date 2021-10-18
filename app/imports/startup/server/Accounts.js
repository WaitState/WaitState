import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

//create user account and assign role to user
Meteor.methods(
  {
  createAccount: function (firstname, lastname, email, password, role, hospital) {
  console.log(`  Creating user ${email}.`);
  const user = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profile: {
      firstname: firstname,
      lastname: lastname,
      hospital: hospital,
    }
  });
    //assign user to role
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(user, role);
  }
}
);

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
