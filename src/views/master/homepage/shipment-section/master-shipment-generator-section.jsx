import React, { useEffect } from 'react';
import { MasterShipmentSectionNav } from 'components/nav/sub/masterShipmentSectionNav';
import { ShipmentSectionForm } from './shipment-section-form';
import { resetStore } from 'redux/master/actions/master-join-our-actions';
import styles from 'views/master/homepage/homepage.module.scss';
import { useDispatch } from 'react-redux';
import { useMasterShipmentSections } from 'hooks/use-master-shipment-section';

export const MasterShipmentGeneratorSections = () => {
  const dispatch = useDispatch();
  const { handleCreateSection } = useMasterShipmentSections();

  useEffect(() => {
    dispatch(resetStore());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <MasterShipmentSectionNav />
      <ShipmentSectionForm handleCreate={handleCreateSection} />
    </div>
  );
};
