import React from 'react';
import { Container, Grid, Header, List } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '30px', color: 'white' };
    return (
      <footer style={divStyle}>
        <Container>
          <Grid relaxed='very' columns={2}>
            <Grid.Column>
              <Header as='h3' inverted>Organization Information</Header>
              <hr/>
              <List>
                <List.Item><a className='white-link' href='https://music-match.github.io/'>Project Page</a></List.Item>
                <List.Item><a className='white-link' href='https://github.com/music-match'>Our Github</a></List.Item>
              </List>
            </Grid.Column>

            <Grid.Column>
              <Header as='h3' inverted>About Us</Header>
              <hr/>
              <List>
                <List.Item>Music Match Inc.</List.Item>
                <List.Item>University of Hawaii at Manoa</List.Item>
                <List.Item>Honolulu, HI 96822</List.Item>
              </List>
            </Grid.Column>
          </Grid>
        </Container>
      </footer>
    );
  }
}

export default Footer;
