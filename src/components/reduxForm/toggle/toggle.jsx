import React from 'react';
import classnames from 'classnames';
import styles from './toggle.module.scss';

export default function Toggle(props) {
  const {
    label, 
    value, 
    onChange, 
    className, 
    buttonClassName, 
    meta,
    disabled,
    input, 
    options,
  } = props;

  const classNames = classnames(styles.wrapper, className);
  const buttonClassNames = (active) => classnames(styles.button, buttonClassName, {
    [styles.active]: active,
  });

  function handleOnChange (value) {
    return onChange ? onChange(value) : input.onChange(value)
  }

  return (
    <div className={classNames}>
      {label && <label className={styles.label}>{label}</label>}

      <span className={styles.control}>
      <div className={styles.toggle}>
        {options.map(option => (
          <button
            type="button"
            value={option.value}
            onClick={() => handleOnChange(option.value)}
            className={buttonClassNames(option.value === value)}
            disabled={disabled}
          >
            {option.label}
          </button>
        ))}
        
      </div>
      </span>
      {meta?.touched && meta?.invalid && (
        <span className={styles.error}>{meta?.error}</span>
      )}
    </div>
  );
}
