/***
 *
 *   PROGRESS STEPS
 *   Steps are used to indicate the current point in a multiple-stage
 *   process, such as filling in a long form
 *
 *   PROPS
 *   items: array of objects containing keys: name, url and completed (bool)
 *
 **********/

import './steps.scss';

import { Link } from 'components/lib';
import React from 'react';

export class ProgressSteps extends React.Component {
  render() {
    return (
      <ol className="progress-steps">
        {this.props.items &&
          Object.keys(this.props.items).map(item => {
            item = this.props.items[item];

            return (
              <li
                key={item.name}
                className={item.completed ? 'completed' : 'incomplete'}
              >
                <Link url={item.url} text={item.name} />
              </li>
            );
          })}
      </ol>
    );
  }
}
