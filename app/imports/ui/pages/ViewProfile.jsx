import React from 'react';
import { Grid, Card, Image, Header, Rating, Loader, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';
import { MusicInterests } from '../../api/profile/MusicInterests';
import MusicLabel from '../components/MusicLabel';

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
          <Grid.Column width={6}>
            <Image size='medium' src={this.props.profile.image}/>
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{this.props.profile.name}</Card.Header>
                <Card.Meta>{this.props.profile.address}</Card.Meta>
                <Card.Meta>{this.props.profile.phone}</Card.Meta>
                <Card.Meta>{this.props.profile.email}</Card.Meta>
                <Card.Description>Goals: {this.props.profile.goals}</Card.Description>
                <Header as='h4'>Instruments:</Header>
                {(this.props.profile.instruments) ? this.props.profile.instruments : <p>None</p>}
                <Header as='h4'>Music Skill Level:</Header>
                <Rating icon='star' defaultRating={this.props.profile.skill} maxRating={5} disabled/>
                <Header as='h4'>Music Interests:</Header>
                {this.props.myInterests.map((music_interest, index) => <MusicLabel
                  key={index}
                  music_interest={music_interest}/>)}
              </Card.Content>
              {this.props.profile.email === Meteor.user().username ?
                <Card.Content extra>
                  <Button href={`#/editprofile/${this.props.profile._id}`} size='small'>Edit Profile</Button>
                </Card.Content> : ''
              }
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ViewProfile.propTypes = {
  profile: PropTypes.object,
  myInterests: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const subscription2 = Meteor.subscribe(MusicInterests.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const profile = Profiles.collection.findOne(documentId);
  const music_interests = MusicInterests.collection.find().fetch();
  const myInterests = _.filter(music_interests, function (interest) { return profile.email === interest.email; });
  return {
    profile,
    myInterests,
    ready,
  };
})(ViewProfile);
