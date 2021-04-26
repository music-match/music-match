import React from 'react';
import { Grid, Card, Image, Container, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class AboutUs extends React.Component {
  render() {
    return (
      <div className='music-background'>
        <h1 className='about-us-text'>About Us</h1>
        <Container className='about-us-text' text>
          <p>
            Aloha! Welcome to Music-Match, made to give the musical students of UH Manoa a new way to meet and show off their skills.
          </p>
          <p>
            Many UH students have musical talents and Music Match is here to provide students with a new way to find
            others with similar music abilities and interests. Here not only can you create your own account to post
            fun jam sessions, but you can also search to find other students with similar interests as you. Meet
            your next jam group here with Music Match! (click <a href='https://music-match.github.io/'>here</a> to visit our Project Page)
          </p>
        </Container>
        <h1 className='about-us-text'>Meet our Developers</h1>
        <Grid container columns={34}>
          <Grid.Column width={4}>
            <Card>
              <Image src='https://ethancheez.github.io/images/ethan.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Ethan Chee</Card.Header>
                <Card.Description>
                  Ethan is a student majoring in computer engineering at the University of Hawaii at Manoa. His interests include electrical engineering, software engineering, and artificial intelligence.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>Interests:</a>
                <li>Electrical Engineering</li>
                <li>Software Engineering</li>
                <li>Artificial Intelligence</li>
              </Card.Content>
              <Card.Content extra>
                <a href='https://github.com/ethancheez'><Icon name='github'/></a>
                <a href='https://linkedin.com/in/ethan-cheez'><Icon name='linkedin'/></a>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card>
              <Image src='https://prestontgarcia.github.io/images/WIN_20210114_12_58_00_Pro.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Preston Garcia</Card.Header>
                <Card.Description>
                  Preston is a student majoring in computer science, and minoring in physics at the University of Hawaii at Manoa. His interests include gaming, creating simulations or visualizations with programming, and listening to music to relax.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>Interests:</a>
                <li>Gaming</li>
                <li>Simulation Programming</li>
                <li>Visualizations in Programming</li>
                <li>Listening to Music</li>
              </Card.Content>
              <Card.Content extra>
                <a href='https://github.com/PrestonTGarcia'><Icon name='github'/></a>
                <a href='https://www.linkedin.com/in/preston-garcia-371112204/'><Icon name='linkedin'/></a>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card>
              <Image src='https://icce2k.github.io/images/professionalsquare.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Isaiah Eusebio</Card.Header>
                <Card.Description>
                  Isaiah is a student majoring in computer science at the University of Hawaii at Manoa. His interests include software engineering, artificial intelligence, and game development.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>Interests:</a>
                <li>Software Engineering</li>
                <li>Artificial Intelligence</li>
                <li>Game Development</li>
              </Card.Content>
              <Card.Content extra>
                <a href='https://github.com/icce2k'><Icon name='github'/></a>
                <a href='https://www.linkedin.com/in/isaiah-eusebio/'><Icon name='linkedin'/></a>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card>
              <Image src='https://adamjparrilla.github.io/images/profilepicture.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Adam Parrilla</Card.Header>
                <Card.Description>
                  Adam is a student majoring in computer science and art studio at the University of Hawaii at Manoa. His interests include drawing, painting, reading, video games and game development.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>Interests:</a>
                <li>Drawing & Painting</li>
                <li>Reading</li>
                <li>Software Engineering</li>
                <li>Game Development</li>
              </Card.Content>
              <Card.Content extra>
                <a href='https://github.com/adamjparrilla'><Icon name='github'/></a>
                <a href='http://linkedin.com/in/adam-joseph-parrilla'><Icon name='linkedin'/></a>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AboutUs;
