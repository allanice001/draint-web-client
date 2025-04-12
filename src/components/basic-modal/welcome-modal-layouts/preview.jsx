import React from 'react';
import staticUrls from 'constants/images/static-urls';
import styles from 'components/basic-modal/welcome-modal.module.scss';

export function Preview() {
  return (
    <div className={styles.preview}>
      <div>
        <h1>
          We are happy you made it <br /> You are now One of Us
        </h1>
        <p>
          Be independent, humble, hard working, money making and personal brand
          creating.
        </p>
      </div>
      <img alt="" src={staticUrls.image.paintColorful} />
    </div>
  );
}
