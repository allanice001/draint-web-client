import React, { useRef } from 'react';
import toggleButtonStyles from './toggle-button.module.scss';
import { useCollectorTheme } from 'hooks/use-theme';

export const ToggleButton = ({ toggle, opened, className = '' }) => {
  const burgerButtonRef = useRef();
  useCollectorTheme(burgerButtonRef);

  const classes = opened
    ? `${toggleButtonStyles.humberger} ${toggleButtonStyles.opened}`
    : toggleButtonStyles.humberger;

  return (
    <button
      ref={burgerButtonRef}
      type="button"
      className={`${toggleButtonStyles.button} ${className}`}
      onClick={toggle}
    >
      <span className={classes} />
    </button>
  );
};
