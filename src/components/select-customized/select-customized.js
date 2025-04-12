import { DEVICE_REGEX, PLATFORM_REGEX } from 'constants/index';
import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { FIELD_TYPE } from 'constants/components/homepage';
import FormControl from '@material-ui/core/FormControl';
import Icons from 'components/icons';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import classnames from 'classnames';
import cx from 'classnames';
import styles from './select-customized.module.scss';

const customStyleBodyWithoutScroll = () => {
  if (DEVICE_REGEX.test(navigator.userAgent)) {
    document.body.style.overflow = `hidden`;
    return;
  }
  const scrollbarWidth = window.innerWidth - document.body.clientWidth;
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.style.overflow = `hidden`;
};

const resetCustomStyleBodyWithScroll = () => {
  if (DEVICE_REGEX.test(navigator.userAgent)) {
    document.body.style.overflow = `visible`;
    return;
  }
  document.body.style.paddingRight = `0px`;
  document.body.style.overflow = `visible`;
};

const BootstrapInput = withStyles(theme => ({
  input: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 18,
    width: 120,
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: 'mulish',
    '&:focus': {
      backgroundColor: 'white',
      borderRadius: 18,
      borderColor: '#ced4da',
    },
  },
}))(InputBase);

const BootstrapInputSquare = withStyles(theme => ({
  input: {
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 3,
    width: '100%',
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid #E7E7E7',
    padding: '10px 26px 10px 12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.06)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: 'mulish',
    color: '#3F4041',
    '&:focus': {
      backgroundColor: 'white',
      borderRadius: 3,
      border: '2px solid #806BFF',
    },
  },
}))(InputBase);

const BootstrapInputWithoutBorder = withStyles(theme => ({
  input: {
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    backgroundColor: 'white',
    padding: '10px 26px 10px 12px',
    fontFamily: 'mulish',
    color: '#3F4041',
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  select: {
    marginTop: '56px',
    '& li': {
      color: '#3F4041',
      fontSize: '16px',
      '& span': {
        width: '50px',
      },
    },
    '& li:hover': {
      color: 'white',
      backgroundColor: '#806BFF',
    },
  },
}));

const getInputComponent = type => {
  switch (type) {
    case FIELD_TYPE.SQUARE:
      return <BootstrapInputSquare />;
    case FIELD_TYPE.NO_BORDER:
      return <BootstrapInputWithoutBorder />;
    default:
      return <BootstrapInput />;
  }
};

export default function SelectCustomized({
  filter,
  centerLabel,
  type,
  setFilter,
  options,
  label,
  valueToSet,
}) {
  const classes = useStyles();
  const [value, setValue] = useState(valueToSet);
  const platform = navigator?.platform;
  const isTransaction = PLATFORM_REGEX.test(platform) ? 0 : 'auto';

  const handleChange = e => {
    const { value } = e.target;
    setValue(value);
    return !!filter ? setFilter({ key: filter, value }) : setFilter(value);
  };

  const classNames = classnames(styles.wrapper, {
    [styles.wrapper_square]: type === FIELD_TYPE.SQUARE || FIELD_TYPE.NO_BORDER,
  });

  const classNamesForm = cx(classes, {
    [styles.wrapper_square__formControl]: type === FIELD_TYPE.SQUARE,
    [styles.wrapper_square__formNoborderControl]: type === FIELD_TYPE.NO_BORDER,
  });

  const classLabel = cx(styles.label, {
    [styles.label__center]: centerLabel,
  });

  return (
    <FormControl className={classNamesForm}>
      <div className={classNames} id="select-label">
        <span id="select-label" className={classLabel}>
          {label}
        </span>
        <Select
          MenuProps={{
            classes: { paper: classes.select },
            disableScrollLock: true,
            transitionDuration: isTransaction,
          }}
          IconComponent={
            type === FIELD_TYPE.SQUARE
              ? Icons.ArrowFilledDownViolet
              : Icons.ArrowDown
          }
          inputProps={{
            classes: {
              icon: styles.right_icon,
            },
          }}
          labelId="select-label"
          id="select"
          value={value}
          onChange={handleChange}
          input={getInputComponent(type)}
          onOpen={customStyleBodyWithoutScroll}
          onClose={resetCustomStyleBodyWithScroll}
        >
          {options.map(option => {
            return (
              <MenuItem key={option.key} value={option.key}>
                {option.icon && (
                  <span className={styles.left_icon}>
                    <option.icon />
                  </span>
                )}
                {option.value}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </FormControl>
  );
}
