/** *
 *
 *   BADGE
 *   Inline text badge with background color.
 *
 *   PROPS
 *   text: string to be displayed
 *   color: blue/red/green/orange (default: purple)
 *
 ********* */

import './badge.scss';

import ClassNames from 'classnames';
import React from 'react';

export function Badge(props) {
  const cssClass = ClassNames({
    badge: true,
    [props.color]: props.color,
  });

  return <span className={cssClass}>{props.text}</span>;
}
