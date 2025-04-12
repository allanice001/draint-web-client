import { Field, isPristine } from 'redux-form';
import { List, Record } from 'components/shared/list';
import React, { useMemo } from 'react';

import { AtelierFormError } from '../atelier-form-error';
import { FormButton } from 'components/shared/form-button/form-button';
import { Image } from 'components/reduxForm/image/image';
import Textarea from 'components/reduxForm/textarea/textarea';
import { atelierFormFields } from 'constants/atelier/atelier-form-fields';
import { imageSizes } from 'constants/media-query/image-sizes';
import { required } from 'components/reduxForm/validators';
import styles from './atelier-process.module.scss';
import { useSelector } from 'react-redux';
import { validationValues } from 'constants/components/atelier';

export const AtelierProcess = ({
  data = {},
  form,
  isEditMode,
  setEditMode,
  isOwner,
  onSubmit,
  questions,
  defaultImage,
  canEdit,
  isError,
}) => {
  const isFormPristine = useSelector(isPristine(form));
  const content = [
    {
      question: questions.process,
      answer: data?.first_content,
      key: atelierFormFields.PROCESS,
    },
    {
      question: questions.enjoy,
      answer: data?.second_content,
      key: atelierFormFields.ENJOY,
    },
  ];

  const Form = () => {
    return (
      <form id={form} onSubmit={onSubmit} className={styles.content}>
        <div className={styles.dropzone}>
          <Field component={Image} name="image" isAtelier />
        </div>

        <List className={styles.list}>
          {content.map(({ key }) => {
            return (
              <Record className={styles.group} key={key}>
                <h3 className={styles.question}>{questions[key]}</h3>

                <Field
                  component={Textarea}
                  rows="3"
                  name={key}
                  maxLength={validationValues.contentMaxlength}
                  validate={key === atelierFormFields.PROCESS && required}
                />
              </Record>
            );
          })}
        </List>
      </form>
    );
  };

  const Preview = () => {
    return (
      <div className={styles.content}>
        <img
          className={styles.image}
          srcSet={data?.small_image || defaultImage}
          sizes={imageSizes.ADAPTIVE}
          alt=""
        />

        <List className={styles.list}>
          {content
            .filter(({ question }) => !!question)
            .map(({ question, answer }) => {
              return (
                <Record className={styles.group} key={question}>
                  <h3 className={styles.question}>{question}</h3>

                  <p className={styles.answer}>{answer}</p>
                </Record>
              );
            })}
        </List>
      </div>
    );
  };

  const contentView = useMemo(() => {
    return isEditMode ? <Form /> : <Preview />;
  }, [isEditMode]);

  if (
    !isOwner &&
    !data?.video_link &&
    !content.some(({ answer }) => !!answer)
  ) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {isOwner && canEdit && (
          <>
            <FormButton
              form={form}
              className={styles.button}
              isEdit={isEditMode}
              onEdit={() => setEditMode()}
              disabled={isError || isFormPristine}
            />
            {isError && <AtelierFormError />}
          </>
        )}
      </div>

      {contentView}
    </div>
  );
};
