import { Link } from 'react-router-dom';
import React from 'react';
import styles from './homepage-join-us.module.scss';
import { useSelector } from 'react-redux';

const HomepageJoinUs = () => {
  const section = useSelector(state => state.home.joinUsSection?.section);

  if (!section || !Object.keys(section).length) return null;

  return (
    <section className={styles.root}>
      {!!Object.keys(section).length && (
        <div
          className={styles.container}
          style={{
            backgroundImage: `url(${section.primary_image})`,
            backgroundSize: 'cover',
          }}
        >
          <div className={styles.content}>
            <div className={styles.text_container}>
              <h2 className={styles.title}>{section.title}</h2>
            </div>
            <div className={styles.button}>
              <Link className={styles.link} to={section.url}>
                {section.button}
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomepageJoinUs;
