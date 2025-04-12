import React, { useEffect } from 'react';
import { JoinOurForm } from './join-our-section-form';
import { MasterJoinOurNav } from 'components/nav/sub/masterJoinOurNav';
import { resetStore } from 'redux/master/actions/master-join-our-actions';
import styles from 'views/master/homepage/homepage.module.scss';
import { useDispatch } from 'react-redux';
import { useMasterJoinOurSections } from 'hooks/use-master-join-our-sections';

export const MasterJoinOurGeneratorSections = () => {
  const { handleCreateSection } = useMasterJoinOurSections();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetStore());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <MasterJoinOurNav />
      <JoinOurForm handleCreate={handleCreateSection} />
    </div>
  );
};
