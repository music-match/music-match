import React from 'react';
import { Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class BrowseUsers extends React.Component {
  render() {
    return (
      <Header as="h2" textAlign="center">
        <p>Implement Code Here</p>
      </Header>
    );
  }
}

export default BrowseUsers;
