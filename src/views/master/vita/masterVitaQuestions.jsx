import AlertDialogDelete from 'components/alertDialog/alertDialogDelete';
import { InterviewQuestionList } from './interviewQuestionList';
import { MODAL_QUESTION_CONTENT } from 'constants/components/faq-page';
import { MasterMyVitaNav } from 'components/nav/sub/myVita';
import React from 'react';
import styles from '../master-vita.module.scss';
import { useMasterVita } from 'hooks/use-master-vita';

export const MyVitaQuestions = () => {
  const {
    createMode,
    editMode,
    questions,
    isDialogModal,
    onDeclineCreate,
    onDeclineDelete,
    onAcceptCreate,
    onCreate,
    onDeclineEdit,
    onEditClick,
    onAcceptDelete,
    onDeleteClick,
    onAcceptEdit,
  } = useMasterVita();

  return (
    <>
      <MasterMyVitaNav />
      <div className={styles.wrapper}>
        <div className={styles.filters_container}>
          <AlertDialogDelete
            openDialog={isDialogModal}
            dialogSettings={MODAL_QUESTION_CONTENT}
            handleDialog={onDeclineDelete}
            deleteBackground={onAcceptDelete}
          />
          <InterviewQuestionList
            data={questions}
            createMode={createMode}
            editMode={editMode}
            onDelete={onDeleteClick}
            displayClass={styles.root}
            onCreate={onCreate}
            onEditClick={onEditClick}
            onCancelFormClick={createMode ? onDeclineCreate : onDeclineEdit}
            onAcceptFormClick={createMode ? onAcceptCreate : onAcceptEdit}
          />
        </div>
      </div>
    </>
  );
};
