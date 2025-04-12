import {
  FROM_FIELD,
  GENERAL_PLACEHOLDER,
  INFO_FIELD,
  LINK_FIELD,
  MAX_YEAR,
  MIN_YEAR,
  URL_PLACEHOLDER,
  YEAR_PLACEHOLDER
} from 'constants/components/my-vita';
import { Field, reduxForm } from 'redux-form';
import { required, year } from 'components/reduxForm/validators';
import Icons from 'components/icons';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import styles from 'components/artist/artist-about-me/artist-about-me.module.scss';
import { types } from 'components/artist/artist-about-me/artist-about-me.config';
import { useSelector } from 'react-redux';

const PublicationForm = reduxForm({
  form: types.publications,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(({ saveNewField, type, invalid, form: formName }) => {
  const { values = {} } = useSelector(state => state.form[formName]);

  return (
    <form>
      <Field
        component={Input}
        label={false}
        name={FROM_FIELD}
        type="number"
        inputClassName={`${styles.input} ${styles.date}`}
        placeholder={YEAR_PLACEHOLDER}
        validate={[year, required]}
        min={MIN_YEAR}
        max={MAX_YEAR}
      />
      <div className={styles.input_wrap}>
        <Field
          component={Input}
          label={false}
          name={INFO_FIELD}
          placeholder={GENERAL_PLACEHOLDER}
          inputClassName={styles.input}
          validate={[required]}
        />
      </div>

      <div className={styles.flex_wrap}>
        <Field
          component={Input}
          label={false}
          name={LINK_FIELD}
          placeholder={URL_PLACEHOLDER}
          inputClassName={styles.input}
          validate={[required]}
        />
        <button
          type="button"
          className={styles.button_small}
          disabled={invalid}
          onClick={() => saveNewField(type, values)}
        >
          <Icons.Check width={12} />
        </button>
      </div>
    </form>
  );
});

export default PublicationForm;
