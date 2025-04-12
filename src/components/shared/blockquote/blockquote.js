import React from 'react';
import classNames from 'classnames';
import cx from 'classnames';
import styles from './blockquote.module.scss';

export const Blockquote = props => {
  const { isEdit, formField, children, className, content } = props;

  const blockquote = classNames(styles.blockquote, {
    [styles.blockquote_disabled]: !isEdit && content === '',
  });

  return (
    <div className={cx(className, blockquote)}>
      {isEdit ? formField : <blockquote>{children}</blockquote>}
    </div>
  );
};
