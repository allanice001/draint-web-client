import React from 'react';
import staticUrls from 'constants/images/static-urls';
import styles from './newsletter-email-template.module.scss';

const EmailTemplate = ({ html = '' }) => {
  return (
    <div className={styles.root}>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <img
          alt="No preview"
          src={staticUrls.image.noImage}
          title="No preview"
          width="200px"
          height="200px"
        />
      )}
    </div>
  );
};

export default EmailTemplate;
