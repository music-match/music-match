import React from 'react';
import { _ } from 'meteor/underscore';
import { Card, Image, Header, Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import MusicLabel from './MusicLabel';
import { Profiles } from '../../api/profile/Profiles';
import { Jams } from '../../api/profile/Jams';

function alphaSort(interests) {
  return _.sortBy(interests, 'type');
}

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {

  deleteProfile(ID) {
    const emailMatch = this.props.profile.email;
    const removedJamsIds = _.pluck(Jams.collection.find({ email: emailMatch }).fetch(), '_id');
    Profiles.collection.remove({ _id: ID });
    _.map(removedJamsIds, function (id) { Jams.collection.remove({ _id: id }); });
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={this.props.profile.image}
          />
          <Card.Header>{this.props.profile.name}</Card.Header>
          <Card.Description>Goals: {this.props.profile.goals}</Card.Description>
          <Header as='h4'>Music Interests:</Header>
          {alphaSort(this.props.music_interests).map((music_interest, index) => <MusicLabel key={index} music_interest={music_interest}/>)}
        </Card.Content>
        <Card.Content extra>
          <Link to={`/viewprofile/${this.props.profile._id}`}>View Profile</Link>
          <Grid>
            <Grid.Column floated='left' width={5}>
              <Button fluid href={`/#/editprofile/${this.props.profile._id}`} size='mini'>Edit</Button>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Button onClick={() => this.deleteProfile(this.props.profile._id)} fluid color='red' size='mini'>Delete</Button>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  jams: PropTypes.array.isRequired,
  music_interests: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

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
})(Profile);
