import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlertDialogDelete from 'components/alertDialog/alertDialogDelete';
import { CREATE_REVIEW_BUTTON } from 'constants/master-reviews';
import { MODAL_REVIEWS_CONTENT } from 'constants/components/modals';
import MasterReviewCard from './masterReviewCard';

import MasterReviewsModal from './masterReviewsModal';
import { getReviews } from 'redux/master/actions/master-reviews-actions';
import styles from './reviews.module.scss';
import { useMasterReviews } from 'hooks/use-master-reviews';

export const MasterReviews = () => {
  const dispatch = useDispatch();
  const {
    isAnalyst,
    isOpenModal,
    isDeleteModal,
    initialForm,
    editMode,
    handleOpenModal,
    handleCloseModal,
    handleOpenDeleteModal,
    handleCreate,
    onAcceptDelete,
    onDeclineDelete,
    handleUpdate,
    handleSave,
  } = useMasterReviews();

  const { reviews } = useSelector(store => store.master.reviews);

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  return (
    <div>
      <MasterReviewsModal
        open={isOpenModal}
        editMode={editMode}
        handleClose={handleCloseModal}
        handleCreate={handleCreate}
        handleEdit={handleSave}
        form={initialForm}
      />
      <AlertDialogDelete
        openDialog={isDeleteModal}
        dialogSettings={MODAL_REVIEWS_CONTENT}
        handleDialog={onDeclineDelete}
        deleteBackground={onAcceptDelete}
      />
      <div>
        <button
          disabled={isAnalyst}
          type="button"
          className="primary-button"
          onClick={handleOpenModal}
        >
          {CREATE_REVIEW_BUTTON}
        </button>
      </div>
      <div className={styles.reviews_wrapper}>
        {reviews.map(review => (
          <MasterReviewCard
            review={review}
            isAnalyst={isAnalyst}
            handleDelete={handleOpenDeleteModal}
            handleEdit={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};
