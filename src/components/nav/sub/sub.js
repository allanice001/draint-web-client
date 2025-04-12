/***
 *
 *   SUB NAV
 *   Sub navigation element (located underneath the header).
 *
 **********/

import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './sub.module.scss';

export class SubNav extends React.Component {
  render() {
    return (
      <nav className={styles.subnav}>
        {this.props.items &&
          this.props.items.map(item => {
            return (
              <NavLink
                key={item.label}
                to={item.url}
                activeClassName={styles.active}
              >
                {item.label}
              </NavLink>
            );
          })}
      </nav>
    );
  }
}
