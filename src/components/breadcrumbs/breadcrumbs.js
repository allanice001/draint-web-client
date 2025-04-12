import Icons from 'components/icons';
import { Link } from 'components/lib';
import React from 'react';
import styles from './breadcrumbs.module.scss';

export function Breadcrumb({ list }) {
  return (
    <div className={styles.breadcrumbs}>
      <div className={`container ${styles.container}`}>
        <ul className={styles.list}>
          {list.map((el, i, arr) => (
            <li className={`${styles.item} ${styles.desktop}`} key={i}>
              {i === arr.length - 1 ? (
                <span className={styles.link}>{el.label}</span>
              ) : (
                <Link className={styles.link} url={el.url} text={el.label} />
              )}

              <Icons.ArrowRight className={styles.arrow} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
