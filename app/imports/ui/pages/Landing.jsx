import React from 'react';
import { _ } from 'meteor/underscore';
import { Header, Container, Button, Grid, Card, Embed, Feed, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { FeaturedJam } from '../../api/profile/FeaturedJam';
import { Profiles } from '../../api/profile/Profiles';

function getProfile(profiles, email) {
  return _.find(profiles, function (profile) { return profile.email === email; });
}

class Landing extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <div id='landing-page'>
        <div className='bg-image'>
          <Container textAlign='center'>
            <div className='landing-padding'>
              <Grid centered>
                <div className='landing-header'>
                  <Header inverted>Music Match</Header>
                </div>
              </Grid>
            </div>
            <Link to={'/about-us'}><Button color='blue' size='huge'>About Us</Button></Link>
            <div style={{ paddingTop: '350px' }}>
              {(!this.props.username) ? (
                <Header inverted as='h2'>Login to begin exploring!</Header>
              ) : ('')}
              {(this.props.username && _.size(getProfile(this.props.profiles, this.props.username)) === 0) ? (
                <Header inverted as='h2'>Create a profile to begin exploring!</Header>
              ) : ('')}
              {(this.props.username && _.size(getProfile(this.props.profiles, this.props.username)) > 0) ? (
                <Header inverted as='h2'>Explore the site using the Navbar!</Header>
              ) : ('')}
            </div>
          </Container>
        </div>

        <div className='landing-background'>
          <Grid centered stackable>
            <Grid.Column width={5}>
              <Card fluid>
                <Card.Content style={{ height: '400px' }}>
                  <Header className='landing-card-header' textAlign='center'>News & Events</Header>
                  {this.displayNewsEvents()}
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={1}>{}</Grid.Column>
            <Grid.Column width={7}>
              <Card fluid>
                <Card.Content>
                  <Header className='landing-card-header' textAlign='center'>Featured Jam</Header>
                  <Card.Header textAlign='center'>{this.props.featuredjam.title}</Card.Header>
                  <Embed
                    source='youtube'
                    id={this.props.featuredjam.id}
                    active={true}
                    hd={true}
                    iframe={{
                      allowFullScreen: true,
                    }}
                    autoplay={false}
                  />
                  <Card.Description>
                    <Header as='h4'>Description:</Header>
                    {this.props.featuredjam.description}
                  </Card.Description>
                </Card.Content>
                {(getProfile(this.props.profiles, this.props.featuredjam.email) ?
                  (<Card.Content extra>Recommended By: <Link to={`/viewprofile/${getProfile(this.props.profiles, this.props.featuredjam.email)._id}`}>{this.props.featuredjam.email}</Link></Card.Content>) : ''
                )}
              </Card>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }

  displayNewsEvents() {
    return (
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <img src='images/logo2.png' alt='logo'/>
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>Music Match Developers</Feed.Summary>
            <Feed.Meta>Thank you for all your feedback! We will be slowly improving our site so stay tuned!</Feed.Meta>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label>
            <img src='images/logo2.png' alt='logo'/>
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>Music Match Site</Feed.Summary>
            <Feed.Meta>This site has been completed! Explore and network with your fellow UH Musicians!</Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    );
  }
}
Landing.propTypes = {
  username: PropTypes.string,
  profiles: PropTypes.array.isRequired,
  featuredjam: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const username = Meteor.user() ? Meteor.user().username : '';
  // Get access to documents.
  const sub1 = Meteor.subscribe(FeaturedJam.userPublicationName);
  const sub2 = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = sub1.ready() && sub2.ready();
  // Get the documents
  const profiles = Profiles.collection.find().fetch();
  const featuredjams = FeaturedJam.collection.find().fetch();
  const featuredjam = _.first(featuredjams);
  return {
    username,
    profiles,
    featuredjam,
    ready,
  };
})(Landing);
