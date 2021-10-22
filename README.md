# WaitState

### Table of contents

* [Team Members](#team-members)
* [Overview](#overview)
* [User Guide](#user-guide)

# Overview
Meteor-based web application aiming to solve the issue of vague hospital emergency room wait times.  Patients will be able to make informed decisions about which hospital they go to by checking emergency room wait times before hand.

Our deployed website can be found on: [WaitState](https://waitstate.meteorapp.com/)

Our development can be found on: [Github](https://github.com/WaitState/WaitState)

## Team Members
* Jake Imanaka
* Tsz Ching Wong
* Patrick McCrindle
* Clyde James Felix
* Justin Wong

# User Guide
This user guide includes a walkthrough of the application for hospital admins, site admins, and patients.

### Landing Page
Without loggin in, users are able to search for nearby hospital and/or check for patient wait time if given a temporary id.
![](images/landing.png)

### Hospital Directory Page
After clicking the SEARCH NEARBY HOSPITAL button, users will be able to search by name/address.
![](images/search.png)

The SUBMIT button will query a list of hospitals.
![](images/directory.png)

After clicking on a hospital, users can see more info about the hospital such as average wait time and contact number.
![](images/hospital_info.png)

### Admin Login
Site admins and hospital admins will have to login through the ADMIN LOGIN button to access more functionalities.
![](images/user_login.png)

Admins will login with their email and password.
![](images/admin_login.png)

### Site Admin
After logging in as site admin, he/she can add hospital admins with the ADD ADMIN button.
![](images/add_admin.png)

The ADD ADMIN button will link to a form that can be used to add hospital admins.
![](images/register.png)

### Hospital Admin
After loggin in as hospital admin, he/she can add patient and generate a temporary id for the patient.
![](images/add_patient.png)

A sweet alert will display a message whether patient is added successfully or not. If added successfully, patient will appear under the List of Current Patients table.
![](images/add_patient_success.png)

With the CHANGE AVERAGE WAIT TIME button, hospital admin can change the average wait time at any time.
![](images/patient_table.png)

To checkout a patient, simply click the CHECKOUT PATIENT button after entering the patient id.
![](images/delete_patient.png)

### Patient Login
Patients can view their wait time through patient login and the CHECK YOUR WAIT TIME button.
![](images/check_id.png)

Patients will have to enter their patient id to acess their wait time.
![](images/check_id2.png)

After entering the patient id, patients can view their estimated wait time and check-in time.
![](images/ticket.png)


