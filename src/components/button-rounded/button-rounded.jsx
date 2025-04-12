import React from 'react';
import styles from './button-rounded.module.scss';
export const ButtonRounded = ({ disabled, text, icon, onClick, classname }) => {
  return (
    <button
      disabled={disabled}
      type="button"
      className={`${styles.btn_rounded} ${disabled &&
        styles.btn_rounded__disabled} ${classname &&
        styles[`btn_rounded__${classname}`]} `}
      onClick={onClick}
    >
      {!!icon && (
        <span
          className={`${styles.btn_rounded__icon} ${
            styles[`btn_rounded__icon__${classname}`]
          }`}
        >
          {icon}
        </span>
      )}
      {text}
    </button>
  );
};
