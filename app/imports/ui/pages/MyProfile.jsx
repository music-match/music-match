import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Grid, Card, Image, Header, Label, Rating, Loader, CardContent } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';
import { MusicInterests } from '../../api/profile/MusicInterests';

/** A simple static component to render some text for the landing page. */
class ViewProfile extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const myProfile = _.find(this.props.profiles, function (profile) { return profile.email === Meteor.user().username; });
    const myMusicInterests = _.pluck(_.filter(this.props.music_interests, function (interests) { return interests.email === Meteor.user().username; }), 'type');
    return (
      <div className='music-background'>
        <Grid container columns={2}>
          <Grid.Column>
            <Image size='medium' src={myProfile.image}/>
          </Grid.Column>
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Card.Header>{myProfile.name}</Card.Header>
                <Card.Meta>{myProfile.address}</Card.Meta>
                <Card.Meta>{myProfile.phone}, {myProfile.email}</Card.Meta>
                <Card.Description>Goals: {myProfile.goals}</Card.Description>
                <Header as='h4'>Instruments:</Header>
                <p>{myProfile.instruments}</p>
                <Header as='h4'>Skill Level:</Header>
                <Rating icon='star' size="large" rating={myProfile.skill} maxRating={5} disabled/>
                <Header as='h4'>Music Interests:</Header>
                <CardContent>
                  {myMusicInterests.map((interest, index) => <Label key={index} interest={interest}/>)}
                </CardContent>
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
