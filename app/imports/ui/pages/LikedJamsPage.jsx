import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Container, Header, Loader, Card, Input, Image, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Jams } from '../../api/profile/Jams';
import JamCard from '../components/JamCard';
import { Profiles } from '../../api/profile/Profiles';
import { LikedJams } from '../../api/profile/LikedJams';
import { Comments } from '../../api/comment/Comments';

function alphaSort(jams) {
  return _.sortBy(jams, function (jam) { return jam.title.toLowerCase(); });
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

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class LikedJamsPage extends React.Component {

  constructor() {
    super();
    this.state = {
      searchField: '',
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
    const likedJams = _.filter(this.props.jams, (jam) => isLiked(_.filter(this.props.profiles, function (profile) { return profile.email === Meteor.user().username; }), this.props.likedJams, jam._id));
    return (
      <div className='music-background'>
        <Container id='liked-jams'>
          <Header inverted as="h2" textAlign="center">Liked Jams</Header>
          <div className='search-padding'>
            <Input fluid onChange={this.handleSearch.bind(this)}
              placeholder='Search Jams by Name...'
            />
          </div>
          {(_.size(likedJams) > 0) ? (
            <Card.Group centered itemsPerRow={3}>
              {(_.size(filterJams(likedJams, searchField.toLowerCase())) > 0) ?
                (alphaSort(filterJams(likedJams, searchField.toLowerCase())).map((jam, index) => <JamCard
                  key={index}
                  jam={jam}
                  profile={getProfile(this.props.profiles, jam)}
                  comments={this.props.comments.filter(comment => (comment.jamID === jam._id))}
                  isLiked={true}/>)
                ) : this.displayNoFilter()
              }
            </Card.Group>
          ) : this.displayNoLikes()}
        </Container>
      </div>
    );
  }

  displayNoFilter() {
    return (
      <div style={{ paddingTop: '200px', paddingBottom: '200px' }}>
        <Header inverted as='h2'>No Jams Found From Filter</Header>
        <Image centered src='https://c.tenor.com/HJvqN2i4Zs4AAAAj/milk-and-mocha-cute.gif'/>
      </div>
    );
  }

  displayNoLikes() {
    return (
      <Container textAlign='center' style={{ paddingTop: '50px', paddingBottom: '50px' }}>
        <Header inverted as='h4'>You have not liked any Jams! Click the button below to explore all the Jams!</Header>
        <Button color='orange' size='huge' href='#/browse-jams'>Browse Jams</Button>
        <Image style={{ paddingTop: '100px' }} centered size='medium' src='https://c.tenor.com/HJvqN2i4Zs4AAAAj/milk-and-mocha-cute.gif'/>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
LikedJamsPage.propTypes = {
  jams: PropTypes.array.isRequired,
  profiles: PropTypes.array.isRequired,
  likedJams: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const sub = Meteor.subscribe(Jams.userPublicationName);
  const sub2 = Meteor.subscribe(Profiles.userPublicationName);
  const sub3 = Meteor.subscribe(LikedJams.userPublicationName);
  const sub4 = Meteor.subscribe(Comments.userPublicationName);
  // Determine if the subscription is ready
  const ready = sub.ready() && sub2.ready() && sub3.ready() && sub4.ready();
  // Get the Stuff documents
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
})(LikedJamsPage);
