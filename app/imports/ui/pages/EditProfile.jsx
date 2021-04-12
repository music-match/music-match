import React from 'react';
import { Form, Grid, Image, Rating, Header, Card, Button } from 'semantic-ui-react';

const options = [
  { key: 'm', text: 'Piano', value: 'male' },
  { key: 'f', text: 'Guitar', value: 'female' },
  { key: 'o', text: 'Harmonica', value: 'other' },
];

/** A simple static component to render some text for the landing page. */
class EditProfile extends React.Component {
  render() {
    return (
      <div className='music-background'>
        <Grid container columns={2}>
          <Grid.Column>
            <Image size='medium' src='https://ethancheez.github.io/images/ethan.jpg'/>
          </Grid.Column>
          <Grid.Column>
            <Card fluid>
              <div className='padding'>
                <Form>
                  <Form.Group widths='equal'>
                    <Form.Input fluid label='Full Name' placeholder='Full Name' />
                    <Form.Input fluid label='Location' placeholder='Location' />
                    <Form.Input fluid label='Contact' placeholder='Contact' />
                  </Form.Group>
                  <Form.Input fluid label='Change Profile Image' placeholder='Change Profile Image'/>
                  <Form.TextArea label='Goals' placeholder='Add your music goals here...' />
                  <Form.TextArea label='Instruments' placeholder='Add your instruments here...' />
                  <Form.Select
                    fluid
                    label='Music Interests'
                    options={options}
                    placeholder='Select...'
                  />
                  <Header as='h4'>Skill Level:</Header>
                  <Rating icon='star' clearable defaultRating={3} maxRating={5} />
                </Form>
                <Button>Save Changes</Button>
              </div>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default EditProfile;
