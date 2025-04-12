import { BACKGROUND } from 'constants/shipping-page/shipping-page';
import React from 'react';
import staticUrls from 'constants/images/static-urls';
import styles from './background-section.module.scss';
import useTheme from 'hooks/use-theme';

const BackgroundSection = () => {
  const { isMobile, isTablet } = useTheme();

  const getImageUrl = () => {
    if (isMobile) {
      return staticUrls.screen.femaleYongMobile;
    }
    if (isTablet) {
      return staticUrls.screen.femaleYongTablet;
    }
    return staticUrls.screen.femaleYongDesktop;
  };

  const imageUrl = getImageUrl();

  return (
    <section className={styles.root}>
      <div
        className={styles.image_container}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
        }}
      >
        <div className={styles.text_container}>
          <h2 className={styles.title}>{BACKGROUND.title}</h2>
          {isMobile ? (
            <p className={styles.subtitle}>{BACKGROUND.description_mobile}</p>
          ) : (
            <p className={styles.subtitle}>{BACKGROUND.description_desktop}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BackgroundSection;
