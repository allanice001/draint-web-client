/* eslint-disable react/prefer-stateless-function */
/** *
 *
 *   AUTH LAYOUT
 *   Layout for the signup/signin pages
 *
 ********* */

import // Row,
// HomeNav,
'components/lib';
import './auth.scss';
import '../layout.scss';

import React from 'react';

export class AuthLayout extends React.Component {
  render() {
    document.body.classList.add('color-bg');

    return (
      <main className="auth">
        {/* <Row> */}
        <this.props.children />
        {/* </Row> */}
      </main>
    );
  }
}
