import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Embed, Header, Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { addFeaturedJam } from '../../startup/both/Methods';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class JamCardAdmin extends React.Component {

  submit(title, id, description, email, _id) {
    const data = {
      title: title,
      id: id,
      description: description,
      email: email,
      _id: _id,
    };

    Meteor.call(addFeaturedJam, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Featured Jam Updated', 'success');
      }
    });
  }

  render() {
    return (
      <Card centered>
        <Card.Content>
          <Card.Header textAlign={'center'}>{this.props.jam.title}</Card.Header>
          <Embed
            source='youtube'
            id={this.props.jam.id}
            active={true}
            hd={true}
            iframe={{
              allowFullScreen: true,
            }}
            autoplay={false}
          />
          <Card.Description>
            <Header as='h4'>Description:</Header>
            {this.props.jam.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          Recommended by: <Link to={`/viewprofile/${this.props.profile._id}`}>{this.props.jam.email}</Link>
          <Grid>
            <Grid.Column floated='left' width={5}>
              <Button fluid href={`/#/edit-jams/${this.props.jam._id}`} size='mini'>Edit</Button>
            </Grid.Column>
            <Grid.Column width={5}>
              <Button fluid onClick={() => this.submit(
                this.props.jam.title,
                this.props.jam.id,
                this.props.jam.description,
                this.props.jam.email,
                this.props.jam._id,
              )} color='green' size='mini' content='Feature'/>
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              <Button fluid color='red' size='mini'>Delete</Button>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
JamCardAdmin.propTypes = {
  profile: PropTypes.object.isRequired,
  jam: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(JamCardAdmin);
