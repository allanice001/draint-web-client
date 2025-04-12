import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import React from 'react';
import classNames from 'classnames';
import styles from './datepicker.module.scss';
import { touch } from 'redux-form';
import { useDispatch } from 'react-redux';

export default function Datepicker(props) {
  const {
    label,
    value,
    onChange,
    className,
    meta,
    flat,
    disabled,
    formName,
    input,
    required,
  } = props;

  const dispatch = useDispatch();
  const handleTouched = () => {
    if (formName && input?.name) {
      dispatch(touch(formName, [input.name]));
    }
  };

  const wrapper = classNames(styles.wrapper, className, {
    [styles.required]: required,
  });

  return (
    <div className={wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <span className={styles.control}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            format="dd/MM/yyyy"
            disableFuture
            value={value || input?.value}
            showTodayButton
            disabled={disabled}
            onChange={onChange || input?.onChange}
            onClick={handleTouched}
            classes={{
              root: styles.datepicker,
            }}
            InputProps={{
              classes: {
                root: `${styles.root} ${flat ? styles.flat : ''}`,
                underline: styles.underline,
              },
            }}
          />
        </MuiPickersUtilsProvider>
      </span>
      {meta?.touched && meta?.invalid && (
        <span className={styles?.error}>{meta?.error}</span>
      )}
    </div>
  );
}
