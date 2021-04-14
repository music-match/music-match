import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Form, Grid, Image, Loader, Segment } from 'semantic-ui-react';
import { AutoForm, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/** A simple static component to render some text for the landing page. */
class EditProfile extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, address, image, goals, phone, _id } = data;
    Profiles.collection.update(_id, { $set: { name, address, image, goals, phone } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <div className='music-background'>
        <Grid container columns={2}>
          <Grid.Column>
            <Image size='medium' src={this.props.profile.image}/>
          </Grid.Column>
          <Grid.Column>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.profile}>
              <Segment>
                <Form.Group widths='equal'>
                  <TextField name='name' />
                  <TextField name='phone' placeholder='(XXX) XXX-XXXX'/>
                </Form.Group>
                <TextField name='address' />
                <TextField name='image'/>
                <LongTextField name='goals'/>
                <SubmitField value='Save Changes'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditProfile.propTypes = {
  profile: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const profile = Profiles.collection.findOne(documentId);
  return {
    profile,
    ready,
  };
})(EditProfile);
