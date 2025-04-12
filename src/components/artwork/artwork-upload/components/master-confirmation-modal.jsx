import BasicModal from '../../../basic-modal/basic-modal';
import PropsTypes from 'prop-types';
import React from 'react';
import styles from '../artwork-upload.module.scss';

const MasterConfirmationModal = function({ open, handleClose, handleConfirm }) {
  return (
    <BasicModal
      footer={
        <div className={styles.modal_footer}>
          <button
            className="secondary-button"
            onClick={handleClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="primary-button"
            onClick={handleConfirm}
            type="button"
          >
            Confirm
          </button>
        </div>
      }
      handleClose={handleClose}
      isOpen={open}
      title="Confirm upload"
    >
      <div className={styles.modal_content}>
        <h2>
          You haven&apos;t specified all artwork information or information is
          incorrect. Please, confirm artwork upload.
        </h2>
      </div>
    </BasicModal>
  );
};

MasterConfirmationModal.propTypes = {
  open: PropsTypes.bool,
  handleClose: PropsTypes.func,
  handleConfirm: PropsTypes.func,
};

export default MasterConfirmationModal;
