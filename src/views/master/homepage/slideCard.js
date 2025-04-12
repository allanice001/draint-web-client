import { List, Record } from 'components/shared/list';
import React, { useMemo } from 'react';

import cx from 'classnames';
import { imageSizes } from 'constants/media-query/image-sizes';
import styles from './homepage.module.scss';

export const SlideCard = ({ item, params }) => {
  const content = useMemo(() => {
    return (
      <List>
        {params.map(el => (
          <Record key={el.name} className={styles.param}>
            <b className={styles.label}>{el.label}</b>
            <br />
            <span>{item[el.name]}</span>
          </Record>
        ))}
      </List>
    );
  }, [item, params]);

  const status = useMemo(() => {
    return item.is_active ? 'Approved' : 'Disapproved';
  }, [item]);

  return (
    <div className={styles.item}>
      <img
        srcSet={item.primary_image || item.small_image}
        sizes={imageSizes.ADAPTIVE}
        alt=""
        className={styles.image}
      />

      {content}

      <span
        className={cx(styles.status, {
          [styles.verified]: item.is_active,
          [styles.unverified]: !item.is_active,
        })}
      >
        {status}
      </span>
    </div>
  );
};
