import 'date-fns';

import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from '@material-ui/pickers';
import { InputAdornment, TextField } from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import DateRangeIcon from '@material-ui/icons/DateRange';
import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import classNames from 'classnames';
import styles from './datForm.module.scss';

export default function MaterialUIPickers({
  disabled,
  selectedDate,
  handleDateChange,
  dateOnly = false,
  format = 'MM/dd/yyyy',
  disableFuture,
  disablePast,
}) {
  const buttonStyles = classNames(styles.button, {
    [styles.button_disabled]: disabled,
  });

  const inputStyles = classNames(styles.field_root, {
    [styles.field_root_disabled]: disabled,
  });

  function DateTextField(props) {
    return (
      <TextField
        {...props}
        classes={{
          root: inputStyles,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <button type={'button'} className={buttonStyles}>
                <DateRangeIcon />
              </button>
            </InputAdornment>
          ),
        }}
      />
    );
  }

  function TimeTextField(props) {
    return (
      <TextField
        {...props}
        classes={{
          root: inputStyles,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <button type={'button'} className={buttonStyles}>
                <ScheduleIcon />
              </button>
            </InputAdornment>
          ),
        }}
      />
    );
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={styles.control}>
        <DatePicker
          disableFuture={disableFuture}
          disablePast={disablePast}
          disabled={disabled}
          format={format}
          label="Choose date"
          value={selectedDate}
          minDate={'2015-09-10'}
          showTodayButton
          clearable
          onChange={handleDateChange}
          TextFieldComponent={DateTextField}
        />
        {!dateOnly && (
          <TimePicker
            disabled={disabled}
            label="Choose time"
            value={selectedDate}
            onChange={handleDateChange}
            clearable
            TextFieldComponent={TimeTextField}
          />
        )}
      </div>
    </MuiPickersUtilsProvider>
  );
}
