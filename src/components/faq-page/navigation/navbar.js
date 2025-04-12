import ArrowIcon from 'components/icons/arrow';
import { NavLink } from 'react-router-dom';
import React from 'react';
import cx from 'classnames';
import { useStyles } from './navbarStyles';

export const Navbar = props => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={cx('container', classes.content)}>
        {props.isMobile ? (
          <>
            {!props.masterView ? (
              <NavLink to="/faq" onClick={props.onFaqClick}>
                <span className={classes.text}>FAQ</span>
              </NavLink>
            ) : (
              <div onClick={props.onFaqClick}>
                <span className={classes.text}>FAQ</span>
              </div>
            )}
          </>
        ) : (
          <span className={classes.text}>FAQ</span>
        )}
        {props.category ? (
          <>
            <ArrowIcon className={classes.icon} />
            <span
              className={cx(classes.text, {
                [classes.disabled]: !props.title,
              })}
              onClick={props.onCategoryClick}
            >
              {props.category}
            </span>
          </>
        ) : null}
        {props.title ? (
          <>
            <ArrowIcon className={classes.icon} />
            <span className={classes.topic}>{props.title}</span>
          </>
        ) : null}
      </div>
    </div>
  );
};
