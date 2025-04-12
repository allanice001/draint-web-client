import React from 'react';
import classnames from 'classnames';
import styles from './radio.module.scss';

function Radio(props) {
  const {
    label,
    className,
    input,
    meta,
    required,
    list = [],
    name,
    onChange,
    value,
  } = props;

  const classNames = classnames(styles.wrapper, className, {
    [styles.required]: required,
  });

  return (
    <div className={classNames}>
      <div className={styles.wrapper}>
        {list.map((el, i) => (
          <label key={i} className={styles.label}>
            <input
              className={styles.input}
              type="radio"
              name={input?.name || name}
              value={el.value}
              onChange={input?.onChange || onChange}
              checked={el.value === input?.value || el.value === value}
              disabled={el.disabled}
            />
            <span className={styles.radio} />
            {el.label}
          </label>
        ))}
      </div>

      {meta?.touched && meta?.invalid && (
        <span className={styles.error}>{meta.error}</span>
      )}
    </div>
  );
}

// const Nbsp = () => <>&nbsp;</>;

export default Radio;
