import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Form, Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Profiles } from '../../api/profile/Profiles';

const formSchema = new SimpleSchema({
  name: String,
  address: String,
  image: String,
  goals: String,
  instruments: {
    type: String,
    optional: true,
  },
  phone: {
    type: String,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** A simple static component to render some text for the landing page. */
class CreateProfile extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, address, image, goals, phone, instruments } = data;
    const email = Meteor.user().username;
    Profiles.collection.insert({ name, address, image, goals, email, phone, instruments },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile Created', 'success');
          // formRef.reset();
        }
      });
  }

  render() {
    return (
      <div className='music-background'>
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Create Profile</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} >
              <Segment>
                <Form.Group widths='equal'>
                  <TextField name='name' />
                  <TextField name='address' />
                  <TextField name='phone' placeholder='(XXX) XXX-XXXX'/>
                </Form.Group>
                <TextField name='image'/>
                <TextField name='instruments' placeholder='List the instruments separated by comma. Leave blank if none.'/>
                <LongTextField name='goals'/>
                <SubmitField value='Submit'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default CreateProfile;
