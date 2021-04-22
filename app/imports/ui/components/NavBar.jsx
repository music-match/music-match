import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/Profiles';
import { MusicInterests } from '../../api/profile/MusicInterests';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {

  render() {
    // const menuStyle = { marginBottom: '10px', color: 'white' };
    // const myProfile = _.filter(this.props.profiles, function (profile) { return profile.email === this.props.username; });
    return (
      <Menu attached="top" borderless inverted color='orange'>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Image size='mini' src='/images/logo2.png'/>
        </Menu.Item>
        <Menu.Item id='navbar-home' as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1'>Music Match</Header>
        </Menu.Item>
        {this.props.username && this.props.profile ? (
          [<Menu.Item id="navbar-my-profile" as={NavLink} activeClassName="active" exact to={`/viewprofile/${this.props.profile._id}`} key='viewprofile'>My Profile</Menu.Item>,
            <Menu.Item id='navbar-browseusers' as={NavLink} activeClassName="active" exact to="/browse-users" key='list'>Browse Users</Menu.Item>,
            <Menu.Item key='jams'>
              <Dropdown id='navbar-jams-dropdown' text='Jams' icon='dropdown' pointing='top left'>
                <Dropdown.Menu>
                  <Dropdown.Item id='navbar-browsejams' text='Browse Jams' as={NavLink} exact to="/browse-jams"/>
                  <Dropdown.Item id='navbar-myjams' text='My Jams' as={NavLink} exact to="/my-jams"/>
                  <Dropdown.Item id='navbar-addjams' text='Add Jams' as={NavLink} exact to="/add-jams"/>
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
          {this.props.username === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.username} pointing="top right" icon={'user'}>
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

// Require an array of Stuff documents in the props.
NavBar.propTypes = {
  profile: PropTypes.object,
  music_interests: PropTypes.array.isRequired,
  username: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const subscription2 = Meteor.subscribe(MusicInterests.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const username = Meteor.user() ? Meteor.user().username : '';
  const profile = Profiles.collection.findOne({ email: username });
  const music_interests = MusicInterests.collection.find({}).fetch();
  return {
    profile,
    music_interests,
    username,
    ready,
  };
})(NavBar);
