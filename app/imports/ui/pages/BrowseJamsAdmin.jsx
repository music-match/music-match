import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import JamCardAdmin from '../components/JamCardAdmin';
import { Jams } from '../../api/profile/Jams';

function alphaSort(jams) {
  return _.sortBy(jams, function (jam) { return jam.title.toLowerCase(); });
}

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class BrowseJamsAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className='music-background'>
        <Container>
          <Header inverted as="h2" textAlign="center">Browse Jams (Admin)</Header>
          <Card.Group centered itemsPerRow={3}>
            {alphaSort(this.props.jams).map((jam, index) => <JamCardAdmin key={index} jam={jam}/>)}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
BrowseJamsAdmin.propTypes = {
  jams: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Jams.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const jams = Jams.collection.find({}).fetch();
  return {
    jams,
    ready,
  };
})(BrowseJamsAdmin);
