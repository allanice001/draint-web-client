/***
 *
 *   STEPS
 *   Display ordered step instructions on a landing page.
 *
 *   PROPS
 *   items: array of strings
 *
 **********/

import './steps.scss';

import React from 'react';

export class Steps extends React.Component {
  render() {
    return (
      <ul className="steps">
        {this.props.items &&
          this.props.items.map((step, index) => {
            return (
              <li className="step" key={'step-' + index}>
                <div className="number">{index + 1}</div>
                <div>{step}</div>
              </li>
            );
          })}
      </ul>
    );
  }
}
