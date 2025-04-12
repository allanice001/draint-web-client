import {
  ACCOUNT,
  ADDRESS,
  LOCATION,
  SETTINGS,
  TO,
  UPDATE,
} from 'constants/master/artists';
import {
  MASTER_ADDRESS_UPDATE_FORM,
  MASTER_SETTINGS_UPDATE_FORM,
} from 'constants/components/forms';
import React, { useState } from 'react';
import MaterArtistAddressForm from 'components/settings-forms/master-profile-form/master-artist-address-form';
import MaterArtistSettingsForm from 'components/settings-forms/master-profile-form/master-artist-settings-form';
import { getInstagramUsername } from 'helpers/instagram-url-checker';
import { isEqual } from 'lodash';
import { useSelector } from 'react-redux';

export const useArtistsSettingsModal = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const { currentArtist } = useSelector(store => store.master);
  const { materArtistSettingsForm } = useSelector(store => store.form);
  const { materArtistAddressForm } = useSelector(store => store.form);
  const { isUserTaken } = useSelector(store => store.master.approvalArtists);
  const { isEmailTaken } = useSelector(store => store.master.approvalArtists);

  const initialValues = {
    ...currentArtist.account,
    first_name: currentArtist.account.first_name || '',
    last_name: currentArtist.account.last_name || '',
    instagram: getInstagramUsername(currentArtist?.account?.instagram) || '',
  };

  function isDisabled() {
    if (materArtistAddressForm) {
      const form = materArtistAddressForm;

      return !!(isEqual(form.initial, form.values) || form.syncErrors);
    }

    if (materArtistSettingsForm) {
      const form = materArtistSettingsForm;

      return !!(
        isEqual(form.initial, form.values) ||
        (form.initial.first_name !== form.values.first_name &&
          !form.values.first_name.trim()) ||
        (form.initial.last_name !== form.values.last_name &&
          !form.values.last_name.trim()) ||
        form.syncErrors
      );
    }
  }

  function capitalizeLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return '';
  }

  function getModalTitle() {
    if (!!!currentTab) {
      return `${capitalizeLetter(ACCOUNT)} ${SETTINGS}`;
    }

    return `${capitalizeLetter(ADDRESS)} ${SETTINGS}`;
  }

  function getToggleButtonTitle() {
    if (!!!currentTab) {
      return `${TO} ${capitalizeLetter(ADDRESS)} ${SETTINGS}`;
    }

    return `${TO} ${capitalizeLetter(ACCOUNT)} ${SETTINGS}`;
  }

  function getUpdateButtonTitle() {
    if (!!!currentTab) {
      return `${capitalizeLetter(UPDATE)} ${ACCOUNT}`;
    }

    return `${capitalizeLetter(UPDATE)} ${ADDRESS}`;
  }

  function getSubmitType() {
    if (!!!currentTab) {
      return MASTER_SETTINGS_UPDATE_FORM;
    }

    return MASTER_ADDRESS_UPDATE_FORM;
  }

  function toggleTab() {
    return setCurrentTab(currentTab ? 0 : 1);
  }

  const getForm = handleSubmit => {
    if (!!!currentTab) {
      return (
        <MaterArtistSettingsForm
          initialValues={initialValues}
          onSubmit={data => handleSubmit(data, ACCOUNT)}
        />
      );
    }

    if (!!currentTab) {
      return (
        <MaterArtistAddressForm
          onSubmit={data => handleSubmit(data, LOCATION)}
        />
      );
    }
  };

  return {
    getModalTitle,
    getToggleButtonTitle,
    getUpdateButtonTitle,
    toggleTab,
    getForm,
    getSubmitType,
    isDisabled,
    currentArtist,
    isUserTaken,
    isEmailTaken,
  };
};
