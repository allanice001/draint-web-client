/** *
 *
 *   FEATURES
 *   Feature list for use on home/landing pages.
 *
 *   PROPS
 *   color: dark/light
 *   items: array of objects containing keys: name & icon
 *
 ********* */

import './features.scss';

import { Icon } from 'components/lib';
import React from 'react';

export function FeatureList(props) {
  return (
    <ul className="feature-list">
      {props.items &&
        props.items.map(feature => (
          <li key={feature.name}>
            <Icon image={feature.icon} color={props.color} />
            {feature.name}
          </li>
        ))}
    </ul>
  );
}
