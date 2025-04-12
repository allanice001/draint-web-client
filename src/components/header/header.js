/***
 *
 *   HEADER
 *   Header section with title used in main application (can render children)
 *
 *   PROPS
 *   title: title of the view
 *
 **********/

import './header.scss';

import React from 'react';

export class Header extends React.Component {
  render() {
    return (
      <header>
        {this.props.title && <h1>{this.props.title}</h1>}

        {this.props.children}
      </header>
    );
  }
}
