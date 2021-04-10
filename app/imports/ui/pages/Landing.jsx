import React from 'react';
import { Grid, Header, Icon, Embed, Container, Card } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className={ 'bg-image' }>
        <Grid container centered stackable columns={3}>
          <Grid.Column textAlign='center'>
            <Header inverted as='h1' icon>
              <Icon name='users'/>
              Network with Musicians
            </Header>
            <Header inverted as='h3'>
              Network with other musicians by using the contact information they listed on their profile.
            </Header>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Grid.Row>
              <Header inverted as='h1' icon>
                <Icon name='music'/>
                Create a Profile
              </Header>
              <Header inverted as='h3'>
                Create a profile with your musical interests, goals, skills, and other information. Your profile will be visible to other users on the platform.
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Header inverted as='h1' icon>
                <Icon name='headphones'/>
                  Featured Jams
              </Header>
              <Header inverted as='h3'>
                  Post your jams to share with others, and possibly be featured on our weekly home page featured jam!
              </Header>
            </Grid.Row>
            <Grid.Row>
              <div className={ 'featured-jam' }>
                <Container>
                  <Card centered fluid>
                    <Card.Content>
                      <Card.Header textAlign={'center'}>
                        Example Jam Title
                      </Card.Header>
                      <Embed
                        source='youtube'
                        id='n8kGMPCYxSo'
                        active={true}
                        hd={true}
                        iframe={{
                          allowFullScreen: true,
                        }}
                      />
                      <Card.Description>
                        Example Jam Description
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <a href='#'>Creator&apos;s Profile</a>
                    </Card.Content>
                  </Card>
                </Container>
              </div>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Header inverted as='h1' icon>
              <Icon name='search'/>
                  Browse by Interests
            </Header>
            <Header inverted as='h3'>
                  You can use our search bar to filter people with certain musical interests, goals, backgrounds, and skill levels to browse various profiles.
            </Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Landing;
