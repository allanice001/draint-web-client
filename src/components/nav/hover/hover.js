/***
 *
 *   HOVER NAV
 *   Reveals a nav when the user hovers over a hotspot.
 *   Items are rendered as children, revealed is achieved with CSS.
 *
 *   PROPS
 *   color: dark or light (default: dark)
 *   label: the hotspot text
 *   align: left or right
 *
 **********/

import './hover.scss';

import ClassNames from 'classnames';
import React from 'react';

export class HoverNav extends React.Component {
  render() {
    const cssClass = ClassNames({
      'hover-nav': true,
      dark: !this.props.color,
      'align-left': this.props.align === 'left',
      'align-right': this.props.align === 'right',
      'align-center': this.props.align === 'center',
      [this.props.color]: this.props.color,
    });

    return (
      <div className={cssClass}>
        <div className="hotspot">
          <span>{this.props.label}</span>
        </div>

        <nav className="dropdown">{this.props.children}</nav>
      </div>
    );
  }
}
