import { ARTIST_SIGN_UP } from 'constants/links';
import Icons from '../../icons';
import JoinUsButton from '../../join-us/join-us-button';
import Laptop from '../../laptop/laptop';
import React from 'react';
import staticUrls from 'constants/images/static-urls';
import styles from './artist-features.module.scss';

const features = [
  {
    id: 1,
    src: staticUrls.svg.galleryIcon,
    label: 'Forget about Website-Builder or expensive galleries',
    lead: 'Your all in One Artist Profile',

    description:
      'Customize, sell Artworks, present your Vita, Blogpost, connect Instagram, ship and manage Payouts.',
  },
  {
    id: 2,
    src: staticUrls.svg.aboutMeIcon,
    label: 'Tell your story. Build your Brand',
    lead: 'About section',

    description:
      'Write your biography, add blogs and present yourself. Create a personal artist brand',
  },
  {
    id: 3,
    active: true,
    src: staticUrls.svg.dashboardIcon,
    bg: staticUrls.screen.salesDashboard,
    bgf: staticUrls.screen.paymentModal,

    point: {
      x: 0,
      y: 44.58128078817734,
      icon: () => <Icons.Attention />,
    },

    bgfPosition: {
      x: 0,
      y: 31.03448275862069,
    },

    label: 'Build your Customerbase',
    lead: 'Manage Customer Generation',

    description:
      'Create contacts, send In-Profile Mails about new artworks, recently sold or soon up for sale.',
  },
  {
    id: 4,
    src: staticUrls.svg.contactIcon,
    label: 'Easy payment & shippments',
    lead: 'Sales dashboard',
    description: `We got you covered. Get paid safe & secure,
      manage payout and show shipping costs exactly from your doorstop, into the world.`,
  },
];

function ArtistFeatures({ isArtist }) {
  return (
    <section>
      <div className="container">
        <h3 className="group-title">New features for Artist</h3>

        <div className={styles.carousel__wrapper}>
          {features.map(item => (
            <div
              key={item.id}
              className={`${styles.carousel__item} ${
                item.active ? styles.active : ''
              }`}
            >
              <img alt={item.lead} src={item.src} title={item.lead} />
              <span className={styles.lead}>{item.lead}</span>
              <h4 className={styles.label}>{item.label}</h4>
              <p className={styles.description}>{item.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.content__wrapper}>
          <div className={styles.laptop}>
            <Laptop slide={features[2]} />
          </div>

          <div className={styles.content}>
            <p>
              We are not your next OnlineGallery. <br /> We are a Platform, a
              Do-it-Yourself Profile Builder, a Gallery and a Place where
              collectors invest in you as an Artist to grow. We compensate for
              your personal Website, by combining all needed areas of
              presentation with the features of an online gallery, like
              selling-, shipping- and payout management. We ask for tiny amount
              of fees because we are on a mission. On Draint, you can earn
              multiple times with one Artwork!
            </p>

            {!isArtist && (
              <div className={styles.footer}>
                <JoinUsButton name={'Join as Artist'} url={ARTIST_SIGN_UP} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArtistFeatures;
