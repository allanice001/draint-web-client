import React, { useEffect, useRef } from 'react';
import Icons from 'components/icons';
import classnames from 'classnames';
import styles from './checkbox.module.scss';

export default function Input(props) {
  const {
    label,
    className,
    input,
    box = false,
    toggle,
    checked,
    onChange,
    name,
    disabled,
    value,
    hideCheckbox,
  } = props;

  const classNames = classnames(
    styles.wrapper,
    { [styles.box]: box, [styles.toggle__wrapper]: toggle },
    className
  );

  const checkboxClasses = classnames(styles.check, {
    [styles.alone]: !label,
    [styles.hide]: toggle || hideCheckbox,
  });

  const toggleClasses = classnames(styles.toggle);
  const labelClassNames = classnames(styles.label, {
    [styles.disabled]: disabled,
    [styles.hovered]: hideCheckbox,
  });

  const disabledButton = classnames(styles.toggle_button, {
    [styles.toggle_button__disabled]: disabled,
  });

  const ref = useRef();
  useEffect(() => {
    ref.current.checked = checked || input?.value || value;
  }, [checked, input?.value, value]);

  return (
    <div className={classNames}>
      <label className={labelClassNames}>
        <input
          ref={ref}
          className={disabledButton}
          disabled={disabled}
          type="checkbox"
          name={name || input?.name}
          onChange={onChange || input?.onChange}
        />
        <span className={checkboxClasses}>
          <Icons.Check className={styles.icon} />
        </span>
        {label}
        {toggle && (
          <span className={toggleClasses}>
            <span className={styles.circle} />
          </span>
        )}
      </label>
    </div>
  );
}
