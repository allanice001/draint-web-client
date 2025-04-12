import React, { useEffect, useState } from 'react';

import BasicModal from '../../../basic-modal/basic-modal';
import { connect } from 'react-redux';
import styles from './delete-contact-modal.module.scss';

const DeleteContactModal = ({
  open,
  handleCloseDeleteModal,
  deleteContact,
  contact,
}) => {
  const handleDeleteAction = () => {
    deleteContact(contact[0]);
    handleCloseDeleteModal();
  };
  const [selectedContact, setSelectedContact] = useState({});
  useEffect(() => {
    setSelectedContact(contact[0]);
  }, [contact]);
  return (
    <BasicModal
      title="Delete Contact"
      isOpen={open}
      handleClose={handleCloseDeleteModal}
      maxWidth={'sm'}
      footer={
        <div className={styles.footer}>
          <button
            type="button"
            className="secondary-button"
            onClick={handleCloseDeleteModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={handleDeleteAction}
          >
            Delete
          </button>
        </div>
      }
    >
      <div className={styles.content}>
        <p>
          Are you sure you want to delete contact{' '}
          <span className={styles.name}>{selectedContact?.name}</span>?
        </p>
      </div>
    </BasicModal>
  );
};

const mapDispatchToProps = state => ({
  open: state.dashboard.contactTool.deleteMode,
  contact: state.dashboard.contactTool.contact,
});

export default connect(mapDispatchToProps)(DeleteContactModal);
