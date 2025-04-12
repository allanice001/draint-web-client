import React from 'react';
import classNames from 'classnames';
import styles from './buttons.module.scss';

function ModalButton({ name, setIsOpen, disabled }) {
  const button = classNames(styles.request_btn, {
    [styles.disabled]: disabled,
  });

  function handleOnClick() {
    if (setIsOpen) {
      return setIsOpen(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        className={button}
        disabled={disabled}
        onClick={() => handleOnClick()}
      >
        {name}
      </button>
    </div>
  );
}

export default ModalButton;
