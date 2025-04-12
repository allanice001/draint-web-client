import './app.scss';

import ClassNames from 'classnames';
import { IconButton } from 'components/lib';
import { NavLink } from 'react-router-dom';
import React from 'react';

export class AppNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.type === 'fixed',
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const type = `mobile-${this.props.type}`;
    const cssClass = ClassNames({
      sidebar: true,
      open: this.state.open,
      mobileOpen: this.props.open,
      [type]: this.props.type,
    });
    return (
      <nav className={cssClass}>
        <IconButton
          image={this.state.open ? 'cross' : 'nav'}
          color="dark"
          className="btn-togglenav"
          action={this.toggle}
        />
        <section className="nav-links">
          {this.props.items &&
            this.props.items.map(item => {
              if (item.hasSubNav) {
                return (
                  <NavLink key={item.label} to={item.link}>
                    {item.label}
                  </NavLink>
                );
              }

              if (!item.permission) {
                return null;
              }

              return (
                <NavLink key={item.label} exact to={item.link}>
                  {item.label}
                </NavLink>
              );
            })}
        </section>
      </nav>
    );
  }
}
