import {
  FAQ_PAGE_META_HELMET_SCRIPT,
  ICONS,
  MODAL_QUESTION_CONTENT,
  MODAL_TOPIC_CONTENT,
} from 'constants/components/faq-page';
import React, { useEffect, useState } from 'react';
import {
  createQuestion,
  createTopic,
  deleteQuestion,
  deleteTopic,
  editCategory,
  editQuestion,
  editTopicTitle,
  setAllCategories,
  setFaqData,
} from 'redux/faq/actions/faqActions';
import { useDispatch, useSelector } from 'react-redux';

import AlertDialogDelete from '../alertDialog/alertDialogDelete';
import { AnswersList } from './faqAnswers/answersList';
import { FaqRole } from './faqRole/faqRole';
import Helmet from 'components/helmet';
import { Navbar } from './navigation/navbar';
import { QuestionsList } from './faqQuestions/questionsList';
import { Spinner } from '../lib';
import cx from 'classnames';
import { pageScroll } from 'services/pageScroller';
import { roles } from 'helpers/get-role';
import styles from './faq-page.module.scss';
import { useParams } from 'react-router';
import useTheme from 'hooks/use-theme';

const FaqPage = props => {
  const [targetTopic, setTargetTopic] = useState(null);
  const [targetQuestion, setTargetQuestion] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isDialogModal, setDialogModal] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const { new_permission, permission } = useSelector(
    state => state.user.account
  );
  const role = roles({ new_permission, permission });

  const { masterView } = props;

  const { isMobile } = useTheme();

  const { category: faqCategory } = useParams();

  const { data, categories } = useSelector(store => store.faq);
  const { faqForm } = useSelector(store => store.form);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!targetQuestion?.id) {
      const elementHeight = document.getElementById(targetQuestion.id);
      elementHeight.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [targetQuestion]);

  useEffect(() => {
    pageScroll();
    dispatch(setAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isMobile) pageScroll();
  }, [faqCategory, isMobile, targetTopic]);

  useEffect(() => {
    if (faqCategory && categories) {
      if (!data) {
        const categoryId = categories.find(item => item.title === faqCategory)
          ?.id;
        categoryId && dispatch(setFaqData(categoryId));
      }
    }
  }, [categories, data, dispatch, faqCategory]);

  const onTopicClick = topic => {
    setTargetTopic(topic);
    setEditMode(false);

    if (topic.id === targetTopic?.id) {
      setTargetTopic({});
    }
  };

  const onEditTopicClick = id => {
    returnInitialStates();

    setEditMode(id);
  };

  const onAcceptEditClick = () => {
    dispatch(editTopicTitle({ id: editMode, title: faqForm.values?.topic }));

    returnInitialStates();
  };

  const onQuestionClick = item => {
    setTargetQuestion(item);

    if (item.id === targetQuestion?.id) {
      setTargetQuestion(null);
    }
  };

  const onCategoryMasterClick = category => {
    setActiveCategory(category);
    setTargetTopic(null);
    dispatch(setFaqData(category.id));

    returnInitialStates();
  };

  const onDeleteTopicClick = item => {
    setTargetTopic(item);
    setDialogModal(true);
  };

  const onAcceptDeleteTopicClick = () => {
    dispatch(deleteTopic(targetTopic.id));

    returnInitialStates();
  };

  const returnInitialStates = () => {
    setEditMode(false);
    setDialogModal(false);

    if (!targetQuestion) {
      setTargetTopic(false);
    }

    setTargetQuestion(null);
    setCreateMode(false);
  };

  const onEditCategoryClick = id => {
    returnInitialStates();

    setEditMode(id);
  };

  const onAcceptCategoryEdit = () => {
    dispatch(
      editCategory({
        id: editMode,
        title: faqForm.values?.category,
        description: faqForm.values?.description,
      })
    );

    returnInitialStates();
  };

  const onEditAnswerClick = id => {
    setEditMode(id);
  };

  const onCancelEditAnswerClick = () => {
    setEditMode(false);
  };

  const onAcceptCategoryEditClick = () => {
    dispatch(
      editQuestion({
        id: editMode,
        title: faqForm.values?.question,
        content: faqForm.values?.content,
      })
    );

    setEditMode(false);
  };

  const onDeleteQuestionClick = id => {
    setTargetQuestion(id);
    setDialogModal(true);
  };

  const onAcceptQuestionClick = () => {
    dispatch(deleteQuestion(targetQuestion, targetTopic?.id));

    setTargetQuestion(null);
    setDialogModal(false);
  };

  const onCreateClick = type => {
    setCreateMode(type);
  };

  const onAcceptCreateClick = () => {
    if (createMode === 'topic') {
      dispatch(
        createTopic({
          category: activeCategory.id,
          topic: faqForm.values?.topic,
        })
      );
    }

    if (createMode === 'question') {
      dispatch(
        createQuestion({
          topic: targetTopic?.id,
          question: faqForm.values?.question,
          content: faqForm.values?.content,
        })
      );
    }

    setCreateMode(false);
  };

  const onDeclineCreateClick = () => {
    setCreateMode(false);
  };

  if (!categories) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <>
        <Helmet script={FAQ_PAGE_META_HELMET_SCRIPT} />
        <div
          className={cx('container', {
            [styles.empty_role]: isMobile && (faqCategory || activeCategory),
          })}
        >
          <FaqRole
            isEditorOrAdmin={role.isEditorOrAdmin}
            categories={categories}
            icons={ICONS}
            faqCategory={faqCategory || activeCategory?.title}
            masterView={masterView}
            onCategoryMasterClick={onCategoryMasterClick}
            onEditCategoryClick={onEditCategoryClick}
            editMode={editMode}
            onCancelEditClick={returnInitialStates}
            onAcceptEditClick={onAcceptCategoryEdit}
          />
        </div>
        {(faqCategory || activeCategory) && categories.length ? (
          <>
            <Navbar
              category={faqCategory || activeCategory?.title}
              title={targetTopic?.title}
              isMobile={isMobile}
              onCategoryClick={isMobile && (() => returnInitialStates())}
              onFaqClick={isMobile && (() => setActiveCategory(null))}
              masterView={masterView}
            />
            <div className={styles.main}>
              <div className="container">
                <div className={styles.content}>
                  {isMobile && (
                    <>
                      <div className={styles.title_block}>
                        <span>How can we help you?</span>
                      </div>

                      <p className="subtitle-1">
                        {!!targetTopic ? 'Select Question' : 'Select topic'}
                      </p>
                    </>
                  )}
                  {data ? (
                    <>
                      <QuestionsList
                        isEditorOrAdmin={role.isEditorOrAdmin}
                        displayClass={
                          isMobile && targetTopic ? styles.empty_role : ''
                        }
                        category={activeCategory?.title}
                        targetTopic={targetTopic}
                        data={data.topics}
                        onTopicClick={onTopicClick}
                        onQuestionClick={onQuestionClick}
                        masterView={masterView}
                        editMode={editMode}
                        onEditTopicClick={onEditTopicClick}
                        onCancelFormClick={
                          createMode
                            ? onDeclineCreateClick
                            : returnInitialStates
                        }
                        onAcceptFormClick={
                          createMode ? onAcceptCreateClick : onAcceptEditClick
                        }
                        onDeleteTopicClick={onDeleteTopicClick}
                        createMode={createMode}
                        onCreateClick={onCreateClick}
                        route={faqCategory}
                      />
                      <AnswersList
                        isEditorOrAdmin={role.isEditorOrAdmin}
                        data={
                          data.topics.find(item => item.id === targetTopic?.id)
                            ?.questions
                        }
                        topic={targetTopic?.title}
                        onAnswerClick={onQuestionClick}
                        targetQuestion={targetQuestion}
                        masterView={masterView}
                        editMode={editMode}
                        onEditAnswerClick={onEditAnswerClick}
                        onAcceptFormClick={
                          createMode
                            ? onAcceptCreateClick
                            : onAcceptCategoryEditClick
                        }
                        onCancelFormClick={
                          createMode
                            ? onDeclineCreateClick
                            : onCancelEditAnswerClick
                        }
                        onDeleteQuestionClick={onDeleteQuestionClick}
                        isMobile={isMobile}
                        createMode={createMode}
                        onCreateClick={onCreateClick}
                        targetTopic={targetTopic}
                      />
                      <AlertDialogDelete
                        openDialog={isDialogModal}
                        dialogSettings={
                          !targetQuestion
                            ? MODAL_TOPIC_CONTENT
                            : MODAL_QUESTION_CONTENT
                        }
                        handleDialog={returnInitialStates}
                        deleteBackground={
                          !targetQuestion
                            ? onAcceptDeleteTopicClick
                            : onAcceptQuestionClick
                        }
                      />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    </div>
  );
};

export default FaqPage;
