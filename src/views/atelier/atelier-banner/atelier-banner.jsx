import { Field, isPristine } from 'redux-form';
import React, { useMemo } from 'react';

import { AtelierFormError } from '../atelier-form-error';
import { FormButton } from 'components/shared/form-button/form-button';
import { Image } from 'components/reduxForm/image/image';
import Textarea from 'components/reduxForm/textarea/textarea';
import { atelierFormFields } from 'constants/atelier/atelier-form-fields';
import styles from './atelier-banner.module.scss';
import { useSelector } from 'react-redux';
import { validationValues } from 'constants/components/atelier';

export const AtelierBanner = ({
  content,
  isEditMode,
  setEditMode,
  onSubmit,
  form,
  isOwner,
  defaultImage,
  canEdit,
  isError,
}) => {
  const { small_image: image, title } = content || {};
  const isFormPristine = useSelector(isPristine(form));

  const Form = () => {
    return (
      <form id={form} onSubmit={onSubmit} className={styles.form}>
        <Field component={Image} name="image" isAtelier />

        <Field
          component={Textarea}
          name={atelierFormFields.LEAD}
          rows="3"
          maxLength={validationValues.bannerMaxLength}
        />
      </form>
    );
  };

  const Preview = () => {
    return (
      <div className={styles.preview}>
        <img className={styles.image} srcSet={image || defaultImage} alt="" />

        <h2 className={styles.title}>{title}</h2>
      </div>
    );
  };

  const contentView = useMemo(() => (isEditMode ? <Form /> : <Preview />), [
    isEditMode,
  ]);

  if (!isOwner && !image && !title) {
    return null;
  }

  return (
    <div className={styles.root}>
      {isOwner && canEdit && (
        <div className={styles.header}>
          <FormButton
            form={form}
            isEdit={isEditMode}
            onEdit={() => setEditMode(true)}
            disabled={isError || isFormPristine}
          />
          {isError && <AtelierFormError />}
        </div>
      )}

      {contentView}
    </div>
  );
};
