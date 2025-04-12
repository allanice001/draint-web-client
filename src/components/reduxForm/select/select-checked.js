import Icons from '../../icons';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import classnames from 'classnames';
import styles from './select.module.scss';

export default function SelectCheckedField(props) {
  const {
    inline,
    label,
    className,
    selectClassName,
    param,
    input,
    list = [],
    small,
    meta,
    flat = false,
    disabled,
    shadow,
  } = props;

  let data = list;

  if (param) {
    data = list.map(el => ({
      value: el[param.value],
      label: el[param.label],
    }));
  }

  const classNames = classnames(styles.wrapper, className, {
    [styles.inline]: inline,
    [styles.small]: small,
    [styles.shadow]: shadow,
  });

  const selectClassess = classnames(styles.select, selectClassName, {
    [styles.flat]: flat,
  });

  return (
    <div className={classNames}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.control}>
        <Select
          style={{
            width: '100%',
          }}
          disableUnderline
          autoFocus={false}
          disabled={disabled}
          value={input.value || []}
          onChange={input.onChange}
          MenuProps={{
            disableScrollLock: true,
          }}
          classes={{
            select: selectClassess,
            icon: styles.icon,
          }}
          renderValue={() => input.value}
        >
          {data.map(el => (
            <MenuItem
              style={{ textTransform: 'capitalize' }}
              key={el.value}
              value={el.value}
              classes={{ selected: styles.selected }}
            >
              {input.value === el.value && <Icons.Check />} &nbsp; {el.value}
            </MenuItem>
          ))}
        </Select>

        <Icons.DropdownArrow className={styles.arrow} />
      </div>
      {meta.touched && meta.invalid && (
        <span className={styles.error}>{meta.error}</span>
      )}
    </div>
  );
}
