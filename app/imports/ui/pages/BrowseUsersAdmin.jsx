import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Input } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import AdminProfile from '../components/AdminProfile';
import { Profiles } from '../../api/profile/Profiles';
import { MusicInterests } from '../../api/profile/MusicInterests';

/** A simple static component to render some text for the landing page. */
class BrowseUsersAdmin extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className='music-background'>
        <Container>
          <Header inverted as="h2" textAlign="center">Browse Users (Admin)</Header>
          <Input fluid
            icon={{ name: 'search', circular: true, link: true }}
            placeholder='Search User...' className='search'
          />
          <Card.Group centered>
            {this.props.adminProfiles.map((profile, index) => <AdminProfile
              key={index}
              profile={profile}
              music_interests={this.props.music_interests.filter(music_interests => (music_interests.email === profile.email))}/>)}
          </Card.Group>
        </Container>
      </div>

    );
  }
}

// Require an array of Stuff documents in the props.
BrowseUsersAdmin.propTypes = {
  adminProfiles: PropTypes.array.isRequired,
  music_interests: PropTypes.array.isRequired,
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
  const adminProfiles = Profiles.collection.find({}).fetch();
  const music_interests = MusicInterests.collection.find({}).fetch();
  return {
    adminProfiles,
    music_interests,
    ready,
  };
})(BrowseUsersAdmin);
