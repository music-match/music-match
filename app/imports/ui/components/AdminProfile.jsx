import React from 'react';
import { Card, Image, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import MusicLabel from './MusicLabel';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AdminProfile extends React.Component {
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
          {this.props.music_interests.map((music_interest, index) => <MusicLabel key={index} music_interest={music_interest}/>)}
        </Card.Content>
        <Card.Content extra>
          <Link to="/viewprofile" className='admin-link'>Profile</Link>
          <Link to="/viewprofile" className='admin-link'>Edit</Link>
          <Link to="/viewprofile" className='admin-link'><Icon name='trash alternate'/></Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
AdminProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  music_interests: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(AdminProfile);
