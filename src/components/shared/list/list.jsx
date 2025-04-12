import { arrayOf, bool, instanceOf, oneOfType, string } from 'prop-types';

import React from 'react';
import Record from './record';
import cx from 'classnames';
import styles from './list.module.scss';

export const Space = {
  Between: 'between',
  Around: 'around',
};

function List(props) {
  const { children, horizontal, space, className, ...restProps } = props;

  return (
    <ul
      className={cx(styles.root, className, {
        [styles.horizontal]: horizontal,
        [styles['space-between']]: space === Space.Between,
        [styles['space-around']]: space === Space.Around,
      })}
      {...restProps}
    >
      {children}
    </ul>
  );
}

List.propTypes = {
  children: oneOfType([arrayOf(Record), instanceOf(Record).isRequired]),
  horizontal: bool,
  space: string,
};

export default List;
