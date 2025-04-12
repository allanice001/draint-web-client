import AddressForm from 'components/settings-forms/address-form/address-form';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import DefaultModal from './basic-modal';
import React from 'react';
import styles from './address-settings-modal.module.scss';
import updateLocationData from 'redux/user/account/actions/updateLocationData';
import { useDispatch } from 'react-redux';

const Analytic = AnalyticHelper.create();

function AddressSettingsModal({ isOpen, setOpen, action }) {
  const dispatch = useDispatch();

  function callback() {
    setOpen();
    action();
  }

  function onSubmit(formData) {
    Analytic.createEvent('AddressChanged');
    dispatch(updateLocationData(formData, callback));
  }

  return (
    <DefaultModal
      handleClose={setOpen}
      isOpen={isOpen}
      title="Check your address info to continue"
      maxWidth="xs"
    >
      <AddressForm
        title={null}
        className={styles.address_form}
        onSubmit={onSubmit}
      />
    </DefaultModal>
  );
}

export default AddressSettingsModal;
