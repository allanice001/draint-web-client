/***
 *
 *   STAT
 *   Statistic value with optional icon and -/+ change value.
 *
 *   PROPS
 *   label: string
 *   loading: true/false to toggle loading animation (optional)
 *   value:  numeric value
 *   icon: icon image to use (optional)
 *   change: positive/negative number indicating change amount (optional)
 *
 **********/

import './stat.scss';

import { Icon, Loader } from 'components/lib';

import React from 'react';

export class Stat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      change: this.props.change,
      changeDirection: null,
    };
  }

  getChangeDirection() {
    if (this.props.change) {
      if (this.props.change.toString().includes('-')) return 'down';
      else return 'up';
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="stat card">
          <Loader />
        </div>
      );
    }

    return (
      <div className="stat card">
        {this.props.icon && (
          <Icon color="dark" image={this.props.icon} size="20" />
        )}

        <div className="value">{this.props.value}</div>
        <div className="label">{this.props.label}</div>

        {this.props.change && (
          <div className={'change ' + this.getChangeDirection()}>
            {this.props.change}
          </div>
        )}
      </div>
    );
  }
}
