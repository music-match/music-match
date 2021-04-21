import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Jams } from '../../api/profile/Jams';
import { Profiles } from '../../api/profile/Profiles';
import MyJamCard from '../components/MyJamCard';

function alphaSort(jams) {
  return _.sortBy(jams, function (jam) { return jam.title.toLowerCase(); });
}

function getProfile(profiles, jam) {
  return _.find(profiles, function (profile) { return jam.email === profile.email; });
}

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class MyJams extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const myJams = _.filter(this.props.jams, function (jam) { return jam.email === Meteor.user().username; });
    return (
      <div className='music-background'>
        <Container>
          <Header inverted as="h2" textAlign="center">My Jams</Header>
          <Card.Group centered itemsPerRow={3}>
            {alphaSort(myJams).map((jam, index) => <MyJamCard
              key={index}
              jam={jam}
              profile={getProfile(this.props.profiles, jam)}
            />)}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
MyJams.propTypes = {
  jams: PropTypes.array.isRequired,
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Jams.userPublicationName);
  const subscription2 = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const jams = Jams.collection.find({}).fetch();
  const profiles = Profiles.collection.find({}).fetch();
  return {
    jams,
    profiles,
    ready,
  };
})(MyJams);
