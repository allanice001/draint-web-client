import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createOption,
  deleteOption,
  getFeedbackOptions,
  updateOption,
} from 'redux/master/actions/feedbackActions';
import { useDispatch, useSelector } from 'react-redux';

import AlertDialogDelete from 'components/alertDialog/alertDialogDelete';
import { InterviewQuestionList } from './vita/interviewQuestionList';
import { MasterFeedbackNav } from 'components/nav/sub/masterFeedback';
import { Spinner } from 'components/lib';
import styles from './feedback.module.scss';

const MasterFeedbackOptions = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [createMode, setCreateMode] = useState();
  const [editMode, setEditMode] = useState();
  const [deleteId, setDeleteId] = useState();

  const dispatch = useDispatch();

  const { account: user } = useSelector(state => state.user);

  const { options, optionsLoading, form } = useSelector(store => {
    const { options, optionsLoading } = store.master.feedback;
    const form = store.form.faqForm;

    return {
      options,
      optionsLoading,
      form,
    };
  });

  const isSuperAdmin = user?.permission === 'master';
  const isAnalyst = user?.new_permission === 'analyst' && !isSuperAdmin;

  useEffect(() => {
    if (dispatch) {
      dispatch(getFeedbackOptions());
    }
  }, [dispatch]);

  const handleDelete = useCallback(() => {
    if (deleteId) {
      dispatch(deleteOption(deleteId, options));
      setCreateMode(false);
      setEditMode(null);
      setDeleteId(null);
    }
  }, [dispatch, options, deleteId]);

  const onEditClick = useCallback(id => {
    setCreateMode(false);
    setEditMode(id);
  }, []);

  const onCreate = useCallback(id => {
    setCreateMode(true);
    setEditMode(null);
  }, []);

  const onCancel = useCallback(() => {
    setEditMode(null);
    setCreateMode(false);
  }, []);

  const create = useCallback(() => {
    const text = form.values.question;

    dispatch(createOption(text, options));
    setCreateMode(false);
  }, [form, dispatch, options]);

  const update = useCallback(() => {
    const text = form.values.question;

    dispatch(updateOption(editMode, text, options));
    setEditMode(null);
  }, [dispatch, editMode, options, form]);

  const onDelete = useCallback(id => {
    setIsOpenDialog(true);
    setDeleteId(id);
  }, []);

  const content = useMemo(() => {
    if (optionsLoading) {
      return <Spinner full />;
    }

    const list = options.map(el => {
      return {
        ...el,
        title: el.text,
      };
    });

    return (
      <InterviewQuestionList
        data={list}
        createMode={createMode}
        editMode={editMode}
        onDelete={onDelete}
        displayClass={styles.root}
        onCreate={onCreate}
        onEditClick={onEditClick}
        onCancelFormClick={onCancel}
        onAcceptFormClick={createMode ? create : update}
        submitTitle="Create new"
      />
    );
  }, [
    options,
    optionsLoading,
    create,
    createMode,
    editMode,
    onDelete,
    onCancel,
    onCreate,
    onEditClick,
    update,
  ]);

  return (
    <div className={styles.wrapper}>
      <AlertDialogDelete
        openDialog={isOpenDialog}
        dialogSettings={{
          titleDialog: 'The option will be deleted permanently',
          buttonConfirmValue: 'Delete',
          buttonRejectValue: 'Cancel',
          headerDialog: 'Do you really want to delete an option?',
        }}
        deleteBackground={() => {
          setIsOpenDialog(false);
          handleDelete();
        }}
        handleDialog={e => {
          setIsOpenDialog(false);
        }}
      />
      <MasterFeedbackNav />

      {!isAnalyst && content}
    </div>
  );
};

export default MasterFeedbackOptions;
