import {
  createQuestionActions,
  deleteQuestionActions,
  editQuestionActions,
  getProfilesDataActions,
  getQuestionsActions,
  setMyVitaFilter,
} from 'redux/master/actions/vitaActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { MASTER_VITA_PAGE } from '../constants/components/master/local-storage-names';
import { getDataFromStorage } from '../services/local-storage-service';

export const useMasterVita = () => {
  const { faqForm } = useSelector(store => store.form);
  const dispatch = useDispatch();
  const vitaStorage = getDataFromStorage(MASTER_VITA_PAGE);
  const [page, setPage] = useState(vitaStorage?.page || 1);
  const [editMode, setEditMode] = useState(false);
  const [isDialogModal, setDialogModal] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [questionId, setQuestionId] = useState(false);
  const { profiles, pagination, questions, filter, loading } = useSelector(
    store => store.master.vita
  );
  const { account: user } = useSelector(state => state.user);

  const isSuperAdmin = user?.permission === 'master';
  const isAnalyst = user?.new_permission === 'analyst' && !isSuperAdmin;

  const title = faqForm?.values?.question;

  useEffect(() => {
    dispatch(
      getProfilesDataActions({
        page: page,
        pageSize: pagination?.pageSize,
        filter,
      })
    );
  }, [dispatch, page, filter, pagination?.pageSize]);

  useEffect(() => {
    dispatch(getQuestionsActions());
  }, [dispatch]);

  useEffect(() => {
    if (!profiles?.length && pagination?.page > 1) {
      setPage(pagination?.page - 1);
    }
  }, [profiles?.length, pagination?.page]);

  const onCreate = () => {
    setCreateMode(true);
    setEditMode(false);
  };

  const onAcceptCreate = () => {
    if (createMode) {
      dispatch(createQuestionActions(title));
    }

    setCreateMode(false);
  };

  const onDeclineCreate = () => {
    setCreateMode(false);
  };

  const onDeleteClick = id => {
    setDialogModal(true);
    setQuestionId(id);
  };

  const onAcceptDelete = () => {
    dispatch(deleteQuestionActions(questionId));
    setDialogModal(false);
  };

  const onDeclineDelete = () => {
    setDialogModal(false);
  };

  const onAcceptEdit = () => {
    dispatch(editQuestionActions(questionId, title));
    setEditMode(false);
  };

  const onDeclineEdit = () => {
    setEditMode(false);
  };

  const onEditClick = id => {
    setEditMode(id);
    setQuestionId(id);
    setCreateMode(false);
  };

  const handleVerificationFilterChange = async event => {
    const filter = event.target.value;
    setPage(1);
    dispatch(setMyVitaFilter(filter));
  };

  return {
    setPage,
    page,
    pagination,
    profiles,
    questions,
    editMode,
    isDialogModal,
    createMode,
    filter,
    loading,
    onCreate,
    onAcceptCreate,
    onAcceptDelete,
    onDeclineCreate,
    onDeleteClick,
    onDeclineDelete,
    onEditClick,
    onAcceptEdit,
    onDeclineEdit,
    isAnalyst,
    handleVerificationFilterChange,
  };
};
