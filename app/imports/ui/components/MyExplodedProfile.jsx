// DID NOT USE YET

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Header, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import MusicLabel from './MusicLabel';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MyExplodedProfile extends React.Component {
  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>{this.props.profile.name}</Card.Header>
          <Card.Meta>{this.props.profile.address}</Card.Meta>
          <Card.Meta>{this.props.profile.phone}</Card.Meta>
          <Card.Meta>{this.props.profile.email}</Card.Meta>
          <Card.Description>Goals: {this.props.profile.goals}</Card.Description>
          <Header as='h4'>Instruments:</Header>
          <p>Harmonica, Piano, Banjo</p>
          <Header as='h4'>Skill Level:</Header>
          <Rating icon='star' defaultRating={3} maxRating={5} />
          <Header as='h4'>Music Interests:</Header>
          {this.props.music_interests.map((music_interest, index) => <MusicLabel
            key={index}
            music_interest={music_interest}/>)}
        </Card.Content>
        {this.props.profile.email === Meteor.user().username ?
          <Card.Content extra>
            <Link to={`/editprofile/${this.props.profile._id}`}>Edit Profile</Link>
          </Card.Content> : ''
        }
        {this.props.profile.email === Meteor.user().username ?
          <Card.Content extra>
            <Link to="/my-jams">My Jams</Link>
          </Card.Content> : ''
        }
      </Card>
    );
  }
}

// Require a document to be passed to this component.
MyExplodedProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  music_interests: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MyExplodedProfile);
