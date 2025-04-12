import React from 'react';
import cx from 'classnames';
import styles from './button-primary.module.scss';

export const ButtonType = {
  Submit: 'submit',
  Default: 'button',
};

export default function ButtonPrimary(props) {
  const {
    type = ButtonType.Default,
    sm,
    icon,
    children,
    className,
    onClick,
  } = props;

  return (
    <button
      className={cx(styles.root, className, {
        [styles.sm]: sm,
      })}
      type={type}
      onClick={onClick}
    >
      {Boolean(children) && <span>{children}</span>}

      {Boolean(icon) && <span className={cx(styles.icon)}>{icon}</span>}
    </button>
  );
}
