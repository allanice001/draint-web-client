import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React, { useState } from 'react';
import { shouldDisableDate } from 'services/pickup-service';
import DateFnsUtils from '@date-io/date-fns';
import Index from 'components/icons/index';
import styles from './calendar.module.scss';
import cx from 'classnames';

function Calendar({
  value,
  minDate,
  maxDate,
  onChange,
  label,
  buttonClass,
  required,
  input,
  meta,
  disabled,
  shouldDisableDateManual,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className={styles.calendar_wrapper}>
        <span
          className={cx(styles.label, {
            [styles.required]: required,
          })}
        >
          {label}
        </span>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            classes={{
              root: cx(styles.calendar_root, {
                [styles._disabled]: disabled,
              }),
            }}
            InputProps={{
              classes: {
                underline: styles.calendar_underline,
              },
            }}
            disablePast
            format="dd MMMM yyyy"
            shouldDisableDate={
              shouldDisableDateManual
                ? shouldDisableDateManual
                : shouldDisableDate
            }
            value={value || input?.value}
            minDate={minDate}
            maxDate={maxDate}
            onOpen={() => handleOpen()}
            onClose={() => handleOpen()}
            open={isOpen}
            onChange={onChange || input?.onChange}
            disabled={true}
            invalidDateMessage=""
            minDateMessage=""
          />
        </MuiPickersUtilsProvider>
        <div className={styles.button_wrapper}>
          <button
            className={cx(styles.calendar_button, buttonClass)}
            type="button"
            onClick={handleOpen}
            disabled={disabled}
          >
            <Index.WrappedCalendarIcon />
          </button>
        </div>
        {meta?.invalid && <span className={styles.error}>{meta?.error}</span>}
      </div>
    </>
  );
}

export default Calendar;
