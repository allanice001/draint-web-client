import {
  ARTWORK,
  IMAGE_FIELD,
  UPDATE_SLIDE_BTN,
  USE_ARTWORK,
  USE_ARTWORK_LABEL,
} from 'constants/components/forms';
import { Field, reduxForm } from 'redux-form';
import React, { useMemo, useState } from 'react';
import Checkbox from 'components/reduxForm/checkbox/checkbox';
import { Primary } from 'components/shared/button';
import cx from 'classnames';
import { getFields } from 'constants/components/homepage';
import styles from './homepage.module.scss';

const EditSlideForm = ({ invalid, handleSubmit, editArtwork }) => {
  const [isArtwork, setIsArtwork] = useState(editArtwork);

  const form = useMemo(() => {
    const fieldList = getFields(isArtwork ? ARTWORK : null);

    return fieldList.map(field => (
      <Field
        className={cx({ [styles.image]: field.name === IMAGE_FIELD })}
        key={field.name}
        component={field.component}
        label={field.label}
        name={field.name}
        list={field.list && field.list}
        placeholder={field.placeholder}
        maxLength={field.maxLength}
        validate={field.validate}
      />
    ));
  }, [isArtwork]);

  return (
    <form className={styles.editForm} onSubmit={handleSubmit}>
      <Checkbox
        onChange={() => setIsArtwork(!isArtwork)}
        value={isArtwork}
        name={USE_ARTWORK}
        label={USE_ARTWORK_LABEL}
      />

      {form}

      <div className={styles.updateSubmit}>
        <Primary type="submit" disabled={invalid}>
          {UPDATE_SLIDE_BTN}
        </Primary>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'updateHomepageSlider',
  enableReinitialize: true,
  destroyOnUnmount: true,
})(EditSlideForm);
