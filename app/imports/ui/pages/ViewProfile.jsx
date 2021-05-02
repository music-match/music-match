import React from 'react';
import { Grid, Card, Image, Header, Rating, Loader, Button, Popup } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';
import { MusicInterests } from '../../api/profile/MusicInterests';
import MusicLabel from '../components/MusicLabel';
import { Jams } from '../../api/profile/Jams';

class ViewProfile extends React.Component {
  state = { isOpen: false }

  handleOpen = () => {
    this.setState({ isOpen: true });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  deleteProfile(ID) {
    const emailMatch = this.props.profile.email;
    const removedJamsIds = _.pluck(Jams.collection.find({ email: emailMatch }).fetch(), '_id');
    Profiles.collection.remove({ _id: ID });
    _.map(removedJamsIds, function (id) { Jams.collection.remove({ _id: id }); });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <div id='view-profile-page' className='music-background'>
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
                  <Popup trigger={<Button color='red'>Delete</Button>} flowing on='click' hideOnScroll open={this.state.isOpen} onOpen={this.handleOpen} onClose={this.handleClose} basic position='top center'>
                    <Header as='h4'>You are about to delete your profile. Are you sure?</Header>
                    <Button href={'/'} onClick={() => this.deleteProfile(this.props.profile._id)} fluid color='red' size='mini'>Yes, Delete my profile</Button> </Popup>
                </Card.Content> : ''
              }
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

ViewProfile.propTypes = {
  profile: PropTypes.object,
  jams: PropTypes.array.isRequired,
  myInterests: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const subscription2 = Meteor.subscribe(MusicInterests.userPublicationName);
  const subscription3 = Meteor.subscribe(Jams.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready();
  // Get the documents
  const profile = Profiles.collection.findOne(documentId);
  const music_interests = MusicInterests.collection.find().fetch();
  const myInterests = _.filter(music_interests, function (interest) { return profile.email === interest.email; });
  const jams = Jams.collection.find().fetch();
  return {
    profile,
    jams,
    myInterests,
    ready,
  };
})(ViewProfile);
