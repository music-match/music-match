import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    // const menuStyle = { marginBottom: '10px', color: 'white' };
    return (
      <Menu attached="top" borderless inverted color='orange'>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Image size='mini' src='/images/logo2.png'/>
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1'>Music Match</Header>
        </Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/myprofile" key='myprofile'>My Profile</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/browse-users" key='list'>Browse Users</Menu.Item>,
            <Menu.Item key='jams'>
              <Dropdown text='Jams' icon='dropdown' pointing='top left'>
                <Dropdown.Menu>
                  <Dropdown.Item text='Browse Jams' as={NavLink} exact to="/browse-jams"/>
                  <Dropdown.Item text='My Jams' as={NavLink} exact to="/my-jams"/>
                  <Dropdown.Item text='Add Jams' as={NavLink} exact to="/add-jams"/>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item key='admin'>
            <Dropdown text='Admin' icon='dropdown' pointing='top left'>
              <Dropdown.Menu>
                <Dropdown.Item text='Browse Users (Admin)' as={NavLink} exact to="/browse-users-admin"/>
                <Dropdown.Item text='Browse Jams (Admin)' as={NavLink} exact to="/browse-jams-admin"/>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-edit-profile" icon="edit" text="Edit Profile" as={NavLink} exact to="/editprofile"/>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
