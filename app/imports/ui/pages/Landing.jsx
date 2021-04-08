import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className={ 'bg-image' }>
        <Grid container centered stackable columns={3}>
          <Grid.Column textAlign='center'>
            <Header inverted as='h1' icon>
              <Icon name='music'/>
              Create a Profile
            </Header>
            <Header inverted as='h3'>
              Create a profile with your musical interests, goals, skills, and other information. Your profile will be visible to other users on the platform.
            </Header>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Header inverted as='h1' icon>
              <Icon name='share alternate'/>
              Network with Musicians
            </Header>
            <Header inverted as='h3'>
              Network with others using their contact information on their profile.
            </Header>
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
