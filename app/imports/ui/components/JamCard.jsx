import React from 'react';
import { Card, Embed, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class JamCard extends React.Component {
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
          Recommended by: <Link to="/viewprofile">{this.props.jam.email}</Link>
        </Card.Content>
        <Card.Content extra>
          <Link to="/edit-jams">Edit Jam</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
JamCard.propTypes = {
  jam: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(JamCard);
