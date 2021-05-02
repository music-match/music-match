import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Card, Embed, Header, Grid, Button, Popup, Modal, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Jams } from '../../api/profile/Jams';
import { Profiles } from '../../api/profile/Profiles';
import Comment from './Comment';
import AddComment from './AddComment';
import { Comments } from '../../api/comment/Comments';

class MyJamCard extends React.Component {
  state = { isOpen: false }

  handleOpen = () => {
    this.setState({ isOpen: true });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  removeJam(ID) {
    const commentsToBeDeleted = Comments.collection.find({ jamID: ID }).fetch();
    const commentIDs = _.pluck(commentsToBeDeleted, '_id');

    Jams.collection.remove({ _id: ID });
    _.map(commentIDs, function (id) { Comments.collection.remove({ _id: id }); });
    this.setState({ isOpen: false });
    swal('Success', 'Jam Deleted.', 'success');
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
          Recommended by: <Link to={`/viewprofile/${this.props.profile._id}`}>{this.props.jam.email}</Link>
          <Grid>
            <Grid.Column floated='left' width={5}>
              <Button fluid href={`/#/edit-jams/${this.props.jam._id}`} size='mini'>Edit</Button>
            </Grid.Column>
            <Grid.Column width={5}>
              {this.displayComments()}
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              <Popup trigger={<Button fluid color='red' size='mini'>Delete</Button>} flowing on='click' hideOnScroll open={this.state.isOpen} onOpen={this.handleOpen} onClose={this.handleClose} basic position='top center'>
                <Header as='h4'>You are about to delete this jam. Are you sure?</Header>
                <Button onClick={() => this.removeJam(this.props.jam._id)} fluid color='red' size='mini'>Yes, Delete this Jam</Button>
              </Popup>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    );
  }

  displayComments() {
    const myProfile = Profiles.collection.findOne({ email: Meteor.user().username });
    return (
      <Modal trigger={<Button size='mini' color='orange'>Comments</Button>}>
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
MyJamCard.propTypes = {
  profile: PropTypes.object.isRequired,
  jam: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MyJamCard);
