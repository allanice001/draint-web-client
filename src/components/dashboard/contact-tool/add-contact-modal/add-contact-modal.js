import { Field, reduxForm, reset } from 'redux-form';
import { email, instagramUsernameValidator, phone, required } from 'components/reduxForm/validators';

import { ADD_CONTACT_FORM } from 'constants/components/forms';
import BasicModal from 'components/basic-modal/basic-modal';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import styles from './add-contact-modal.module.scss';
import { useDispatch } from 'react-redux';

function AddContactModal(props) {
  const { handleCloseModal, openModal, valid } = props;
  const dispatch = useDispatch();

  return (
    <BasicModal
      title="Add new contact"
      handleClose={() => {
        handleCloseModal();
        dispatch(reset(ADD_CONTACT_FORM))
      }}
      isOpen={openModal}
      footer={
        <button
          className={styles.add_button}
          type="submit"
          form="add-contact-form"
          disabled={!valid}
        >
          Add contact
        </button>
      }
    >
      <form onSubmit={props.handleSubmit} id="add-contact-form">
        <div className={styles.inputs_wrapper}>
          <Field
            name="contactName"
            component={Input}
            required
            validate={[required]}
            label="Contact name"
          />
        </div>
        <div className={styles.inputs_wrapper}>
          <Field name="city" component={Input} label="City" />
          <Field name="country" component={Input} label="Country" />
        </div>
        <div className={styles.inputs_wrapper}>
          <Field
            name="email"
            component={Input}
            label="Email"
            required
            validate={[email, required]}
          />
        </div>
        <div className={styles.inputs_wrapper}>
          <Field
            name="phone"
            component={Input}
            label="Phone"
            validate={[phone]}
            dropdownPlacement="top"
            phone
          />
          <Field
            name="instagram"
            component={Input}
            label="Instagram"
            validate={[instagramUsernameValidator]}
          />
        </div>
      </form>
    </BasicModal>
  );
}

export default reduxForm({
  form: ADD_CONTACT_FORM,
})(AddContactModal);
