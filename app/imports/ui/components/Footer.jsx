import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const footerStyle = { backgroundColor: 'black', color: 'white' };
    const divStyle = { paddingTop: '15px' };
    return (
      <footer style={footerStyle}>
        <div style={divStyle} className="ui center aligned container">
          <hr />
              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
          <a href="http://ics-software-engineering.github.io/meteor-application-template-react">Template Home Page</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
