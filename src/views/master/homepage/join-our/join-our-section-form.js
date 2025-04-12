import {
  CREATE_SECTIONS_BTN,
  GENERATE_SECTIONS_FORM_TITLE,
  IMAGE_FIELD,
  USE_ARTWORK,
  USE_ARTWORK_LABEL,
} from 'constants/components/forms';
import { Card, CardContent } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import React, { useMemo } from 'react';
import Checkbox from 'components/reduxForm/checkbox/checkbox';
import { Primary } from 'components/shared/button';
import { Role } from 'constants/role';
import cx from 'classnames';
import { getSectionsFields } from 'constants/components/homepage';
import styles from '../homepage.module.scss';
import { useSelector } from 'react-redux';

export const JoinOurForm = reduxForm({
  form: 'homepageJoinOurForm',
  enableReinitialize: false,
  destroyOnUnmount: true,
  initialValues: {
    use_artwork: true,
    show_for_role: Role.userRoleList[0].label,
  },
})(({ handleCreate, invalid, form: formName }) => {
  const { values = {} } = useSelector(state => state.form[formName]);

  const form = useMemo(() => {
    const fieldList = getSectionsFields(values.use_artwork);

    return fieldList.map((field, index) => (
      <Field
        className={cx({ [styles.image]: field.name === IMAGE_FIELD })}
        key={field.name}
        component={field.component}
        label={field.label}
        list={field.list && field.list}
        name={field.name}
        placeholder={field.placeholder}
        maxLength={field.maxLength}
        validate={field.validate}
      />
    ));
  }, [values.use_artwork]);

  return (
    <Card>
      <CardContent>
        <h2 className={styles.form_title}>{GENERATE_SECTIONS_FORM_TITLE}</h2>

        <form className={styles.form}>
          <Field
            component={Checkbox}
            name={USE_ARTWORK}
            label={USE_ARTWORK_LABEL}
          />

          {form}

          <Primary
            className={styles.submit}
            type="button"
            onClick={handleCreate}
            disabled={invalid}
          >
            {CREATE_SECTIONS_BTN}
          </Primary>
        </form>
      </CardContent>
    </Card>
  );
});
