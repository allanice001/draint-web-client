import React from 'react';
import cx from 'classnames';
import styles from './button.module.scss';

export const Type = {
  Submit: 'submit',
  Default: 'button',
};

export const IconPlacement = {
  Left: 'left',
  Right: 'right',
};

export default function Button(props) {
  const {
    type = Type.Default,
    sm,
    xs,
    icon,
    iconPlacement,
    children,
    className,
    onClick,
    primary,
    secondary,
    link,
    error,
    success,
    warning,
    form,
    disabled,
    fill,
  } = props;

  return (
    <button
      className={cx(styles.root, className, {
        [styles.sm]: sm,
        [styles.xs]: xs,
        [styles.primary]: primary,
        [styles.secondary]: secondary,
        [styles.link]: link,
        [styles.danger]: error,
        [styles.success]: success,
        [styles.warning]: warning,
        [styles.fill]: fill,
      })}
      type={type}
      disabled={disabled}
      onClick={onClick}
      form={form}
    >
      {Boolean(icon) && iconPlacement === IconPlacement.Left && (
        <span className={cx(styles.icon)}>{icon}</span>
      )}

      {Boolean(children) && <span>{children}</span>}

      {Boolean(icon) && iconPlacement === IconPlacement.Right && (
        <span className={cx(styles.icon)}>{icon}</span>
      )}
    </button>
  );
}

export const Primary = props => (
  <Button primary iconPlacement={IconPlacement.Right} {...props} />
);
export const Secondary = props => (
  <Button secondary iconPlacement={IconPlacement.Left} {...props} />
);
export const Link = props => (
  <Button link iconPlacement={IconPlacement.Left} {...props} />
);
export const Danger = props => (
  <Button error iconPlacement={IconPlacement.Left} {...props} />
);
export const Success = props => (
  <Button success iconPlacement={IconPlacement.Left} {...props} />
);
export const Warning = props => (
  <Button warning iconPlacement={IconPlacement.Left} {...props} />
);
