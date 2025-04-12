/***
 *
 *   GRID
 *   Responsive one-to-six column grid layout.
 *
 *   PROPS
 *   cols: number of columns (default: 2)
 *
 **********/

import './grid.scss';

import React from 'react';

export class Grid extends React.Component {
  render() {
    let cssClass = 'grid';
    let cols = ['one', 'two', 'three', 'four', 'five', 'six'];

    if (this.props.cols) {
      for (let i = 0; i < parseInt(this.props.cols); i++)
        cssClass += ' ' + cols[i] + '-col';
    }

    return (
      <section className={cssClass}>
        {this.props.children && this.props.children.length > 1
          ? this.props.children.map((child, index) => {
              return child;
            })
          : this.props.children}
      </section>
    );
  }
}
