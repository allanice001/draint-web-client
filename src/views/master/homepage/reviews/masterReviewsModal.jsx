import DefaultModal from 'components/basic-modal/basic-modal';
import React from 'react';
import ReviewsForm from './masterReviewsForm';

export default function MasterReviewsModal(props) {
  const {
    open,
    handleClose,
    handleCreate,
    handleEdit,
    editMode,
    form
  } = props;

  return (
    <DefaultModal
      isOpen={open}
      title={`Reviews ${editMode ? 'Update' : 'Create'} Mode`}
      maxWidth="xs"
      handleClose={handleClose}
      footer={''}
    >
      <ReviewsForm
        editMode={editMode}
        initialValues={form}
        handleCreate={handleCreate}
        handleSave={handleEdit}
      />
    </DefaultModal>
  );
}
