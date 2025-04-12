import * as Button from 'components/shared/button';

import React, { useCallback } from 'react';

import Collapse from '@material-ui/core/Collapse';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FaqForm from '../faqForm/faq-form';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { NavLink } from 'react-router-dom';
import { deleteSpacesFromUrl } from 'services/global';
import { length255 } from 'components/reduxForm/validators';
import { useStyles } from './questionsListStyles';
import useTheme from 'hooks/use-theme';

export const QuestionsList = props => {
  const {
    isEditorOrAdmin,
    data,
    onTopicClick,
    targetTopic,
    onQuestionClick,
    masterView,
    editMode,
    onEditTopicClick,
    onCancelFormClick,
    onAcceptFormClick,
    onDeleteTopicClick,
    onCreateClick,
    createMode,
    displayClass,
    route,
    category,
  } = props;

  const classes = useStyles();
  const { isMobile } = useTheme();

  const icon = useCallback(
    id => {
      if (isMobile) {
        return null;
      }

      return targetTopic?.id === id ? <ExpandLess /> : <ExpandMore />;
    },
    [targetTopic, isMobile]
  );

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={displayClass || classes.root}
    >
      {isMobile && category && <h3 className={classes.group}>{category}</h3>}
      {createMode !== 'topic' ? (
        !!masterView &&
        isEditorOrAdmin && (
          <Button.Primary
            className={classes.create}
            onClick={() => onCreateClick('topic')}
            sm
          >
            Create Topic
          </Button.Primary>
        )
      ) : (
        <FaqForm
          name="topic"
          onCancelEditClick={onCancelFormClick}
          onAcceptClick={onAcceptFormClick}
          className={classes.form}
          validate={length255}
          placeholder="Create topic"
        />
      )}
      <div>
        {data.map(item => (
          <div key={item.id} className={classes.questionsContainer}>
            <NavLink
              to={
                !masterView &&
                `/faq/${route}/${deleteSpacesFromUrl(item.title)}`
              }
              exact
            >
              <ListItem
                className={classes.faqItem}
                onClick={
                  !editMode &&
                  (() => {
                    onTopicClick(item);
                  })
                }
              >
                {editMode === item.id ? (
                  <FaqForm
                    name="topic"
                    initialValues={{ topic: item.title }}
                    onCancelEditClick={onCancelFormClick}
                    onAcceptClick={onAcceptFormClick}
                    validate={length255}
                  />
                ) : (
                  <>
                    <h4 className={classes.faqTitle}>{item.title}</h4>
                    {masterView && editMode !== item.id && isEditorOrAdmin ? (
                      <div className={classes.actions}>
                        <Button.Warning
                          xs
                          icon={<EditIcon />}
                          onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();
                            onEditTopicClick(item.id);
                          }}
                        />
                        <Button.Danger
                          xs
                          icon={<DeleteForeverIcon />}
                          onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();
                            onDeleteTopicClick(item);
                          }}
                        />
                      </div>
                    ) : null}
                    {icon(item.id)}
                  </>
                )}
              </ListItem>
            </NavLink>
            {item.id !== editMode ? (
              <Collapse
                in={targetTopic?.id === item.id ? !!targetTopic : false}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ul className={classes.topicList}>
                    {item.questions.map(question => (
                      <li
                        key={question.id}
                        className={classes.topic}
                        onClick={() => onQuestionClick(question)}
                      >
                        <NavLink
                          to={
                            !masterView &&
                            `/faq/${route}/${deleteSpacesFromUrl(
                              item.title
                            )}/${deleteSpacesFromUrl(question.title)}`
                          }
                          exact
                        >
                          {question.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </List>
              </Collapse>
            ) : null}
          </div>
        ))}
      </div>
    </List>
  );
};
