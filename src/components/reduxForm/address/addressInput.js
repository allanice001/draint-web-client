import {
  ADDRESS_SHIPPING_TEMPLATE_FORM,
  ADDRESS_UPDATE_FORM,
} from 'constants/components/forms';
import { Field, reduxForm } from 'redux-form';
import { email, latinic, required } from '../validators';

import { Button } from '@material-ui/core';
import Input from '../input/input';
import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { connect } from 'react-redux';
import styles from './addressInput.module.scss';

let AddressInputForm = props => {
  const { valid, handleSubmit, isStandard, disabled = false } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.column}>
        <div className={styles.row}>
          <Field
            name="first_name"
            component={Input}
            validate={[required, latinic]}
            label="First name"
            disabled={disabled}
          />
          <Field
            name="last_name"
            component={Input}
            validate={[required, latinic]}
            label="Last name"
            disabled={disabled}
          />
        </div>
        <div className={styles.row}>
          <Field
            name="country"
            component={Input}
            validate={[required, latinic]}
            label="Country"
            disabled={disabled}
          />
          <Field
            name="state"
            component={Input}
            validate={[required, latinic]}
            label="State"
            disabled={disabled}
          />
        </div>
        <div className={styles.row}>
          <Field
            name="city"
            component={Input}
            validate={[required, latinic]}
            label="City"
            disabled={disabled}
          />
          <Field
            name="zipcode"
            component={Input}
            validate={[required, latinic]}
            label="Postal Code"
            disabled={disabled}
          />
        </div>
        <div className={styles.row}>
          <Field
            name="addressLine1"
            component={Input}
            validate={[required, latinic]}
            label="Address Line 1"
            disabled={disabled}
          />
          <Field
            name="addressLine2"
            component={Input}
            validate={[latinic]}
            label="Address Line 2"
            disabled={disabled}
          />
        </div>
        <div className={styles.row}>
          <Field
            name="email"
            component={Input}
            validate={[required, latinic, email]}
            label="Email"
            disabled={disabled}
          />
        </div>
      </div>

      {isStandard && (
        <Button
          fullWidth
          disabled={!valid}
          type="submit"
          variant="contained"
          color="primary"
        >
          Save Artwork Data
          <SaveIcon />
        </Button>
      )}
    </form>
  );
};

AddressInputForm = reduxForm({
  form: ADDRESS_UPDATE_FORM,
  destroyOnUnmount: false,
})(AddressInputForm);

function mapStateToProps(store, props) {
  if (props.form?.includes(ADDRESS_SHIPPING_TEMPLATE_FORM)) {
    return {
      enableReinitialize: true,

      initialValues: {
        first_name: store.user.account.first_name,
        last_name: store.user.account.last_name,
        email: store.user.account.email,
        ...store.checkout.data.address,
      },
    };
  }

  if (store.artwork.artworkData.currentArtwork && store.user.account.token) {
    return {
      enableReinitialize: true,

      initialValues: {
        first_name: store.user.account.first_name,
        last_name: store.user.account.last_name,
        email: store.user.account.email,
        ...store.user.account.location.address,
      },
    };
  }

  return {};
}

export default AddressInputForm = connect(mapStateToProps)(AddressInputForm);
