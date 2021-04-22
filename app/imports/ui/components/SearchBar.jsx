import React from 'react';
import { Input } from 'semantic-ui-react';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SearchBar extends React.Component {
  render() {
    return (
      <Input fluid
        placeholder='Search User...'
      />
    );
  }
}

// Wrap this component in withRouter since we use the <Link> React Router element.
export default SearchBar;
