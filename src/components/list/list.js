/***
 *
 *   LIST
 *   Ordered or unordered list.
 *
 *   PROPS
 *   ordered: true/false
 *   items: array of string values
 *
 **********/

import './list.scss';

import React from 'react';

export class List extends React.Component {
  render() {
    if (this.props.ordered) {
      return (
        <ol className="list">
          {this.props.items
            ? this.props.items.map((item, index) => {
                return <li key={item}>{item}</li>;
              })
            : 'No items in list'}
        </ol>
      );
    }

    return (
      <ul className="list">
        {this.props.items
          ? this.props.items.map((item, index) => {
              return <li key={item}>{item}</li>;
            })
          : 'No items in list'}
      </ul>
    );
  }
}
