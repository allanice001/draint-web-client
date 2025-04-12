import * as Button from 'components/shared/button';

import { List, Record } from 'components/shared/list';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import FaqForm from 'components/faq-page/faqForm/faq-form';
import React from 'react';
import { required } from 'components/reduxForm/validators';
import styles from './interviewQuestionList.module.scss';

export const InterviewQuestionList = props => {
  const {
    data,
    editMode,
    onEditClick,
    onCancelFormClick,
    onAcceptFormClick,
    onDelete,
    onCreate,
    createMode,
    submitTitle = 'Add Question',
  } = props;

  return (
    <div className={styles.wrapper}>
      <List>
        {!createMode && (
          <Button.Primary sm className={styles.submit} onClick={onCreate}>
            {submitTitle}
          </Button.Primary>
        )}
        {data.map(el => {
          if (el.id === editMode) {
            return (
              <Record key={el.id} className={styles.row}>
                <FaqForm
                  name="question"
                  initialValues={{ question: el.title }}
                  onCancelEditClick={onCancelFormClick}
                  onAcceptClick={onAcceptFormClick}
                  validate={required}
                />
              </Record>
            );
          }

          return (
            <Record key={el.id} className={styles.row}>
              <span className={styles.title}>{el.title}</span>
              <Button.Warning
                xs
                onClick={() => onEditClick(el.id)}
                icon={<EditIcon />}
              />
              <Button.Danger
                xs
                onClick={() => onDelete(el.id)}
                icon={<DeleteForeverIcon />}
              />
            </Record>
          );
        })}
        {createMode && (
          <Record className={styles.row}>
            <FaqForm
              className={styles.form}
              initialValues={{ question: '' }}
              name="question"
              onCancelEditClick={onCancelFormClick}
              onAcceptClick={onAcceptFormClick}
              validate={required}
            />
          </Record>
        )}
      </List>
    </div>
  );
};
