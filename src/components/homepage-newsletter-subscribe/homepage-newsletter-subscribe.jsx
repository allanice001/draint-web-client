import { HOME_NEWSLETTER_FORM } from 'constants/components/weekly-newsletter';
import { NewsletterSubscribeForm } from 'components/footer/newsletter-form/newsletter-form';
import React from 'react';
import { required } from 'components/reduxForm/validators';
import styles from './newsletter-subscribe.module.scss';
import { useSelector } from 'react-redux';

const HomepageNewsletterSubscribe = () => {
  const section =
    useSelector(state => state.home.newsletterSection?.section) || {};

  if (!Object.keys(section).length) return null;

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
              <p className={styles.desc}>{section.subtitle}</p>
            </div>

            <div className={styles.subscribe_form}>
              <NewsletterSubscribeForm
                form={HOME_NEWSLETTER_FORM.name}
                validate={required}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomepageNewsletterSubscribe;
