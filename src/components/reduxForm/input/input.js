import 'react-phone-input-2/lib/style.css';

import IconsHandler from 'components/reduxForm/input/input-status-icon';
import PhoneInput from 'react-phone-input-2';
import React from 'react';
import classnames from 'classnames';
import styles from './input.module.scss';

export default function Input(props) {
  const {
    type = 'text',
    name,
    onChange,
    flat = false,
    label,
    endpoint,
    adornment,
    className,
    inputClassName = '',
    labelClassName = '',
    input,
    meta,
    disabled,
    value, // it`s broken address form,
    placeholder,
    split,
    inline,
    required,
    shadow,
    onFocus,
    phone,
    isHashtag,
    pattern,
    country = 'us',
    handleRef,
    handleOnBlur,
    handleOnFocus,
    isOnFocus,
    handleOnClick,
    endpointClassName,
    withStatusIcon,
    errorMessage,
    maxLength,
    lengthCounter,
    min,
    max,
    onKeyDown = () => {},
    dropdownPlacement = 'bottom',
    defaultValue,
    countClass,
  } = props;
  /**
   * CSS classnames for wrapper element
   */
  const classNames = classnames(styles.wrapper, className, {
    [styles.required]: required,
    [styles.shadow]: shadow,
    [styles.inline]: inline,
  });
  /**
   * CSS classnames for the field input
   */
  const controlClasses = classnames(
    props.subscription
      ? styles.input_subscription
      : meta?.touched && meta.invalid
      ? styles.input_subscription
      : phone
      ? styles.phone
      : styles.input,
    inputClassName,
    {
      [styles.left]: adornment,
      [styles.right]: endpoint,
      [styles.flat]: flat,
      [styles.split]: split,
      [styles.error]: meta?.touched && meta?.invalid && props.subscription,
      [styles.success]: !meta?.invalid && props.subscription,
    }
  );
  const endpointClasses = classnames(styles.endpoint, endpointClassName);
  const dropdownClasses = classnames({
    [styles.bottom]: dropdownPlacement === 'bottom',
    [styles.top]: dropdownPlacement === 'top',
  });

  const counterClasses = classnames(styles.count, countClass);

  const currentValue = value || input?.value || '';

  /**
   * Defining onChange function for field
   */
  const onChangeF = input?.onChange || onChange;
  const hashtagTemplate = value => {
    const headValue = value && value[0];
    return value ? (headValue === '#' ? '' : '#') + value : value;
  };

  return (
    <div className={classNames}>
      {!split && label !== false && (
        <label className={labelClassName || styles.label}>
          {label || <Nbsp />}
        </label>
      )}
      <span className={styles.control}>
        {adornment && <span className={styles.adornment}>{adornment}</span>}
        {phone ? (
          <PhoneInput
            country={country}
            value={currentValue}
            inputProps={{
              name: input?.name || name,
              required: true,
            }}
            enableSearch
            disabled={disabled}
            onChange={onChangeF}
            containerClass={controlClasses}
            dropdownClass={dropdownClasses}
          />
        ) : (
          <input
            autoComplete="off"
            type={type}
            ref={handleRef}
            name={input?.name || name}
            value={isHashtag ? hashtagTemplate(currentValue) : currentValue}
            className={controlClasses}
            onKeyDown={e => onKeyDown(e.key)}
            onChange={v =>
              pattern
                ? pattern.test(v)
                  ? onChangeF(v)
                  : undefined
                : onChangeF(v)
            }
            placeholder={placeholder || ''}
            onBlur={handleOnBlur || input?.onBlur}
            disabled={disabled}
            onFocus={handleOnFocus || onFocus}
            onClick={handleOnClick || null}
            maxLength={maxLength}
            defaultValue={defaultValue}
            min={min}
            max={max}
          />
        )}
        {endpoint && <span className={endpointClasses}>{endpoint}</span>}
        {withStatusIcon && (
          <span className={endpointClasses}>
            <IconsHandler
              isShow={meta?.touched || meta?.dirty}
              error={errorMessage || meta?.error}
            />
          </span>
        )}
      </span>
      {maxLength && lengthCounter && (
        <small className={counterClasses}>
          {currentValue.length} / {maxLength}
        </small>
      )}
      {(errorMessage ||
        ((meta?.touched || meta?.dirty) &&
          meta?.invalid &&
          (isOnFocus !== undefined ? isOnFocus : true))) && (
        <span className={styles.error}>{errorMessage || meta?.error}</span>
      )}
    </div>
  );
}
const Nbsp = () => <>&nbsp;</>;
