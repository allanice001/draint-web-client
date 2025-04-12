import React from 'react';
import cx from 'classnames';
import styles from './button-secondary.module.scss';

export const ButtonType = {
  Submit: 'submit',
  Default: 'button',
};

export default function ButtonSecondary(props) {
  const {
    type = ButtonType.Default,
    sm,
    icon,
    active,
    children,
    className,
    onClick,
    disabled,
  } = props;

  return (
    <button
      className={cx(styles.root, className, {
        [styles.sm]: sm,
        [styles.active]: active,
      })}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {Boolean(icon) && <span className={cx(styles.icon)}>{icon}</span>}

      {Boolean(children) && <span>{children}</span>}
    </button>
  );
}
