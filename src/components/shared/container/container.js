import React from 'react';
import cx from 'classnames';

export const Container = props => {
  const { children, className } = props;

  return <div className={cx('container', className)}>{children}</div>;
};
