import { Field, isPristine } from 'redux-form';
import React, { useMemo } from 'react';

import { AtelierFormError } from '../atelier-form-error';
import { Blockquote } from 'components/shared/blockquote/blockquote';
import { FormButton } from 'components/shared/form-button/form-button';
import { Image } from 'components/reduxForm/image/image';
import Textarea from 'components/reduxForm/textarea/textarea';
import { atelierFormFields } from 'constants/atelier/atelier-form-fields';
import { required } from 'components/reduxForm/validators';
import styles from './atelier-notes.module.scss';
import { useSelector } from 'react-redux';
import { validationValues } from 'constants/components/atelier';

export const AtelierNotes = ({
  content,
  isEditMode,
  setEditMode,
  onSubmit,
  form,
  isOwner,
  titles,
  defaultImage,
  canEdit,
  isError,
}) => {
  const isFormPristine = useSelector(isPristine(form));
  const {
    small_image: image,
    first_content: topContent,
    second_content: bottomContent,
    quote: blockquote,
  } = content || {};
  const { title, subtitle } = titles;

  const Form = () => {
    return (
      <form id={form} onSubmit={onSubmit} className={styles.row}>
        <div className={styles.dropzone}>
          <Field component={Image} name="image" isAtelier />
        </div>

        <div className={styles.content}>
          <Field
            component={Textarea}
            rows="3"
            name={atelierFormFields.TOP_CONTENT}
            maxLength={validationValues.contentMaxlength}
            validate={required}
          />
          <Blockquote>
            <Field
              component={Textarea}
              rows="3"
              name={atelierFormFields.BLOCKQUOTE}
              maxLength={validationValues.quoteMaxLength}
            />
          </Blockquote>
          <Field
            component={Textarea}
            rows="3"
            name={atelierFormFields.BOTTOM_CONTENT}
            maxLength={validationValues.contentMaxlength}
          />
        </div>
      </form>
    );
  };

  const Preview = () => {
    return (
      <div className={styles.row}>
        <img className={styles.image} src={image || defaultImage} alt="" />

        <div className={styles.content}>
          {!!topContent && <p>{topContent}</p>}
          {!!blockquote && <Blockquote>{blockquote}</Blockquote>}
          {!!bottomContent && <p>{bottomContent}</p>}
        </div>
      </div>
    );
  };

  const contentView = useMemo(() => (isEditMode ? <Form /> : <Preview />), [
    isEditMode,
  ]);

  if (!isOwner && !image && !topContent && !bottomContent && !blockquote) {
    return null;
  }

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.subtitle}>{subtitle}</h4>

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
    </section>
  );
};
