import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Feed, Image, Icon, Button, Header, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Comments } from '../../api/comment/Comments';

class Comment extends React.Component {
  state = { isOpen: false }

  handleOpen = () => {
    this.setState({ isOpen: true });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  deleteComment(ID) {
    Comments.collection.remove({ _id: ID });
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <Feed.Event >
        <Feed.Label>
          <Image src={this.props.comment.image}/>
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User href={`#/viewprofile/${this.props.comment.profileID}`}>{this.props.comment.owner}</Feed.User>
            <Feed.Date>{this.props.comment.createdAt.toLocaleDateString('en-US')}</Feed.Date>
            {(this.props.comment.email === Meteor.user().username) ? (
              <Popup trigger={<Icon link circular name='delete' size='small' color='red'/>} flowing on='click' hideOnScroll open={this.state.isOpen} onOpen={this.handleOpen} onClose={this.handleClose} position='right center'>
                <Header as='h4'>You are about to delete this comment. Are you sure?</Header>
                <Button onClick={() => this.deleteComment(this.props.comment._id)} fluid color='red' size='mini'>Yes, Delete this Comment</Button>
              </Popup>
            ) : ('')}
          </Feed.Summary>
          <Feed.Extra text>
            {this.props.comment.comment}
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

// Require a document to be passed to this component.
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Comment);
