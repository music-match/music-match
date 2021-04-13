import React from 'react';
import { Grid, Card, Image, Header, Label, Rating } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class ViewProfile extends React.Component {
  render() {
    return (
      <div className='music-background'>
        <Grid container columns={2}>
          <Grid.Column>
            <Image size='medium' src='https://ethancheez.github.io/images/ethan.jpg'/>
          </Grid.Column>
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Card.Header>Ethan Chee</Card.Header>
                <Card.Meta>Honolulu, Hawaii</Card.Meta>
                <Card.Meta>(XXX) XXX-XXXX, john@foo.com</Card.Meta>
                <Card.Description>Goals: Become a Computer Engineer, Develop Innovative Technologies</Card.Description>
                <Header as='h4'>Instruments:</Header>
                <p>Harmonica, Piano, Banjo</p>
                <Header as='h4'>Skill Level:</Header>
                <Rating icon='star' defaultRating={3} maxRating={5} />
                <Header as='h4'>Music Interests:</Header>
                <Label>Pop</Label>
                <Label>Alternate</Label>
              </Card.Content>
              <Card.Content extra>
                <Link to="/editprofile">Edit Profile</Link>
              </Card.Content>
              <Card.Content extra>
                <Link to="/my-jams">My Jams</Link>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default ViewProfile;
