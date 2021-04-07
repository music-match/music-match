import React from 'react';
import { Container, Header, Card, Image, Label, Input } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class BrowseUsers extends React.Component {
  render() {
    return (
      <div className='music-background'>
        <Container>
          <Input fluid
            icon={{ name: 'search', circular: true, link: true }}
            placeholder='Search User...'
          />
          <Header as="h2" textAlign="center" inverted>Browse Users</Header>
          <Card.Group centered>
            <Card>
              <Card.Content>
                <Image floated='right' size='mini' src='https://ethancheez.github.io/images/ethan.jpg'/>
                <Card.Header>Ethan Chee</Card.Header>
                <Card.Description>Goals: Become a Computer Engineer, Develop Innovative Technologies</Card.Description>
                <Header as='h4'>Music Interests:</Header>
                <Label>Pop</Label>
                <Label>Alternate</Label>
              </Card.Content>
              <Card.Content extra>
                <Link to="/viewprofile">View Profile</Link>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <Image floated='right' size='mini' src=''/>
                <Card.Header>John Doe</Card.Header>
                <Card.Description>Goals: </Card.Description>
                <Header as='h4'>Music Interests:</Header>
                <Label>stuff</Label>
                <Label>other stuff</Label>
              </Card.Content>
              <Card.Content extra>
                <Link to="/ViewProfile">View Profile</Link>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <Image floated='right' size='mini' src=''/>
                <Card.Header>John Doe</Card.Header>
                <Card.Description>Goals: </Card.Description>
                <Header as='h4'>Music Interests:</Header>
                <Label>stuff</Label>
                <Label>other stuff</Label>
              </Card.Content>
              <Card.Content extra>
                <Link to="/ViewProfile">View Profile</Link>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <Image floated='right' size='mini' src=''/>
                <Card.Header>John Doe</Card.Header>
                <Card.Description>Goals: </Card.Description>
                <Header as='h4'>Music Interests:</Header>
                <Label>stuff</Label>
                <Label>other stuff</Label>
              </Card.Content>
              <Card.Content extra>
                <Link to="/ViewProfile">View Profile</Link>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <Image floated='right' size='mini' src=''/>
                <Card.Header>John Doe</Card.Header>
                <Card.Description>Goals: </Card.Description>
                <Header as='h4'>Music Interests:</Header>
                <Label>stuff</Label>
                <Label>other stuff</Label>
              </Card.Content>
              <Card.Content extra>
                <Link to="/ViewProfile">View Profile</Link>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <Image floated='right' size='mini' src=''/>
                <Card.Header>John Doe</Card.Header>
                <Card.Description>Goals: </Card.Description>
                <Header as='h4'>Music Interests:</Header>
                <Label>stuff</Label>
                <Label>other stuff</Label>
              </Card.Content>
              <Card.Content extra>
                <Link to="/ViewProfile">View Profile</Link>
              </Card.Content>
            </Card>
          </Card.Group>
        </Container>
      </div>

    );
  }
}

export default withRouter(BrowseUsers);
