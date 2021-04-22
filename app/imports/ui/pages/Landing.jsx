import React from 'react';
import { _ } from 'meteor/underscore';
import { Header, Container, Button, Message, Grid, Icon, Card, Embed, Feed, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { FeaturedJam } from '../../api/profile/FeaturedJam';
import { Profiles } from '../../api/profile/Profiles';

function getProfile(profiles, email) {
  return _.find(profiles, function (profile) { return profile.email === email; });
}

/** A simple static component to render some text for the landing page. */
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
                <Message compact color='black'>
                  <div className='landing-header'>
                    <Header inverted>Music Match</Header>
                  </div>
                </Message>
              </Grid>
            </div>
            <Button color='blue' size='huge' href='https://music-match.github.io/'>About Us</Button>
          </Container>
        </div>

        <div className='landing-background'>
          <Grid container centered stackable columns={3}>
            <Grid.Column textAlign='center'>
              <Header inverted as='h1' icon>
                <Icon name='headphones'/>
                  Share Your Jams
              </Header>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Header inverted as='h1' icon>
                <Icon name='users'/>
                  Network with Musicians
              </Header>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Header inverted as='h1' icon>
                <Icon name='search'/>
                  Browse by Interests
              </Header>
            </Grid.Column>
          </Grid>

          <Grid centered>
            <Grid.Column width={5}>
              <Card fluid>
                <Card.Content style={{ height: '600px' }}>
                  <Header className='landing-card-header' textAlign='center'>News & Events</Header>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label>
                        <img src='images/logo2.png' alt='logo'/>
                      </Feed.Label>
                      <Feed.Content>
                        <Feed.Summary>Music Match Site</Feed.Summary>
                        <Feed.Meta>This site is currently under construction.</Feed.Meta>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
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
}
// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
Landing.propTypes = {
  profiles: PropTypes.array.isRequired,
  featuredjam: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const sub1 = Meteor.subscribe(FeaturedJam.userPublicationName);
  const sub2 = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = sub1.ready() && sub2.ready();
  // Get the document
  const profiles = Profiles.collection.find().fetch();
  const featuredjams = FeaturedJam.collection.find().fetch();
  const featuredjam = _.first(featuredjams);
  return {
    profiles,
    featuredjam,
    ready,
  };
})(Landing);
