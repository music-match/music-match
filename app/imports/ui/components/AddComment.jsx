import React from 'react';
import { Segment, Grid, Image, Button } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Comments } from '../../api/comment/Comments';

const bridge = new SimpleSchema2Bridge(Comments.schema);

/** Renders the Page for adding a document. */
class AddComment extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { comment, owner, jamID, profileID, email, image, createdAt } = data;
    Comments.collection.insert({ comment, owner, jamID, profileID, email, image, createdAt },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Comment Posted!', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <Segment>
          <Grid columns={2}>
            <Grid.Column width={2}>
              <Image circular size='tiny' src={this.props.image}/>
            </Grid.Column>
            <Grid.Column width={14}>
              <TextField label="Post a Comment" name='comment'/>
            </Grid.Column>
          </Grid>
          <br/>
          <Button color='orange'>Submit</Button>
          <ErrorsField/>
          <HiddenField name='owner' value={this.props.owner}/>
          <HiddenField name='jamID' value={this.props.jamID}/>
          <HiddenField name='profileID' value={this.props.profileID}/>
          <HiddenField name='email' value={this.props.email}/>
          <HiddenField name='image' value={this.props.image}/>
          <HiddenField name='createdAt' value={new Date()}/>
        </Segment>
      </AutoForm>
    );
  }
}

AddComment.propTypes = {
  owner: PropTypes.string.isRequired,
  jamID: PropTypes.string.isRequired,
  profileID: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default AddComment;
