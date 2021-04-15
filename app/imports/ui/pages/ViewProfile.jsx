import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Card, Image, Header, Label, Rating, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';
import Profile from '../components/Profile';
import { MusicInterests } from '../../api/profile/MusicInterests';

/** A simple static component to render some text for the landing page. */
class ViewProfile extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <div className='music-background'>
        <Grid container columns={2}>
          <Grid.Column>
            <Image size='medium' src='https://ethancheez.github.io/images/ethan.jpg'/>
          </Grid.Column>
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Card.Header>Ethan Chee</Card.Header>
                <Card.Meta>Honolulu, Hawaii</Card.Meta>
                <Card.Meta>(XXX) XXX-XXXX, john@foo.com</Card.Meta>
                <Card.Description>Goals: Become a Computer Engineer, Develop Innovative Technologies</Card.Description>
                <Header as='h4'>Instruments:</Header>
                <p>Harmonica, Piano, Banjo</p>
                <Header as='h4'>Skill Level:</Header>
                <Rating icon='star' defaultRating={3} maxRating={5} />
                <Header as='h4'>Music Interests:</Header>
                <Label>Pop</Label>
                <Label>Alternate</Label>
              </Card.Content>
              <Card.Content extra>
                <Link to="/editprofile">Edit Profile</Link>
              </Card.Content>
              <Card.Content extra>
                <Link to="/my-jams">My Jams</Link>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ViewProfile.propTypes = {
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
})(ViewProfile);
