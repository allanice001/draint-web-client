import {
  DELETE_FORM_DESCRIPTION,
  DELETE_FROM_TITLE,
} from 'constants/components/forms';
import React, { useState } from 'react';

import AccountDeleteModal from 'components/basic-modal/delete-modal';
import styles from './delete-form.module.scss';

const DeleteForm = ({ disabled, isHavePaidOrders, isHaveVerifiedOrders }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <section className={styles.section}>
      <AccountDeleteModal
        isOpen={open}
        setOpen={handleOpen}
        isHavePaidOrders={isHavePaidOrders}
        isHaveVerifiedOrders={isHaveVerifiedOrders}
      />
      <h3 className={`group-title ${styles.title}`}>{DELETE_FROM_TITLE}</h3>
      <p>{DELETE_FORM_DESCRIPTION}</p>
      <div className={styles.form__footer}>
        <button
          type="button"
          onClick={handleOpen}
          className={`primary-button ${styles.form__button}`}
          disabled={disabled}
        >
          {DELETE_FROM_TITLE}
        </button>
      </div>
    </section>
  );
};

export default DeleteForm;
