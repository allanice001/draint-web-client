import React from 'react';
import classnames from 'classnames';
import styles from './radio-button.module.scss';

function RadioButton({ className, input, meta, required, list = [], name }) {
  const classNames = classnames(styles.wrapper, className, {
    [styles.required]: required,
  });

  const onChangeValue = event => {
    input?.onChange(event.target.value);
  };

  return (
    <div className={classNames}>
      <div className={styles.wrapper} onChange={onChangeValue}>
        <label className={styles.label}>
          <input
            className={styles.input}
            checked={!input.value}
            name={input?.name || name}
            type="radio"
            value={''}
          />
          <span className={styles.radio} />
          {'All'}
        </label>
        {list.map((el, i) => (
          <label key={i} className={styles.label}>
            <input
              className={styles.input}
              checked={`${input?.name}-${el.id}` === input.value}
              name={input?.name || name}
              type="radio"
              value={`${input?.name}-${el.id}`}
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

export default RadioButton;
