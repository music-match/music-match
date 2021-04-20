import React from 'react';
import { Header, Container, Button, Message, Grid, Icon, Card, Embed, Feed } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <div className='bg-image'>
          <Container textAlign='center'>
            <div className='landing-padding'>
              <Grid centered>
                <Message compact color='black'>
                  <div className='landing-header'>
                    <Header inverted color='white'>Music Match</Header>
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
                  <Card.Header textAlign='center'>Example Jam Title</Card.Header>
                  <Embed
                    source='youtube'
                    id='n8kGMPCYxSo'
                    active={true}
                    hd={true}
                    iframe={{
                      allowFullScreen: true,
                    }}
                    autoplay={false}
                  />
                  <Card.Description>
                      Example Jam Description
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a href='#'>Recommended By: </a>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>

        </div>

      </div>
    );
  }
}

export default Landing;
