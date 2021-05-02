import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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

export default MusicLabel;
