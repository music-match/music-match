import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Card, Embed, Header, Button, Icon, Label, Modal, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Profiles } from '../../api/profile/Profiles';
import { updateLikedJam } from '../../startup/both/Methods';
import AddComment from './AddComment';
import Comment from './Comment';

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
            {this.displayComments()}
          </div>
        </Card.Content>
      </Card>
    );
  }

  displayComments() {
    const myProfile = Profiles.collection.findOne({ email: Meteor.user().username });
    return (
      <Modal trigger={<Button floated='right' size='mini' color='orange'>Comments</Button>}>
        <Modal.Header>Comments</Modal.Header>
        <Modal.Content>
          <Feed>
            {(_.size(this.props.comments) > 0) ? (
              _.map(this.props.comments, (comment, index) => <Comment key={index} comment={comment}/>)
            ) : (
              <Feed.Event>
                <Feed.Content>No Comments</Feed.Content>
              </Feed.Event>
            )}
          </Feed>
        </Modal.Content>
        <Modal.Content>
          <AddComment owner={myProfile.name} jamID={this.props.jam._id} profileID={myProfile._id} email={Meteor.user().username} image={myProfile.image}/>
        </Modal.Content>
      </Modal>
    );
  }
}

// Require a document to be passed to this component.
JamCard.propTypes = {
  profile: PropTypes.object.isRequired,
  jam: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  isLiked: PropTypes.bool.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(JamCard);
