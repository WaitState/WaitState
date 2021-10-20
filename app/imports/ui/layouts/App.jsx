import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "../pages/Home";
import MenuBar from "../components/MenuBar";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";


import AdminPanel from "../pages/AdminPanel";
import AdminLogin from "../pages/AdminLogin";
import PatientLogin from "../pages/PatientLogin";
import Directory from "../pages/Directory";
import Ticket from "../pages/Ticket"
import Hospital from "../pages/Hospital";

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = (props) => {
  return (
    <Router>
      <div>
        <MenuBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/directory/" component={Directory} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/login" component={PatientLogin} />

          <AdminProtectedRoute exact path="/adminpanel" component={AdminPanel}/>

          <Route path="/ticket" component={Ticket} />
          <Route path="/hospital/:hid" component={Hospital} />


          {/* <Route path="/signout" component={Signout}/> */}
          {/* <ProtectedRoute path="/edit/:_id" component={EditStuff}/>*/}
          {/* <AdminProtectedRoute path="/admin" component={ListStuffAdmin}/> */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), "admin") || Roles.userIsInRole(Meteor.userId(), "Hospital Admin")  || Roles.userIsInRole(Meteor.userId(), "Site Admin");
      return isLogged && isAdmin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/admin/login", state: { from: props.location } }}
        />
      );
    }}
  />

);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
