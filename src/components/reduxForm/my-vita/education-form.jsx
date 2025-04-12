import {
  EDUCATION_PLACEHOLDER,
  FROM_FIELD,
  FROM_PLACEHOLDER,
  INFO_FIELD,
  MAX_YEAR,
  MIN_YEAR,
  TO_FIELD,
  TO_PLACEHOLDER,
} from 'constants/components/my-vita';
import { Field, reduxForm } from 'redux-form';
import { required, year } from 'components/reduxForm/validators';
import Icons from 'components/icons';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import styles from 'components/artist/artist-about-me/artist-about-me.module.scss';
import { types } from 'components/artist/artist-about-me/artist-about-me.config';
import { useSelector } from 'react-redux';

const EducationForm = reduxForm({
  form: types.education,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(({ saveNewField, type, invalid, form: formName }) => {
  const { values = {} } = useSelector(state => state.form[formName]);
  const disabled = values && values?.from > values?.to;

  return (
    <form>
      <div className={styles.year_wrap}>
        <Field
          component={Input}
          label={false}
          name={FROM_FIELD}
          type="number"
          inputClassName={`${styles.input} ${styles.date}`}
          placeholder={FROM_PLACEHOLDER}
          validate={[year, required]}
          min={MIN_YEAR}
          max={MAX_YEAR}
        />
        <Field
          component={Input}
          label={false}
          name={TO_FIELD}
          type="number"
          inputClassName={`${styles.input} ${styles.date}`}
          placeholder={TO_PLACEHOLDER}
          validate={[year, required]}
          min={MIN_YEAR}
          max={MAX_YEAR}
        />
      </div>
      <div className={styles.flex_wrap}>
        <Field
          component={Input}
          label={false}
          name={INFO_FIELD}
          placeholder={EDUCATION_PLACEHOLDER}
          inputClassName={styles.input}
          validate={[required]}
        />

        <button
          type="button"
          className={styles.button_small}
          disabled={invalid || disabled}
          onClick={() => saveNewField(type, values)}
        >
          <Icons.Check width={12} />
        </button>
      </div>
    </form>
  );
});

export default EducationForm;
