import Icons from 'components/icons';
import { Link } from 'components/lib';
import React from 'react';
import cx from 'classnames';
import styles from './artwork-page-breadcrumbs.module.scss';

function Content({ el, i, arr }) {
  function setLink() {
    if (Object.keys(el).length > 2 && !!!el.isArtist) {
      return 2;
    }

    return 1;
  }

  return i === arr.length - setLink() ? (
    <span className={styles.link}>{el.label}</span>
  ) : (
    <Link className={styles.link} url={el.url} text={el.label} />
  );
}

function ArtworkPageBreadcrumbs({ list = [], children, sm }) {
  return (
    <div
      className={cx(styles.breadcrumbs, {
        [styles.sm]: sm,
      })}
    >
      <div className={`container ${styles.container}`}>
        <ul className={styles.list}>
          {list.map((el, i, arr) => (
            <li className={`${styles.item} ${styles.desktop}`} key={i}>
              <Content el={el} i={i} arr={arr} />
              <Icons.ArrowRight className={styles.arrow} />
            </li>
          ))}
        </ul>
        {children}
      </div>
    </div>
  );
}

export default ArtworkPageBreadcrumbs;
