import * as Button from 'components/shared/button';

import { List, Record } from 'components/shared/list';
import React, { useCallback, useState } from 'react';

import BasicDropDown from 'components/shared/basic-dropdown/basic-dropdown';
import DropdownArrow from 'components/icons/dropdown-arrow';
import SortIcon from 'components/icons/sort';
import cx from 'classnames';
import styles from './dropdown.module.scss';
import useTheme from 'hooks/use-theme';

export default function Dropdown({
  options,
  onChange,
  justIconOnMobile,
  className,
}) {
  const [activeItem, setActiveItem] = useState(options[0] || {});
  const { isMobile } = useTheme();

  const changeHandler = useCallback(
    item => {
      setActiveItem(item);
      onChange(item.value);
    },
    [onChange]
  );

  const list = (
    <List className={styles.list}>
      {options.map(item => (
        <Record
          className={styles.option}
          onClick={() => changeHandler(item)}
          key={item.value}
        >
          {item.label}
        </Record>
      ))}
    </List>
  );

  const label = isMobile ? null : (
    <span className={styles.label}>
      {activeItem.label} <DropdownArrow className={styles.arrowIcon} />
    </span>
  );

  return (
    <BasicDropDown content={list} useClick>
      <Button.Secondary
        className={cx(styles.wrapper, className)}
        icon={
          <SortIcon
            className={cx(styles.sortIcon, {
              [styles.show]: isMobile,
            })}
          />
        }
      >
        {label}
      </Button.Secondary>
    </BasicDropDown>
  );
}
