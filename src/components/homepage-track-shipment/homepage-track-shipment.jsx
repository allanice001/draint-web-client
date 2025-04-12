import { Link } from 'react-router-dom';
import React from 'react';
import staticUrls from 'constants/images/static-urls';
import styles from './homepage-track-shipment.module.scss';
import { useSelector } from 'react-redux';

const HomepageTrackShipment = () => {
  const section =
    useSelector(state => state.home.shipmentSection?.section) || {};

  if (!Object.keys(section).length) return null;

  return (
    <section className={styles.root}>
      {section.primary_image && (
        <div
          className={styles.container}
          style={{
            backgroundImage: `url(${section.primary_image})`,
            backgroundSize: 'cover',
          }}
        >
          <div className={styles.text_container}>
            <h2 className={styles.title}>{section.title}</h2>
            <p className={styles.desc}>{section.subtitle}</p>
            <div className={styles.button}>
              <Link className={styles.link} to={section.url}>
                {section.button}
              </Link>
            </div>
          </div>
          <div className={styles.macbook_container}>
            <div
              className={styles.macbook}
              style={{
                backgroundImage: `url(${staticUrls.screen.macbook})`,
                backgroundSize: 'contain',
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default HomepageTrackShipment;
