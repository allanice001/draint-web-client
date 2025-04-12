import * as Button from 'components/shared/button';

import { collapsedHeight, useStyles } from './answersListStyles';
import { length255, length50000 } from 'components/reduxForm/validators';

import Collapse from '@material-ui/core/Collapse';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FaqForm from '../faqForm/faq-form';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import classnames from 'classnames';
import styles from './answerList.module.scss';

export const AnswersList = props => {
  const {
    isEditorOrAdmin,
    topic,
    onAnswerClick,
    targetQuestion,
    masterView,
    editMode,
    onEditAnswerClick,
    onCancelFormClick,
    onAcceptFormClick,
    data,
    onDeleteQuestionClick,
    isMobile,
    createMode,
    onCreateClick,
    targetTopic,
  } = props;

  const classes = useStyles();

  const dynamicClass = (fistStyle, secondStyle, id) =>
    classnames(fistStyle, { [secondStyle]: targetQuestion?.id === id });

  return (
    <div className={classnames(classes.root, styles.content)}>
      <div className={classes.container}>
        {!isMobile && <span className={classes.topicTitle}>{topic}</span>}
        {isMobile && topic && <h3 className={classes.group}>{topic}</h3>}
        {targetTopic ? (
          <>
            {createMode !== 'question' ? (
              !!masterView &&
              isEditorOrAdmin && (
                <Button.Primary
                  className={classes.create}
                  onClick={() => onCreateClick('question')}
                  sm
                >
                  Create Question
                </Button.Primary>
              )
            ) : (
              <FaqForm
                name="question"
                secondName="content"
                area={true}
                placeholder="Create question"
                onCancelEditClick={onCancelFormClick}
                onAcceptClick={onAcceptFormClick}
                className={classes.form}
                fieldClass={classes.formInput}
                firstFieldValidate={length255}
                secondFieldValidate={length50000}
                maxLength={50000}
              />
            )}
          </>
        ) : null}
        {data ? (
          <ul>
            {data.map(item => (
              <li
                key={item.id}
                className={classnames(
                  dynamicClass(classes.row, styles.active, item.id),
                  styles.element
                )}
                id={item.id}
                onClick={!masterView ? () => onAnswerClick(item) : null}
              >
                {editMode === item.id ? (
                  <div className={classes.formContainer}>
                    <FaqForm
                      name="question"
                      initialValues={{
                        question: item.title,
                        content: item.content,
                      }}
                      secondName="content"
                      secondType="text"
                      area={true}
                      className={classes.form}
                      fieldClass={classes.formInput}
                      onCancelEditClick={onCancelFormClick}
                      onAcceptClick={onAcceptFormClick}
                      firstFieldValidate={length255}
                      secondFieldValidate={length50000}
                      maxLength={50000}
                    />
                  </div>
                ) : (
                  <>
                    {masterView && isEditorOrAdmin ? (
                      <div className={classes.actions}>
                        <Button.Warning
                          xs
                          icon={<EditIcon />}
                          onClick={() => onEditAnswerClick(item.id)}
                        />
                        <Button.Danger
                          xs
                          icon={<DeleteForeverIcon />}
                          onClick={() => onDeleteQuestionClick(item.id)}
                        />
                      </div>
                    ) : null}
                    <div onClick={() => onAnswerClick(item)}>
                      <div className={classes.titleContainer}>
                        <span
                          className={dynamicClass(
                            classes.questionTitle,
                            classes.questionTitleActive,
                            item.id
                          )}
                        >
                          {item.title}
                        </span>
                        {targetQuestion?.id === item.id ? (
                          <ExpandLess
                            className={dynamicClass(
                              classes.iconContainer,
                              classes.iconContainerActive,
                              item.id
                            )}
                            stroke={
                              targetQuestion?.id !== item.id ? null : '#806BFF'
                            }
                            strokeWidth={1.5}
                          />
                        ) : (
                          <ExpandMore
                            className={dynamicClass(
                              classes.iconContainer,
                              classes.iconContainerActive,
                              item.id
                            )}
                          />
                        )}
                      </div>
                      <div className={classes.flexContainer}>
                        <Collapse
                          in={targetQuestion?.id === item.id}
                          collapsedHeight={collapsedHeight}
                        >
                          <Paper elevation={4} className={classes.paper}>
                            <span
                              className={
                                targetQuestion?.id === item.id
                                  ? classes.questionContent
                                  : classes.cutContent
                              }
                            >
                              {item.content}
                            </span>
                          </Paper>
                        </Collapse>
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};
