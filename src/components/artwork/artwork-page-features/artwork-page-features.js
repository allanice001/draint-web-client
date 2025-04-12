import Icons from '../../icons';
import React from 'react';
import styles from './artwork-page-features.module.scss';

const features = [
  {
    Icon: Icons.CreditCard,
    label: 'Secure Payment',
    description: `Draint collects the money on behalf of the artist.
      14 days after the artwork arrival at your place, we release the payout to our artist.`,
  },
  {
    Icon: Icons.Shipping,
    label: 'Shipping to your Door',
    description: `We arrange pick-up and delivery of the artwork to you.
      Artists always follow our packaging guidlince.`,
  },
  {
    Icon: Icons.ArtistCertificate,
    label: 'Resell on Draint',
    description: `Owning an Artwork purchased on Draint is different.
     Track the artist’s development and decide to reoffer the work on Draint when you feel the time has come. 
     We manage all the shipping and payment for you`,
  },
];

function ArtworkPageFeatures() {
  return (
    <section>
      <div className="container">
        <h3 className="group-title">Buying art through Draint</h3>

        <div className={styles.features}>
          {features.map(({ Icon, label, description }, i) => (
            <div className={styles.feature} key={i}>
              <div className={styles.feature__icon}>
                <Icon className={i === 0 ? styles.feature__credit : ''} />
              </div>
              <div>
                <h4 className={styles.feature__label}>{label}</h4>
                <p className={styles.feature__description}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ArtworkPageFeatures;
