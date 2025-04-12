import Icons from '../../icons';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import classnames from 'classnames';
import styles from './select.module.scss';

export default function SelectField({
  inline,
  label,
  className,
  selectClassName,
  labelClassName,
  param,
  subscription,
  input,
  list = [],
  small,
  meta,
  flat = false,
  multi = false,
  disabled,
  countries = false,
  countriesCodes = false,
  yearCompleted = false,
  shadow,
  userCountry,
  placeholder = false,
  setOpenCountryFilter = () => {},
  isOpen = false,
  matchesMd = false,
  arrowStyles = '',
  required = false,
}) {
  let data = list;

  if (param) {
    data = list.map(el => ({
      value: el[param.value],
      label: el[param.label],
    }));
  }

  const classNames = classnames(styles.wrapper, className, {
    [styles.required]: required,
    [styles.inline]: inline,
    [styles.small]: small,
    [styles.shadow]: shadow,
  });

  const selectClasses = classnames(
    subscription ? styles.select_modal_pricing : styles.select,
    selectClassName,
    {
      [styles.default]: input.value === '',
      [styles.flat]: flat,
      [styles.userSelected]: userCountry,
    }
  );

  const multipleSelectClasses = classnames(
    subscription ? styles.select_modal_pricing : styles.select,
    styles.multi,
    selectClassName,
    {
      [styles.flat]: flat,
      [styles.userSelected]: userCountry,
    }
  );

  const labelClasses = classnames(styles.label, labelClassName);

  return (
    <div className={classNames}>
      {label && <label className={labelClasses}>{label}</label>}

      <div className={styles.control}>
        {!multi && (
          <select
            className={selectClasses}
            name={input.name}
            onChange={input.onChange}
            onBlur={input.onBlur}
            value={input.value}
            disabled={disabled}
            onMouseDown={e => {
              if (matchesMd) {
                isOpen && e.preventDefault();
                setOpenCountryFilter(true);
              }
            }}
          >
            {placeholder && (
              <option className={styles.default} value="">
                {placeholder}
              </option>
            )}
            {countries
              ? data.map(el => (
                  <option key={el.cname} value={el.cname}>
                    {el.cname}
                  </option>
                ))
              : countriesCodes
              ? data.map(el => (
                  <option key={el.ccode} value={el.ccode}>
                    {el.cname}
                  </option>
                ))
              : yearCompleted
              ? list.map(el => (
                  <option key={el.id} value={`completed-${el.key}`}>
                    {el.label}
                  </option>
                ))
              : data.map(el => (
                  <option key={el.value} value={el.key}>
                    {el.label}
                  </option>
                ))}
          </select>
        )}

        {multi && (
          <Select
            style={{
              width: '100%',
            }}
            disableUnderline
            disabled={disabled}
            multiple
            value={input.value || []}
            onChange={input.onChange}
            classes={{
              select: multipleSelectClasses,
              icon: styles.icon,
            }}
            renderValue={selected => selected.join(', ')}
          >
            {data.map(el => (
              <MenuItem
                key={el.value}
                value={el.value}
                classes={{ selected: styles.selected }}
              >
                {el.value}
              </MenuItem>
            ))}
          </Select>
        )}

        <Icons.DropdownArrow className={arrowStyles || styles.arrow} />
      </div>
      {meta.touched && meta.invalid && (
        <span className={styles.error}>{meta.error}</span>
      )}
    </div>
  );
}
