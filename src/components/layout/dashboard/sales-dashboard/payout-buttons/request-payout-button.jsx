import React from 'react'
import classNames from 'classnames';
import styles from './buttons.module.scss';

function RequestPayoutButton({ name, setIsOpen, senPayoutRequest, disabled }) {
  const button = classNames(styles.request_btn, {
    [styles.disabled]: disabled,
  });

  function handleOnClick() {
    if (setIsOpen) {
      return setIsOpen(true);
    }

    return senPayoutRequest();
  }

  return (
    <div>
      <button
        type="button"
        className={button}
        disabled={disabled}
        onClick={() => handleOnClick()}
      >
        { name }
      </button>
    </div>
  )
}

export default RequestPayoutButton;
