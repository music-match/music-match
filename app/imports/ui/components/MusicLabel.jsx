import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MusicLabel extends React.Component {
  render() {
    return (
      <Label color='orange'>
        {this.props.music_interest.type}
      </Label>
    );
  }
}

// Require a document to be passed to this component.
MusicLabel.propTypes = {
  music_interest: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MusicLabel);
