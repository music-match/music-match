import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { Form, Grid, Image, Loader, Segment, Button } from 'semantic-ui-react';
import { AutoForm, LongTextField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { AllInterests } from '../../api/interests/AllInterests';
import { MusicInterests } from '../../api/profile/MusicInterests';
import { Profiles } from '../../api/profile/Profiles';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { updateProfileMethod } from '../../startup/both/Methods';

const makeSchema = (allInterests) => new SimpleSchema({
  email: { type: String, label: 'Email' },
  name: { type: String, label: 'Name' },
  address: { type: String, label: 'Address (Optional)', optional: true },
  image: { type: String, label: 'Image URL' },
  goals: { type: String, label: 'Goals' },
  phone: { type: String, label: 'Phone (Optional)', optional: true },
  instruments: { type: String, label: 'Instruments', optional: true },
  interests: { type: Array, label: 'Music Interests' },
  'interests.$': { type: String, allowedValues: allInterests },
});

/** A simple static component to render some text for the landing page. */
class EditProfile extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    Meteor.call(updateProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
      }
    });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const email = this.props.profile.email;
    // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
    const allInterests = _.pluck(AllInterests.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allInterests);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // Now create the model with all the user information.
    const interests = _.pluck(MusicInterests.collection.find({ email: email }).fetch(), 'type');
    const profile = Profiles.collection.findOne({ email });
    const model = _.extend({}, profile, { interests });

    return (
      <div className='music-background'>
        <Grid container columns={2}>
          <Grid.Column>
            <Image size='medium' src={this.props.profile.image}/>
          </Grid.Column>
          <Grid.Column>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={model}>
              <Segment>
                <Form.Group widths='equal'>
                  <TextField name='name' showInlineError={true} />
                  <TextField name='phone' placeholder='(XXX) XXX-XXXX' showInlineError={true}/>
                </Form.Group>
                <TextField name='address' showInlineError={true}/>
                <TextField name='image' showInlineError={true}/>
                <LongTextField name='goals' showInlineError={true}/>
                <TextField name='instruments' showInlineError={true} placeholder='List the instruments separated by comma. Leave blank if none.'/>
                <MultiSelectField name='interests' showInlineError={true} placeholder={'Music Interests'}/>
                <Button color='green'>Save Changes</Button>
                <Button href={`#/viewprofile/${this.props.profile._id}`} color='red'>Go Back</Button>
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
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  const sub2 = Meteor.subscribe(AllInterests.userPublicationName);
  // Determine if the subscription is ready
  const ready = sub1.ready() && sub2.ready();
  // Get the document
  const profile = Profiles.collection.findOne(documentId);
  return {
    profile,
    ready,
  };
})(EditProfile);
