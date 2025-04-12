/***
 *
 *   ACTIONS
 *   a list of action buttons for the table row
 *
 **********/

import './actions.scss';

import React from 'react';

export class Actions extends React.Component {
  render() {
    return this.props.children;
  }
}
