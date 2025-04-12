import {
  AUTOCOMPLETE,
  CENT,
  DECIMAL_SCALE,
  DECIMAL_SEPARATOR,
  MAX_LENGTH,
  PLACEHOLDER,
} from 'constants/inputs/number-input';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import React from 'react';
import { change } from 'redux-form';
import cx from 'classnames';
import { getFormValues } from 'redux-form';
import styles from './number-input.module.scss';

function NumberInput({
  input,
  label,
  required,
  className,
  classNameWrapper,
  classNameEndPoint,
  classNameError,
  setTotal,
  meta,
  endpoint,
  flat,
  formName,
  handleOnBlur,
}) {
  const dispatch = useDispatch();
  const state = useSelector(store => store);
  const values = getFormValues(formName)(state);

  function rightToLeftFormatter(value) {
    if (!Number(value)) {
      return '';
    }

    let amount = '';

    if (amount.length > DECIMAL_SCALE) {
      amount = parseInt(value).toFixed(DECIMAL_SCALE);
    } else {
      amount = (parseInt(value) / CENT).toFixed(DECIMAL_SCALE);
    }

    return amount;
  }

  function setValue(value) {
    setTotal && setTotal(rightToLeftFormatter(value));

    dispatch(change(formName, input.name, rightToLeftFormatter(value)));
  }

  function getFormattedValue(value) {
    let amount;

    if (!Number(value[input.name])) {
      amount = null;
    } else {
      amount = Number(value[input.name]).toFixed(DECIMAL_SCALE);
    }

    return amount;
  }

  return (
    <div
      className={cx(styles.wrapper, classNameWrapper, {
        [styles.required]: required,
      })}
    >
      <label
        className={cx(styles.label, {
          [styles.none]: !!!label,
        })}
      >
        {label}
      </label>
      <div className={styles.input_wrapper}>
        <NumberFormat
          autoComplete={AUTOCOMPLETE}
          className={cx(styles.input, className, {
            [styles.flat]: flat,
          })}
          placeholder={PLACEHOLDER}
          decimalSeparator={DECIMAL_SEPARATOR}
          decimalScale={DECIMAL_SCALE}
          maxLength={MAX_LENGTH}
          format={rightToLeftFormatter}
          name={input.name}
          value={getFormattedValue(values)}
          onValueChange={e => setValue(e.value)}
          onBlur={handleOnBlur}
        />
        {endpoint && (
          <span className={cx(styles.endpoint, classNameEndPoint)}>
            {endpoint}
          </span>
        )}
      </div>

      {(meta?.touched || meta?.dirty) && meta?.invalid && (
        <span
          className={cx(styles.error, classNameError, {
            [styles.flat]: flat,
          })}
        >
          {meta?.error}
        </span>
      )}
    </div>
  );
}

export default NumberInput;
