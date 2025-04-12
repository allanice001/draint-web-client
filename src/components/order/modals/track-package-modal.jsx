import { bool, func } from 'prop-types';
import DefaultModal from 'components/basic-modal/basic-modal';
import React from 'react';
import TrackerInfo from './track-package-layouts/track-package-info';
import classNames from 'classnames';
import { clearShipmentTrackPackage } from 'redux/dashboard/actions/ordersActions';
import styles from './order-modal-signature.module.scss';
import { useDispatch } from 'react-redux';

function TrackPackageModal({ isOpen, setClose }) {
  const dispatch = useDispatch();
  const confirmButtonClass = classNames('primary-button', styles.button);

  function onConfirm() {
    setClose(!isOpen);
    dispatch(clearShipmentTrackPackage());
  }

  return (
    <DefaultModal
      isOpen={isOpen}
      title={'Package info'}
      handleClose={onConfirm}
      footerClassName={styles.footer}
      footer={
        <div className="d-flex j-center">
          <button
            type="button"
            className={confirmButtonClass}
            onClick={onConfirm}
          >
            Ok
          </button>
        </div>
      }
    >
      <div>
        <TrackerInfo isOpen={isOpen} />
      </div>
    </DefaultModal>
  );
}

TrackPackageModal.propTypes = {
  isOpen: bool.isRequired,
  setClose: func.isRequired,
};

export default TrackPackageModal;
