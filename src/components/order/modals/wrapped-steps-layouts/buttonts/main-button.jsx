import PropTypes, { string } from 'prop-types';

import React from 'react';
import classNames from 'classnames';
import styles from '../../wrapped-steps.module.scss';

function WrappedMainButton({
  buttonName,
  isExpanded,
  onClick,
  disabled,
  children,
}) {
  const expandedButton = classNames(`${styles.button}`, {
    [`${styles.button__expanded}`]: isExpanded,
  });

  return (
    <button
      type="button"
      className={expandedButton}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonName}
      {children}
    </button>
  );
}

WrappedMainButton.defaultProptypes = {
  buttonName: 'Wrapped Button',
  isExpanded: false,
  disabled: true,
};

WrappedMainButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
  children: PropTypes.node,
  buttonStyle: string,
  isExpanded: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export { WrappedMainButton };
