/***
 *
 *   BlANKSLATE MESSAGE
 *   Message with a call to action – use when no data to display.
 *
 *   PROPS
 *   title: descriptive string (optional)
 *   text: string containing custom text (optional)
 *   action: callback function executed on button click (optional)
 *   buttonText: cta button text
 *
 **********/

import './blankslate.scss';

import { Button } from 'components/lib';
import React from 'react';

export class BlankSlateMessage extends React.Component {
  render() {
    return (
      <div className="blankslate-message">
        {this.props.title && <h2>{this.props.title}</h2>}

        {this.props.text && <p>{this.props.text}</p>}

        {this.props.action && (
          <Button text={this.props.buttonText} action={this.props.action} />
        )}
      </div>
    );
  }
}
