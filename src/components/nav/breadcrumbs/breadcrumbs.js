/***
 *
 *   BREADCRUMBS
 *   Bavigation trail for nested pages.
 *
 *   PROPS
 *   items: array of objects containing keys: name and url
 *
 **********/

import './breadcrumbs.scss';

import { Link } from 'components/lib';
import React from 'react';

export class Breadcrumbs extends React.Component {
  render() {
    return (
      <nav className="breadcrumb">
        {this.props.items &&
          this.props.items.map(item => {
            return <Link key={item.name} url={item.url} text={item.name} />;
          })}
      </nav>
    );
  }
}
