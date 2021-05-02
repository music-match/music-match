import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Redirect } from 'react-router';
import { Jams } from '../../api/profile/Jams';

const formSchema = new SimpleSchema({
  title: String,
  link: {
    type: String,
    label: 'YouTube Link',
  },
  description: String,
  email: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

function getID(link) {
  let start = link.indexOf('=');
  let end = link.indexOf('&');
  if (end === -1) {
    end = link.length;
  }
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

/** Renders the Page for editing a single document. */
class EditJams extends React.Component {

  constructor() {
    super();
    this.state = { redirectToMyJams: false };
  }

  // On successful submit, insert the data.
  submit(data) {
    const { title, link, description, _id } = data;
    const email = Meteor.user().username;
    const id = getID(link);
    if (!isYouTube(link)) {
      swal('Error', 'Invalid Youtube Link', 'error');
      return;
    }
    Jams.collection.update(_id, { $set: { title, id, description, email } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success').then(() => { this.setState({ redirectToMyJams: true }); })));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    if (this.state.redirectToMyJams) {
      return <Redirect to={'/my-jams'}/>;
    }
    return (
      <div className='music-background'>
        <Grid container centered>
          <Grid.Column>
            <Header inverted as="h2" textAlign="center">Edit Jams</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.jam}>
              <Segment>
                <TextField name='title'/>
                <TextField name='link'/>
                <LongTextField name='description'/>
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

EditJams.propTypes = {
  jam: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Jams documents.
  const subscription = Meteor.subscribe(Jams.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const jam = Jams.collection.findOne(documentId);
  jam.link = `https://www.youtube.com/watch?v=${jam.id}`;
  return {
    jam,
    ready,
  };
})(EditJams);
