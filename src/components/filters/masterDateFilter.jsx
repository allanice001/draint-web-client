import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

import MaterialUIPickers from '../../components/pickers/dateForm';
import React from 'react';
import styles from './masterDateFilter.module.scss';

const MasterDateFilter = ({
  loading,
  dateSelected,
  onDateSelected,
  from,
  to,
  changeFrom,
  changeTo,
  dateOnly,
}) => {
  const disabled = loading || !dateSelected;
  const labelStyle = `${styles.label} ${disabled ? styles.disabled : ''}`;

  return (
    <Card>
      <CardContent className={styles.wrapper}>
        <div className={styles.date_block}>
          <FormControlLabel
            control={
              <Checkbox
                disabled={loading}
                checked={dateSelected}
                color="primary"
                onChange={() => onDateSelected(!dateSelected)}
              />
            }
            label="Set date"
          />
        </div>
        <div className={styles.controls}>
          <div className={styles.date_block}>
            <div className={labelStyle}>From</div>
            <MaterialUIPickers
              dateOnly={dateOnly}
              disabled={disabled}
              selectedDate={from}
              handleDateChange={changeFrom}
              disableFuture
              controlClassName="1"
            />
          </div>

          <div className={styles.date_block}>
            <div className={labelStyle}>To</div>
            <MaterialUIPickers
              dateOnly={dateOnly}
              disabled={disabled}
              selectedDate={to}
              handleDateChange={changeTo}
              disableFuture
              controlClassName="1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MasterDateFilter;
