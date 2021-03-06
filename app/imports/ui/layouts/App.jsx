import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import CreateProfile from '../pages/CreateProfile';
import BrowseUsers from '../pages/BrowseUsers';
import BrowseUsersAdmin from '../pages/BrowseUsersAdmin';
import EditProfile from '../pages/EditProfile';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import ViewProfile from '../pages/ViewProfile';
import BrowseJams from '../pages/BrowseJams';
import BrowseJamsAdmin from '../pages/BrowseJamsAdmin';
import AddJams from '../pages/AddJams';
import EditJams from '../pages/EditJams';
import MyJams from '../pages/MyJams';
import AboutUs from '../pages/AboutUs';
import LikedJamsPage from '../pages/LikedJamsPage';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/about-us" component={AboutUs}/>
            <ProtectedRoute path="/create-profile" component={CreateProfile}/>
            <ProtectedRoute path="/browse-users" component={BrowseUsers}/>
            <ProtectedRoute path="/editprofile/:_id" component={EditProfile}/>
            <AdminProtectedRoute path="/browse-users-admin" component={BrowseUsersAdmin}/>
            <ProtectedRoute path="/viewprofile/:_id" component={ViewProfile}/>
            <ProtectedRoute path="/browse-jams" component={BrowseJams}/>
            <ProtectedRoute path="/liked-jams" component={LikedJamsPage}/>
            <AdminProtectedRoute path="/browse-jams-admin" component={BrowseJamsAdmin}/>
            <ProtectedRoute path="/add-jams" component={AddJams}/>
            <ProtectedRoute path="/edit-jams/:_id" component={EditJams}/>
            <ProtectedRoute path="/my-jams" component={MyJams}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

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
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
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
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
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
