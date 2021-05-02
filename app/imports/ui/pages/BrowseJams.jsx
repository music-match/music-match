import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Container, Header, Loader, Card, Input, Image, Button, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Jams } from '../../api/profile/Jams';
import JamCard from '../components/JamCard';
import { Profiles } from '../../api/profile/Profiles';
import { LikedJams } from '../../api/profile/LikedJams';
import { Comments } from '../../api/comment/Comments';

function sort(jams, likeFilter, userFilter, alphaFilter) {
  if (likeFilter) {
    return _.sortBy(jams, 'likes').reverse();
  }
  if (userFilter) {
    return _.sortBy(jams, function (jam) { return jam.email.toLowerCase(); });
  }
  if (alphaFilter) {
    return _.sortBy(jams, function (jam) { return jam.title.toLowerCase(); });
  }
  return [...jams].reverse();
}

function getProfile(profiles, jam) {
  return _.find(profiles, function (profile) { return jam.email === profile.email; });
}

function filterJams(jams, search) {
  if (search === '') {
    return jams;
  }
  const filteredJams = _.filter(jams, function (jam) { return jam.title.toLowerCase().indexOf(search) >= 0 || jam.description.toLowerCase().indexOf(search) >= 0; });
  return filteredJams;
}

function isLiked(myProfile, allLikedJams, jamID) {
  const profileID = _.first(myProfile)._id;
  const isJamLiked = _.filter(allLikedJams, function (jam) { return jam.profileID === profileID && jam.jamID === jamID; });
  if (_.size(isJamLiked) > 0) {
    return true;
  }
  return false;
}

class BrowseJams extends React.Component {

  constructor() {
    super();
    this.state = {
      searchField: '',
      dateFilter: true,
      likeFilter: false,
      userFilter: false,
      alphaFilter: false,
    };
  }

  handleSearch(input) {
    this.setState({ searchField: input.target.value });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const { searchField } = this.state;
    return (
      <div className='music-background'>
        <Container id='browse-jams'>
          <Header inverted as="h2" textAlign="center">Browse Jams</Header>
          <Input fluid onChange={this.handleSearch.bind(this)} placeholder='Search Jams by Name...'/>
          <List horizontal style={{ paddingBottom: '20px' }}>
            <List.Item><Header inverted as='h4' style={{ paddingTop: '8px', width: '70px', color: 'white' }}>Filter By: </Header></List.Item>
            <List.Item>
              {(this.state.dateFilter) ? (
                <Button compact color='green' size='small'>Date Created</Button>) : (
                <Button compact size='small' onClick={() => this.setState({ dateFilter: true, likeFilter: false, userFilter: false, alphaFilter: false })}>Date Created</Button>
              )}
            </List.Item>
            <List.Item>
              {(this.state.alphaFilter) ? (
                <Button compact color='green' size='small'>A-Z</Button>) : (
                <Button compact size='small' onClick={() => this.setState({ alphaFilter: true, likeFilter: false, userFilter: false, dateFilter: false })}>A-Z</Button>
              )}
            </List.Item>
            <List.Item>
              {(this.state.likeFilter) ? (
                <Button compact color='green' size='small'>Likes</Button>) : (
                <Button compact size='small' onClick={() => this.setState({ likeFilter: true, userFilter: false, alphaFilter: false, dateFilter: false })}>Likes</Button>
              )}
            </List.Item>
            <List.Item>
              {(this.state.userFilter) ? (
                <Button compact color='green' size='small'>User</Button>) : (
                <Button compact size='small' onClick={() => this.setState({ userFilter: true, likeFilter: false, alphaFilter: false, dateFilter: false })}>User</Button>
              )}
            </List.Item>
          </List>
          <Card.Group centered itemsPerRow={3}>
            {(_.size(filterJams(this.props.jams, searchField.toLowerCase())) > 0) ?
              (sort(filterJams(this.props.jams, searchField.toLowerCase()), this.state.likeFilter, this.state.userFilter, this.state.alphaFilter).map((jam, index) => <JamCard
                key={index}
                jam={jam}
                profile={getProfile(this.props.profiles, jam)}
                comments={this.props.comments.filter(comment => (comment.jamID === jam._id))}
                isLiked={isLiked(_.filter(this.props.profiles, function (profile) { return profile.email === Meteor.user().username; }), this.props.likedJams, jam._id)}/>)
              ) : this.displayNoJams()
            }
          </Card.Group>
        </Container>
      </div>
    );
  }

  displayNoJams() {
    return (
      <div style={{ paddingTop: '200px', paddingBottom: '200px' }}>
        <Header inverted as='h2'>No Jams Found From Filter</Header>
        <Image centered src='https://c.tenor.com/HJvqN2i4Zs4AAAAj/milk-and-mocha-cute.gif'/>
      </div>
    );
  }
}

BrowseJams.propTypes = {
  jams: PropTypes.array.isRequired,
  profiles: PropTypes.array.isRequired,
  likedJams: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const sub = Meteor.subscribe(Jams.userPublicationName);
  const sub2 = Meteor.subscribe(Profiles.userPublicationName);
  const sub3 = Meteor.subscribe(LikedJams.userPublicationName);
  const sub4 = Meteor.subscribe(Comments.userPublicationName);
  const ready = sub.ready() && sub2.ready() && sub3.ready() && sub4.ready();
  const jams = Jams.collection.find().fetch();
  const profiles = Profiles.collection.find().fetch();
  const likedJams = LikedJams.collection.find().fetch();
  const comments = Comments.collection.find().fetch();
  return {
    jams,
    profiles,
    likedJams,
    comments,
    ready,
  };
})(BrowseJams);
