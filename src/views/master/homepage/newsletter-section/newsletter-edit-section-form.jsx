import { Field, reduxForm } from 'redux-form';
import {
  IMAGE_FIELD,
  UPDATE_SECTION_BTN,
  USE_ARTWORK,
  USE_ARTWORK_LABEL,
} from 'constants/components/forms';
import React, { useMemo } from 'react';
import Checkbox from 'components/reduxForm/checkbox/checkbox';
import { Primary } from 'components/shared/button';
import cx from 'classnames';
import { getNewsletterSectionsFields } from 'constants/components/homepage';
import styles from 'views/master/homepage/homepage.module.scss';
import { useSelector } from 'react-redux';

const EditSectionForm = ({ invalid, handleSubmit }) => {
  const { values = {} } = useSelector(
    state => state.form.updateNewsletterSections
  );

  const form = useMemo(() => {
    const fieldList = getNewsletterSectionsFields(values.use_artwork);

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
  }, [values.use_artwork]);

  return (
    <form className={styles.editForm} onSubmit={handleSubmit}>
      <Field
        component={Checkbox}
        name={USE_ARTWORK}
        label={USE_ARTWORK_LABEL}
      />

      {form}

      <div className={styles.updateSubmit}>
        <Primary type="submit" disabled={invalid}>
          {UPDATE_SECTION_BTN}
        </Primary>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'updateNewsletterSections',
  enableReinitialize: true,
  destroyOnUnmount: true,
})(EditSectionForm);
