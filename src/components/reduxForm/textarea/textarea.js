import React from 'react';
import classnames from 'classnames';
import styles from './textarea.module.scss';

export default function Textarea({
  name,
  maxLength,
  onChange,
  onBlur,
  onFocus,
  className,
  placeholder,
  value,
  label,
  input = {},
  split,
  meta = {},
  box,
  rows,
  disabled,
  required,
  helperText,
}) {
  const classNames = classnames(styles.wrapper, className, {
    [styles.required]: required,
  });

  const textareaClasses = classnames(styles.textarea, {
    [styles.split]: split,
    [styles.box]: box,
  });

  if (value?.length > maxLength) value = value.slice(0, maxLength);

  const currentValue = value || input.value || '';

  return (
    <div className={classNames}>
      {label && <label className={styles.label}>{label}</label>}

      <span className={styles.control}>
        <textarea
          disabled={disabled}
          rows={rows || 4}
          autoComplete="off"
          name={name || input.name}
          className={textareaClasses}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={onChange || input.onChange}
          onBlur={onBlur || input.onBlur}
          onFocus={onFocus || input.onFocus}
          value={currentValue}
        />
        {maxLength && (
          <small className={styles.count}>
            {currentValue.length} / {maxLength}
          </small>
        )}
      </span>

      {helperText && <span className={styles.error}>{helperText}</span>}

      {meta.touched && meta.invalid && (
        <span className={styles.error}>{meta.error}</span>
      )}
    </div>
  );
}
