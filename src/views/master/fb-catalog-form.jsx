import { Field, reduxForm } from 'redux-form';
import {
  length,
  length3,
  maxWeight,
  number,
  numberOfDimensions,
  required,
  weight30,
} from 'components/reduxForm/validators';

import Input from 'components/reduxForm/input/input';
import React from 'react';
import SelectField from 'components/reduxForm/select/select';
import Textarea from 'components/reduxForm/textarea/textarea';
import styles from './artists-features.module.scss';
import useCountryList from 'hooks/use-country-list';

const FBCatalogForm = reduxForm({
  form: 'catalog',
  enableReinitialize: true,
  destroyOnUnmount: false,
})(props => {
  const countries = useCountryList();

  return (
    <form className={styles.form}>
      <Field
        name="title"
        component={Input}
        validate={[required]}
        label="title"
        maxLength={50}
      />
      <Field
        name="description"
        component={Textarea}
        validate={[required]}
        label="description"
        maxLength={300}
      />
      <div style={{ marginBottom: '15px' }}>
        <Field
          name="country"
          label="country"
          placeholder="Country"
          component={SelectField}
          list={countries}
          single
          validate={[required]}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <Field
          name="availability"
          label="availability"
          component={SelectField}
          validate={[required]}
          list={props.availabilities}
        />
      </div>
      <Field
        name="inventory"
        label="inventory"
        component={Input}
        validate={[required, number]}
      />
      <div style={{ marginBottom: '15px' }}>
        <Field
          name="condition"
          label="condition"
          component={SelectField}
          validate={[required]}
          list={props.productConditions}
        />
      </div>
      <Field
        name="brand"
        component={Input}
        validate={[required]}
        label="brand"
        maxLength={50}
      />
      <Field
        name="width"
        component={Input}
        validate={[required, numberOfDimensions, length3]}
        label="width"
      />
      <Field
        name="height"
        component={Input}
        validate={[required, numberOfDimensions, length3]}
        label="height"
      />
      <Field
        name="thickness"
        component={Input}
        validate={[required, numberOfDimensions, length3]}
        label="thickness"
      />
      <Field
        name="weight"
        component={Input}
        validate={[
          required,
          numberOfDimensions,
          length,
          weight30,
          maxWeight,
        ]}
        label="weight"
      />
    </form>
  );
});

export default FBCatalogForm;
