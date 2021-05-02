import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Image } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <div className='music-background' id="signout-page">
        <Header inverted as="h1" textAlign="center" style={{ paddingTop: '50px' }}>Signed Out!</Header>
        <Header inverted as="h3" textAlign="center">We hope you enjoyed connecting with other musicians and sharing jams!</Header>
        <Image style={{ paddingTop: '100px', paddingBottom: '100px' }} centered size='medium' src='https://c.tenor.com/HJvqN2i4Zs4AAAAj/milk-and-mocha-cute.gif'/>
      </div>
    );
  }
}
