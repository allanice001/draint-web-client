/***
 *
 *   CHECKLIST
 *   Ltems with X or ✓
 *
 *   PROPS
 *   items: array of objects containing keys: name (string) and checked (bool)
 *
 **********/

import './checklist.scss';

import React from 'react';

export class CheckList extends React.Component {
  render() {
    if (!this.props.items) return <div>No items in list</div>;

    return (
      <ul className="list checklist">
        {this.props.items.map((item, index) => {
          return (
            <li className={item.checked ? 'checked' : 'cross'} key={index}>
              <div className={item.name ? '' : 'empty-field'}>{item.name}</div>
            </li>
          );
        })}
      </ul>
    );
  }
}
