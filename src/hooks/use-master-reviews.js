import {
  createReview,
  removeReview,
  updateReview,
} from 'redux/master/actions/master-reviews-actions';
import { useDispatch, useSelector } from 'react-redux';
import { MAX_NUMBER_NOTIFICATION } from 'constants/master-reviews';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { permissions } from 'constants/permissions';
import { useState } from 'react';

export const useMasterReviews = () => {
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [editMode, setEdit] = useState(false);
  const [reviewId, setReviewId] = useState(false);
  const [initialForm, setInitialForm] = useState({
    id: '',
    name: '',
    points: '',
    message: '',
    country: '',
  });

  const { account: user } = useSelector(state => state.user);

  const isAnalyst = user?.new_permission === permissions.ANALYST;
  const { reviews } = useSelector(store => store.master.reviews);

  const maxReviews = reviews.length >= 3;

  const resetForm = () => {
    setInitialForm({
      id: '',
      name: '',
      points: '',
      message: '',
      country: '',
    });
  };

  const handleCloseModal = () => {
    setIsOpenModal(!isOpenModal);
    resetForm();
  };

  const handleOpenDeleteModal = id => {
    setDeleteModal(!isDeleteModal);
    setReviewId(id);
  };

  const onAcceptDelete = () => {
    dispatch(removeReview(reviewId));
    setDeleteModal(!isDeleteModal);
  };

  const onDeclineDelete = () => {
    setDeleteModal(!isDeleteModal);
  };

  const handleUpdate = form => {
    setInitialForm(form);
    setIsOpenModal(!isOpenModal);
    setEdit(true);
  };

  const handleSave = form => {
    setIsOpenModal(!isOpenModal);
    dispatch(updateReview(form));
  };

  const handleOpenModal = () => {
    if (!maxReviews) {
      setIsOpenModal(!isOpenModal);
      setEdit(false);
    } else {
      dispatch(displayMessage(MAX_NUMBER_NOTIFICATION));
    }
  };

  const handleCreate = form => {
    dispatch(createReview(form));
    setIsOpenModal(!isOpenModal);
  };

  return {
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
    handleUpdate,
    handleSave,
    onDeclineDelete,
  };
};
