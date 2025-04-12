import React, { forwardRef, useCallback, useRef } from 'react';

import CountryRoundedFlag from '../artist-country-flag/artist-country-flag';
import displayMessage from '../../../redux/global/notiifcation/actions/displayMessage';
import { saveAs } from 'file-saver';
import styles from './artist-long-card-download.module.scss';
import { toBlob } from 'html-to-image';
import { useDispatch } from 'react-redux';

const CardPreview = forwardRef((props, ref) => {
  const { country, artworks = [], count, avatar, fullName } = props;

  return (
    <div className={styles.artist__wrapper} ref={ref}>
      <div className={styles.artist__content}>
        <h4 className={styles.artist__name}>{fullName}</h4>
        <CountryRoundedFlag
          country={country}
          className={styles.country}
          size={20}
        />
        {artworks && !!artworks.length && (
          <div
            className={`${styles.artwork__list} ${
              artworks.length < 3 ? styles.notfull : ''
            }`}
          >
            {artworks.map((el, i) => (
              <div className={styles.artwork__wrapper}>
                <img
                  src={el}
                  alt=""
                  className={styles.artwork}
                  decoding="sync"
                />
                {i === 2 && count > 3 && (
                  <div className={styles.count}>+{count - 3}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <img
        decoding="sync"
        width="290"
        height="390"
        className={styles.image}
        src={avatar}
        alt=""
      />
    </div>
  );
});

const ArtistLongCardDownload = ({ artist }) => {
  const { avatar, fullName, country, artworks, artworks_count } = artist;
  const componentRef = useRef(null);
  const dispatch = useDispatch();

  const onDownload = useCallback(() => {
    toBlob(componentRef.current)
      .then(blob => {
        saveAs(blob, `${fullName}.png`);
      })
      .catch(err => {
        dispatch(displayMessage('Something went wrong!'));
      });
  }, [componentRef, fullName, dispatch]);

  return (
    <div className={styles.content}>
      <div className={styles.artist}>
        <CardPreview
          ref={componentRef}
          country={country}
          artworks={artworks}
          count={artworks_count}
          avatar={avatar}
          fullName={fullName}
        />
      </div>
      <div className={styles.footer}>
        <button type="button" className="primary-button" onClick={onDownload}>
          Export As PNG
        </button>
      </div>
    </div>
  );
};

export default ArtistLongCardDownload;
