import { NavLink } from 'react-router-dom';
import React from 'react';

export function Link(props) {
  const {
    url,
    title = '',
    className = '',
    text = '',
    activeClassName = 'active',
    children,
    onClick,
  } = props;

  return (
    <NavLink
      exact
      to={url}
      className={`link ${className}`}
      title={title}
      activeClassName={activeClassName}
      onClick={onClick}
    >
      {children || text}
    </NavLink>
  );
}
