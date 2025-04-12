import { FormControl } from '@material-ui/core';
import MaterialUIPickers from 'components/pickers/dateForm';
import React from 'react';
import styles from './masterPeriodFilter.module.scss';

const MasterPeriodFilter = ({ disabled, dateFilter, onDateChange }) => {
  return (
    <div className={styles.wrapper}>
      <FormControl classes={{ root: styles.root }}>
        <span>From</span>
        <MaterialUIPickers
          dateOnly
          format="MM/yyyy"
          disabled={disabled}
          selectedDate={dateFilter.from}
          handleDateChange={val => onDateChange('from', val)}
          disableFuture
        />
      </FormControl>

      <FormControl classes={{ root: styles.root }}>
        <span>To</span>
        <MaterialUIPickers
          dateOnly
          format="MM/yyyy"
          disabled={disabled}
          selectedDate={dateFilter.to}
          handleDateChange={val => onDateChange('to', val)}
          disableFuture
        />
      </FormControl>
    </div>
  );
};

export default MasterPeriodFilter;
