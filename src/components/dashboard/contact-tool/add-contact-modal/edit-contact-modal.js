import { Field, reduxForm } from 'redux-form';
import {email, instagramUsernameValidator, phone, required} from 'components/reduxForm/validators';

import { EDIT_CONTACT_FORM } from 'constants/components/forms';
import BasicModal from 'components/basic-modal/basic-modal';
import Input from 'components/reduxForm/input/input';
import React from 'react';
import { connect } from 'react-redux';
import styles from './add-contact-modal.module.scss';

function EditContactModal(props) {
  const { handleCloseEditModal, valid } = props;

  return (
    <BasicModal
      title="Edit contact"
      handleClose={handleCloseEditModal}
      isOpen={props.contactTool.editMode}
      footer={
        <button
          className={styles.add_button}
          type="submit"
          form="edit-contact-form"
          disabled={!valid}
        >
          Edit contact
        </button>
      }
    >
      <form onSubmit={props.handleSubmit} id="edit-contact-form">
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

const mapStateToProps = (store) => {
  const [contact = {}] = store.dashboard.contactTool.contact || [];
  return {
    contactTool: store.dashboard.contactTool,

    initialValues: {
      id: contact.id,
      contactName: contact.name,
      city: contact.city,
      country: contact.country,
      email: contact.email,
      phone: contact.phone,
      instagram: contact.instagram,
    },
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: EDIT_CONTACT_FORM,
    enableReinitialize: true,
    destroyOnUnmount: true,
  })(EditContactModal)
);
