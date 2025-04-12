import React, { useEffect } from 'react';
import { MasterNewsLetterSectionNav } from 'components/nav/sub/masterNewsletterSectionNav';
import { NewsletterSectionForm } from './newsletter-section-form';
import { resetStore } from 'redux/master/actions/master-join-our-actions';
import styles from 'views/master/homepage/homepage.module.scss';
import { useDispatch } from 'react-redux';
import { useMasterNewsletterSections } from 'hooks/use-master-newsletter-section';

export const MasterNewsletterGeneratorSections = () => {
  const dispatch = useDispatch();
  const { handleCreateSection } = useMasterNewsletterSections();

  useEffect(() => {
    dispatch(resetStore());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <MasterNewsLetterSectionNav />
      <NewsletterSectionForm handleCreate={handleCreateSection} />
    </div>
  );
};
