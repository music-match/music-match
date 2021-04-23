import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Container, Header, Loader, Card, Input, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';
import Profile from '../components/Profile';
import { MusicInterests } from '../../api/profile/MusicInterests';

function alphaSort(profiles) {
  return _.sortBy(profiles, function (profile) { return profile.name.toLowerCase(); });
}

function filterProfiles(profiles, search) {
  if (search === '') {
    return profiles;
  }
  const filteredInterests = _.filter(MusicInterests.collection.find().fetch(), function (interest) {
    return interest.type.toLowerCase().indexOf(search) >= 0;
  });
  const filteredNames = _.filter(Profiles.collection.find().fetch(), function (profile) {
    return profile.name.toLowerCase().indexOf(search) >= 0;
  });
  const filteredProfiles = _.pluck(_.union(filteredInterests, filteredNames), 'email');
  return _.filter(profiles, function (profile) {
    return _.contains(filteredProfiles, profile.email);
  });
}

/** A simple static component to render some text for the landing page. */
class BrowseUsers extends React.Component {

  constructor() {
    super();
    this.state = {
      searchField: '',
    };
  }

  handleMessage(e) {
    this.setState({ searchField: e.target.value });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const { searchField } = this.state;
    return (
      <div id='browseusers-page' className='music-background'>
        <Container>
          <Header inverted as="h2" textAlign="center">Browse Users</Header>
          <div className='search-padding'>
            <Input fluid onChange={this.handleMessage.bind(this)} placeholder="Search By Interests..."/>
          </div>
          <Card.Group centered>
            {(_.size(filterProfiles(this.props.profiles, searchField.toLowerCase())) > 0) ?
              (alphaSort(filterProfiles(this.props.profiles, searchField.toLowerCase())).map((profile, index) => <Profile
                key={index}
                profile={profile}
                music_interests={this.props.music_interests.filter(music_interests => (music_interests.email === profile.email))}/>)) : this.displayNoUsers()
            }
          </Card.Group>
        </Container>
      </div>

    );
  }

  displayNoUsers() {
    return (
      <div style={{ paddingTop: '200px', paddingBottom: '200px' }}>
        <Header inverted as='h2'>No Users Found from Filter</Header>
        <Image centered src='https://c.tenor.com/HJvqN2i4Zs4AAAAj/milk-and-mocha-cute.gif'/>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
BrowseUsers.propTypes = {
  profiles: PropTypes.array.isRequired,
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
  const profiles = Profiles.collection.find({}).fetch();
  const music_interests = MusicInterests.collection.find({}).fetch();
  return {
    profiles,
    music_interests,
    ready,
  };
})(BrowseUsers);
