import {
  COLLECTOR_BUTTON,
  COLLECTOR_TITLE,
  FEATURES,
  LEARN_MORE_BUTTON,
} from 'constants/components/join-us/collector- features';
import { COLLECTOR_SIGN_UP } from 'constants/links';
import JoinUsButton from 'components/join-us/join-us-button';
import { Link } from 'components/link/link';
import React from 'react';
import styles from './join-as-collector.module.scss';
import { useJoinUs } from 'hooks/use-join-us';

const JoinUsCollector = () => {
  const { email, isArtist } = useJoinUs();

  return (
    <section>
      <div className="container">
        <h3 className="group-title">Our core values and promises</h3>
        <p className="group-subtitle">{COLLECTOR_TITLE}</p>
        <div className={styles.content}>
          {FEATURES.map(feature => (
            <div className={styles.card} key={feature.key}>
              <img
                alt={feature.title}
                className={styles.card__image}
                height="200"
                src={feature.img}
                title={feature.title}
              />
              <h4 className={styles.card__title}>{feature.title}</h4>
              <p className={styles.card__description}>{feature.description}</p>
            </div>
          ))}
        </div>

        {(Boolean(isArtist) || !Boolean(email)) && (
          <div className={styles.footer}>
            <JoinUsButton
              name={COLLECTOR_BUTTON}
              url={COLLECTOR_SIGN_UP}
              logout={Boolean(email)}
            />
            <Link url={LEARN_MORE_BUTTON.url} className="secondary-button">
              {LEARN_MORE_BUTTON.title}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export { JoinUsCollector };
