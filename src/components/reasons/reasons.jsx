import { ARTIST_SIGN_UP } from 'constants/links';
import { DRAINT_NAME } from 'constants/global';
import Icons from '../icons';
import JoinUsButton from '../join-us/join-us-button';
import React from 'react';
import staticUrls from 'constants/images/static-urls';
import styles from './reasons.module.scss';

const groups = {
  draint: {
    src: staticUrls.image.logo,
    label: 'Draint',
  },

  builder: {
    label: 'Website Builder',
  },

  custom: {
    label: 'Custom Website',
  },
};

const reasonsModal = [
  {
    label: 'List your Artworks and show your Vita',

    checks: {
      draint: true,
      builder: true,
      custom: true,
    },
  },
  {
    label: 'Shop system to enable selling your Work',

    checks: {
      draint: true,
      builder: true,
      custom: true,
    },
  },
  {
    label: 'Payment & Shipping Management',

    checks: {
      draint: true,
      builder: true,
      custom: false,
    },
  },
  {
    label: 'Own Artist-Mailbox and Contact Tool',

    checks: {
      draint: true,
      builder: false,
      custom: false,
    },
  },
  {
    label: 'Enable Facebook & Instagram Shopping',

    checks: {
      draint: true,
      builder: false,
      custom: false,
    },
  },
  {
    label: 'Earn again, whenever your work gets resold',

    checks: {
      draint: true,
      builder: false,
      custom: false,
    },
  },
  {
    label: 'AI powered metrics to track your value increase',

    checks: {
      draint: true,
      builder: false,
      custom: false,
    },
  },
];

const Reasons = ({ showFooter = false, is_artist, title, subtitle }) => {
  return (
    <section className={styles.wrapper}>
      <div className={`container ${styles.container}`}>
        <h3 className={`group-title ${styles.title}`}>
          {title || 'All-in-One Solution'}
        </h3>
        <p className={`group-subtitle ${styles.subtitle}`}>
          {subtitle ||
            'With a Draint Page an Artist gets 10x more search requests than with any other solution.'}
        </p>
        <div className={styles.reasons}>
          <div className={styles.reasons__header}>
            <div className={styles.reason}>&nbsp;</div>
            {[DRAINT_NAME, 'builder', 'custom'].map(el => (
              <div className={styles.check} key={el}>
                {groups[el].src && (
                  <img
                    alt={groups[el].label}
                    className={styles.logo}
                    src={groups[el].src}
                    title={groups[el].label}
                    width="90"
                  />
                )}
                {!groups[el].src && (
                  <span className={styles.label}>{groups[el].label}</span>
                )}
              </div>
            ))}
          </div>

          <div className={styles.reasons__body}>
            {reasonsModal.map(({ label, checks }, i) => (
              <div className={styles.row} key={i}>
                <div className={styles.reason}>{label}</div>
                {[DRAINT_NAME, 'builder', 'custom'].map(el => (
                  <div className={styles.check} key={el}>
                    <Icons.CheckCircle
                      className={checks[el] ? '' : styles.inactive}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.shadow} />
        </div>
        {showFooter && !is_artist && (
          <div className={styles.footer}>
            <JoinUsButton name={'Join as Artist'} url={ARTIST_SIGN_UP} />
          </div>
        )}
      </div>
    </section>
  );
};

export { Reasons };
