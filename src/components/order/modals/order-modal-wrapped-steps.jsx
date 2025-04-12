import React, { useEffect, useState } from 'react';
import { bool, func } from 'prop-types';

import DefaultModal from 'components/basic-modal/basic-modal';
import WrappedSteps from './wrapped-steps';
import styles from './order-modal-signature.module.scss';
import { useSelector } from 'react-redux';

function WrappedStepModal({
  isOpen,
  setOpen,
  order,
  orderPagination,
  resale = false,
}) {
  const profileId = useSelector(store => store.user.account.profile_id);
  const [wrappedSteps, setWrappedSteps] = useState(
    order ? order.wrappedSteps : []
  );

  useEffect(() => {
    setWrappedSteps(order ? order.wrappedSteps : []);
  }, [order]);

  function setCurrentSteps() {
    setWrappedSteps(wrappedSteps);
  }

  return (
    <DefaultModal
      isOpen={isOpen}
      title={'Follow the steps carefully'}
      handleClose={setOpen}
      footerClassName={styles.footer_wrap}
      footer={
        <div className="d-flex j-center">
          <button
            type="button"
            className={styles.button_wrap}
            onClick={setOpen}
          >
            Confirm
          </button>
        </div>
      }
    >
      {wrappedSteps.map((step, key) => {
        return (
          <WrappedSteps
            key={key}
            step={step}
            order={order}
            profileId={profileId}
            setCurrentSteps={setCurrentSteps}
            orderPagination={orderPagination}
          />
        );
      })}
    </DefaultModal>
  );
}

WrappedStepModal.propTypes = {
  isOpen: bool.isRequired,
  setOpen: func.isRequired,
};

export default WrappedStepModal;
