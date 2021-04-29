import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { Form, Grid, Image, Loader, Segment, Button } from 'semantic-ui-react';
import { AutoForm, LongTextField, SelectField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
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
  skill: { type: Number, label: 'Music Skill Level', allowedValues: [0, 1, 2, 3, 4, 5] },
  interests: { type: Array, label: 'Music Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
});

/** A simple static component to render some text for the landing page. */
class EditProfile extends React.Component {

  constructor() {
    super();
    this.redirectToMyProfile = false;
  }

  // On successful submit, insert the data.
  submit(data) {
    Meteor.call(updateProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
      }
    });
    this.redirectToMyProfile = true;
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    if (this.redirectToMyProfile) {
      return <Redirect to={`/viewprofile/${this.props.profile._id}`}/>;
    }
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
          <Grid.Column width={6}>
            <Image size='medium' src={this.props.profile.image}/>
          </Grid.Column>
          <Grid.Column width={10}>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={model}>
              <Segment>
                <Form.Group widths='equal'>
                  <TextField name='name' showInlineError={true} placeholder='Full Name'/>
                  <TextField name='phone' placeholder='(XXX) XXX-XXXX' showInlineError={true}/>
                </Form.Group>
                <TextField name='address' showInlineError={true} placeholder='Address'/>
                <TextField name='image' showInlineError={true} placeholder='Insert Complete Image URL'/>
                <LongTextField name='goals' showInlineError={true} placeholder='State your goals here. This can be goals related to anything.'/>
                <TextField name='instruments' showInlineError={true} placeholder='List the instruments separated by comma. Leave blank if none.'/>
                <Form.Group widths='equal'>
                  <MultiSelectField name='interests' showInlineError={true} placeholder={'Music Interests'}/>
                  <SelectField name='skill'/>
                </Form.Group>
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
