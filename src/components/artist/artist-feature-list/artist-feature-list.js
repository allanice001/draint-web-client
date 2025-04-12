import { Container } from 'components/shared/container/container';
import React from 'react';
import { SingleSlide } from 'components/artist/artist-feature-carousel/artist-feature-carousel';
import cx from 'classnames';
import styles from './artist-feature-list.module.scss';

export const ArtistFeatureList = () => {
  return (
    <section className={styles.root}>
      <Container>
        <h2 className="group-title">New features for Artists</h2>
        <p className={cx('group-subtitle', styles.subtitle)}>
          Get to know, and use our new features to build your brand and sell
          art.
        </p>

        <div className={styles.list}>
          <SingleSlide slide={2} hasPadding />
          <SingleSlide slide={3} reverse hasPadding />
          <SingleSlide slide={4} />
          <SingleSlide slide={5} reverse hasPadding />
          <SingleSlide slide={1} />
        </div>
      </Container>
    </section>
  );
};
