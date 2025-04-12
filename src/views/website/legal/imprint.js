import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Parse from 'react-html-parser';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import cx from 'classnames';
import { getLegalImprint } from 'redux/legal/actions/legalActions';
import { pageScroll } from 'services/pageScroller';
import styles from './imprint.module.scss';

export const Imprint = () => {
  const { imprint, loading } = useSelector(state => state.legal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLegalImprint());
    pageScroll();
  }, [dispatch]);

  if (loading) {
    return <Spinner full />;
  }

  return (
    <main className={cx(styles.wrapper)}>
      <div className="container">
        <section className={styles.container}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1 className={styles.title}>{imprint?.title}</h1>
              <img alt="" className={styles.image} src={imprint?.image_url} />
            </div>
            <div className={styles.separator} />
            <section className={styles.description}>
              <div className={styles.description__content}>
                {Parse(imprint?.html_content)}
                <div className={styles.blur__text} />
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
};
