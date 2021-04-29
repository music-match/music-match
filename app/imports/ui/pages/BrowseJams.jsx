import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Container, Header, Loader, Card, Input, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Jams } from '../../api/profile/Jams';
import JamCard from '../components/JamCard';
import { Profiles } from '../../api/profile/Profiles';
import { LikedJams } from '../../api/profile/LikedJams';

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
class BrowseJams extends React.Component {

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
    return (
      <div className='music-background'>
        <Container id='browse-jams'>
          <Header inverted as="h2" textAlign="center">Browse Jams</Header>
          <div className='search-padding'>
            <Input fluid onChange={this.handleSearch.bind(this)}
              placeholder='Search Jams by Name...'
            />
          </div>
          <Card.Group centered itemsPerRow={3}>
            {(_.size(filterJams(this.props.jams, searchField.toLowerCase())) > 0) ?
              (alphaSort(filterJams(this.props.jams, searchField.toLowerCase())).map((jam, index) => <JamCard
                key={index}
                jam={jam}
                profile={getProfile(this.props.profiles, jam)}
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

// Require an array of Stuff documents in the props.
BrowseJams.propTypes = {
  jams: PropTypes.array.isRequired,
  profiles: PropTypes.array.isRequired,
  likedJams: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const sub = Meteor.subscribe(Jams.userPublicationName);
  const sub2 = Meteor.subscribe(Profiles.userPublicationName);
  const sub3 = Meteor.subscribe(LikedJams.userPublicationName);
  // Determine if the subscription is ready
  const ready = sub.ready() && sub2.ready() && sub3.ready();
  // Get the Stuff documents
  const jams = Jams.collection.find().fetch();
  const profiles = Profiles.collection.find().fetch();
  const likedJams = LikedJams.collection.find().fetch();
  return {
    jams,
    profiles,
    likedJams,
    ready,
  };
})(BrowseJams);
