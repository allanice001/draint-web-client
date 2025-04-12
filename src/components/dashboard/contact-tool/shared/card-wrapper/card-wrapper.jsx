import React from 'react';
import cx from 'classnames';
import styles from './card-wrapper.module.scss';

export default function CardWrapper({ children, className = '', active, isSubscriber }) {
  return (
    <div
      className={cx(className, styles.root, {
        [styles.active]: active,
        [styles.subscriber]: isSubscriber,
      })}
    >
      {children}
    </div>
  );
}
