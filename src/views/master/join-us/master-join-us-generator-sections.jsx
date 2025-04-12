import React, { useEffect } from 'react';
import { JoinUsForm } from './join-us-section-form';
import { MasterJoinUsNav } from 'components/nav/sub/masterJoinUsNav';
import { resetStore } from 'redux/master/actions/master-join-our-actions';
import styles from 'views/master/homepage/homepage.module.scss';
import { useDispatch } from 'react-redux';
import { useMasterJoinUsSections } from 'hooks/use-master-join-us-sections';

export const MasterJoinUsGeneratorSections = () => {
  const { handleCreateSection } = useMasterJoinUsSections();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetStore());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <MasterJoinUsNav />
      <JoinUsForm handleCreate={handleCreateSection} />
    </div>
  );
};
