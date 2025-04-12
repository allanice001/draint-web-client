/***
 *
 *   PROGRESS BAR
 *   Percentage based progress bar with animated fill.
 *
 *   PROPS
 *   label: text label (optional)
 *   progress: percentage value: eg. 75%
 *
 **********/

import './bar.scss';

import React from 'react';

export class ProgressBar extends React.Component {
  render() {
    return (
      <section className="progress">
        {this.props.label && <div className="label">{this.props.label}</div>}

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: this.props.progress }}
          ></div>
        </div>
      </section>
    );
  }
}
