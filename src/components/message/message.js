/***
 *
 *   MESSAGE
 *   Colored feedback message with optional call to action.
 *
 *   PROPS
 *   type - info/success/warning/error
 *   title - descriptive string
 *   text - string
 *   closable - true/false to determine if the user can close the message
 *   buttonText - text for the cta button (optional)
 *   buttonLink - url link for the button (optional)
 *
 **********/

import './message.scss';

import { Button, Icon, IconButton } from 'components/lib';

import ClassNames from 'classnames';
import History from 'routers/history';
import React from 'react';

export class Message extends React.Component {
  constructor() {
    super();

    this.icons = {
      info: 'info',
      success: 'check',
      warning: 'alert-triangle',
      error: 'alert-octagon',
    };

    this.colors = {
      info: '#73B0F4',
      success: '#8CC57D',
      warning: '#F0AA61',
      error: '#d95565',
    };

    this.state = {
      closed: false,
    };

    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ closed: true });
  }

  render() {
    if (this.state.closed) return false;

    let color = '#FFF';
    let icon = 'info';
    let type = this.props.type ? this.props.type : 'info';

    let cssClass = ClassNames({
      message: true,
      [type]: true,
    });

    if (this.props.type) {
      icon = this.icons[this.props.type];
      color = this.colors[this.props.type];
    }

    return (
      <div className={cssClass}>
        <Icon color={color} image={icon} />

        {this.props.closable && (
          <IconButton
            image="x"
            size="20"
            className="btn-close"
            action={this.close}
          />
        )}

        <section className="content">
          <h1>{this.props.title}</h1>
          <p>{this.props.text}</p>

          {this.props.buttonLink && (
            <Button
              text={this.props.buttonText}
              action={event => History.push(this.props.buttonLink)}
            />
          )}
        </section>
      </div>
    );
  }
}
