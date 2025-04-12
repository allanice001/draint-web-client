import Icons from 'components/icons';
import React from 'react';
import cx from 'classnames';
import styles from './tag.module.scss';

export const Tag = ({ className, edit, onDelete, children, ...rest }) => {
  if (!children) {
    return null;
  }

  return (
    <span className={cx(styles.root, className)} {...rest}>
      <span className={styles.content}>{children}</span>
      {edit && (
        <span className={styles.deleteBtn} onClick={onDelete}>
          <Icons.Delete />
        </span>
      )}
    </span>
  );
};
