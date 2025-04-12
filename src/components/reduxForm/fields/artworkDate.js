import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import React from 'react';

// import './artworkTextfield.scss';

// import styles from './field.module.scss';

export default function artworkDate({ input, meta, disabled }) {
  const { value, onChange } = input;
  console.log(value);

  return (
    <div className="text-field-form-wrapper">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          id="date-picker-dialog"
          format="dd/MM/yyyy"
          disableFuture
          showTodayButton
          inputVariant="outlined"
          value={value || ''}
          disabled={disabled}
          error={meta.touched ? meta.error : ''}
          onChange={onChange}
          // autoFocus
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}
