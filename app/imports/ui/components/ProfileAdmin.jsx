import React from 'react';
import { _ } from 'meteor/underscore';
import { Card, Image, Header, Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import MusicLabel from './MusicLabel';
import { Profiles } from '../../api/profile/Profiles';
import { Jams } from '../../api/profile/Jams';

function alphaSort(interests) {
  return _.sortBy(interests, 'type');
}

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {

  deleteProfile(ID) {
    Profiles.collection.remove({ _id: ID });
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
  music_interests: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Profile);
