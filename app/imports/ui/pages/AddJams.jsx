import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  LongTextField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Jams } from '../../api/profile/Jams';

function getID(link) {
  let start = link.indexOf('=');
  const end = link.indexOf('&');

  if (start < 0) {
    start = link.lastIndexOf('/');
    return link.substring(start + 1);
  }
  return link.substring(start + 1, end);
}

function isYouTube(link) {
  if (link.indexOf('youtube.com/') > 0 || link.indexOf('youtu.be/') > 0) {
    return true;
  }
  return false;
}

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: String,
  link: {
    type: String,
    label: 'YouTube Link',
  },
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { title, link, description } = data;
    const email = Meteor.user().username;
    const id = getID(link);

    if (!isYouTube(link)) {
      swal('Error', 'Invalid YouTube Link', 'error');
      return;
    }

    Jams.collection.insert({ title, id, description, email },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <div className='music-background'>
        <Grid container centered>
          <Grid.Column>
            <Header inverted as="h2" textAlign="center">Create Jam</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='title' placeholder={'Title of the Jam'}/>
                <TextField name='link' placeholder={'Please only insert YouTube links, acquired from the search bar of your browser'}/>
                <LongTextField name='description' placeholder={'Description of the Jam, such as the original artist'}/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AddStuff;
