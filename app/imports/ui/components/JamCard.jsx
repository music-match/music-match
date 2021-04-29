import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Embed, Header, Button, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Profiles } from '../../api/profile/Profiles';
import { updateLikedJam } from '../../startup/both/Methods';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class JamCard extends React.Component {

  submit(jamID, username, oldLikes) {
    const profileID = Profiles.collection.findOne({ email: username })._id;
    const data = {
      jamID: jamID,
      profileID: profileID,
      oldLikes: oldLikes,
    };
    Meteor.call(updateLikedJam, data);
  }

  render() {
    return (
      <Card centered>
        <Card.Content>
          <Card.Header textAlign={'center'}>{this.props.jam.title}</Card.Header>
          <Embed
            source='youtube'
            id={this.props.jam.id}
            active={true}
            hd={true}
            iframe={{
              allowFullScreen: true,
            }}
            autoplay={false}
          />
          <Card.Description>
            <Header as='h4'>Description:</Header>
            {this.props.jam.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          Recommended by: <Link to={`/viewprofile/${this.props.profile._id}`}>{this.props.profile.email}</Link>
          <div>
            {(this.props.isLiked) ? (
              <Button circular color='red' size='mini' onClick={() => this.submit(this.props.jam._id, Meteor.user().username, this.props.jam.likes)}>
                <Icon name='heart' />
                  Like
              </Button>
            ) : (
              <Button circular size='mini' onClick={() => this.submit(this.props.jam._id, Meteor.user().username, this.props.jam.likes)}>
                <Icon name='heart' />
                  Like
              </Button>
            )}
            <Label basic pointing='left' size='tiny' color='orange'>
              {this.props.jam.likes}
            </Label>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
JamCard.propTypes = {
  profile: PropTypes.object.isRequired,
  jam: PropTypes.object.isRequired,
  isLiked: PropTypes.bool.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(JamCard);
