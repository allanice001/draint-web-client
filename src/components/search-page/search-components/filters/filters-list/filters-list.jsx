import React, { useState } from 'react';

import { Field } from 'redux-form';
import Icons from 'components/icons';
import RadioButton from './radio-button';
import classnames from 'classnames';
import styles from './filters-list.module.scss';

function FiltersList({ list = [], label, name, handleChange }) {
  const [expanded, setExpanded] = useState(true);
  const [full, setFull] = useState(false);

  const arrowIconClasses = classnames(styles.icon, {
    [styles.expanded]: expanded,
  });

  const labelClasses = classnames(styles.label, {
    [styles.expanded]: expanded,
  });

  const listWrapperClasses = classnames(styles.list__wrapper, {
    [styles.expanded]: expanded,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <label className={labelClasses}>{label}</label>
        <button
          type="button"
          className={styles.dropdown}
          onClick={() => setExpanded(!expanded)}
        >
          <Icons.DropdownArrow className={arrowIconClasses} />
        </button>
      </div>

      <div className={listWrapperClasses}>
        <Field
          className={styles.item__checkbox}
          component={RadioButton}
          list={list.slice(0, !full ? 6 : undefined)}
          name={name}
          onChange={handleChange}
        />

        {!full && list.length > 6 && (
          <button
            type="button"
            className={styles.more}
            onClick={() => setFull(true)}
          >
            <span className={styles.dots} />
            Show more
          </button>
        )}
      </div>
    </div>
  );
}

export default FiltersList;
