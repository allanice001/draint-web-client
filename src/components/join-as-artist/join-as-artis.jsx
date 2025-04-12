import { ARTIST_SIGN_UP } from '../../constants/links';
import JoinUsButton from '../join-us/join-us-button';
import React from 'react';
import image1 from './artist.svg';
import image2 from './artist2.svg';
import styles from './join-as-artist.module.scss';

const JoinAsArtist = ({
  description,
  image = 1,
  is_artist,
  showFooter = true,
}) => {
  const getImage = imageNumb => {
    switch (imageNumb) {
      case 1:
        return image1;
      case 2:
        return image2;
      default:
        return image1;
    }
  };

  return (
    <section>
      <div className="container">
        <h3 className="group-title">Customize your Draint profile</h3>
        <p className="group-subtitle">
          Our montly selection of upcoming Draint top artist.
        </p>

        <div className={styles.content}>
          <img
            className={styles.image}
            src={getImage(image)}
            alt="Preview"
            title={description}
          />
          <div className={styles.description}>{description}</div>
        </div>
      </div>

      {showFooter && !is_artist && (
        <JoinUsButton name={'Join as Artist'} url={ARTIST_SIGN_UP} />
      )}
    </section>
  );
};

export { JoinAsArtist };
