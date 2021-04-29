import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Form, Grid, Segment, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Profiles } from '../../api/profile/Profiles';
import { AllInterests } from '../../api/interests/AllInterests';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { MusicInterests } from '../../api/profile/MusicInterests';
import { addProfile } from '../../startup/both/Methods';

const makeSchema = (allInterests) => new SimpleSchema({
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
class CreateProfile extends React.Component {

  constructor() {
    super();
    this.state = { redirectToLanding: false };
  }

  // On successful submit, insert the data.
  submit(tempData) {
    const { name, address, image, goals, phone, instruments, interests, skill } = tempData;
    const email = Meteor.user().username;

    const data = {
      name: name,
      address: address,
      image: image,
      goals: goals,
      email: email,
      phone: phone,
      instruments: instruments,
      skill: skill,
      interests: interests,
    };

    Meteor.call(addProfile, data, (error) => {
      if (error) {
        if (error.message === '[Profile already exists! Redirecting to Home Page...]') {
          swal('Error', error.message, 'error').then(() => this.setState({ redirectToLanding: true }));
        } else {
          swal('Error', error.message, 'error');
        }
      } else {
        swal('Profile Created!', 'Welcome to Music Match!', 'success').then(() => this.setState({ redirectToLanding: true }));
      }
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    if (this.state.redirectToLanding) {
      return <Redirect to={'/'}/>;
    }
    const allInterests = _.pluck(AllInterests.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allInterests);
    const bridge = new SimpleSchema2Bridge(formSchema);

    return (
      <div className='music-background'>
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Create Profile</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
              <Segment>
                <Form.Group widths='equal'>
                  <TextField name='name' showInlineError={true}/>
                  <TextField name='address' showInlineError={true}/>
                  <TextField name='phone' placeholder='(XXX) XXX-XXXX' showInlineError={true}/>
                </Form.Group>
                <TextField name='image' showInlineError={true}/>
                <LongTextField name='goals' showInlineError={true}/>
                <TextField name='instruments'
                  placeholder='List the instruments separated by comma. Leave blank if none.'
                  showInlineError={true}/>
                <Form.Group widths='equal'>
                  <MultiSelectField name='interests' showInlineError={true} placeholder={'Music Interests'}/>
                  <SelectField name='skill'/>
                </Form.Group>
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

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
CreateProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const sub1 = Meteor.subscribe(AllInterests.userPublicationName);
  const sub2 = Meteor.subscribe(Profiles.userPublicationName);
  const sub3 = Meteor.subscribe(MusicInterests.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(CreateProfile);
