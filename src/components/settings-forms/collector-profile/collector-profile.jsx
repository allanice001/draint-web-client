import CollectorProfileForm from './collector-profile-form';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './collector-profile.module.scss';

function CollectorProfile({ onSubmit }) {
  return (
    <section className={styles.section}>
      <h3 className={`group-title ${styles.title}`}>Your profile settings</h3>
      <CollectorProfileForm onSubmit={onSubmit} />
    </section>
  );
}

CollectorProfile.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CollectorProfile;
