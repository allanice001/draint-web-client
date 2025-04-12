import React, { useCallback, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  updateUserAccount,
  updateUserProfStatus,
} from 'redux/dashboard/actions/settingsActions';

import { ARTWORK_UPLOAD_FORM } from 'constants/components/forms';
import AddressForm from 'components/settings-forms/address-form/address-form';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import DefaultModal from 'components/basic-modal/basic-modal';
import ProfileForm from 'components/settings-forms/profile-form/profile-form';
import PropTypes from 'prop-types';
import StatusForm from 'components/settings-forms/status-form/status-form';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form';
import handleChangeUserAddress from 'redux/user/account/actions/update-user-address';
import { setRequiredSaleInfoModalForms } from 'redux/artwork/actions/artworkActions';
import { setRequiredSaleInfoModalOpen } from 'redux/artwork/actions/artworkActions';
import styles from './required-sale-info-modal.module.scss';

const Analytic = AnalyticHelper.create();

const RequiredSaleInfoModal = ({
  isOpen,
  user,
  owner,
  actions,
  forms,
  requiredSaleInfo = false,
  forSaleStatusChange,
}) => {
  const { owner_profile_id: profileId } = useSelector(
    store => store.artwork.artworkData.currentArtwork
  );
  const { profile_id: artistProfileId } = useSelector(
    store => store.artist.currentArtist.account || {}
  );

  const handleModalClose = useCallback(() => {
    const modalForms = {
      addressForm: false,
      statusForm: false,
      profileForm: false,
    };

    actions.setRequiredSaleInfoModalOpen(false);
    actions.setRequiredSaleInfoModalForms(modalForms);
  }, [actions]);

  useEffect(() => {
    return () => {
      handleModalClose();
    };
  }, [handleModalClose]);

  function getProfileId() {
    if (requiredSaleInfo && profileId) {
      return profileId;
    }

    return artistProfileId;
  }

  if (!forms.addressForm && !forms.profileForm && !forms.statusForm && isOpen) {
    actions.change(ARTWORK_UPLOAD_FORM, 'for_sale', true);
    if (forSaleStatusChange) forSaleStatusChange();
    handleModalClose();
    return null;
  }

  return (
    <DefaultModal
      maxWidth="xs"
      handleClose={handleModalClose}
      isOpen={isOpen}
      title="Required info"
    >
      <div className={styles.wrapper}>
        {forms.addressForm && (
          <AddressForm
            className={styles.section}
            requiredSaleInfo={requiredSaleInfo}
            onSubmit={values => {
              Analytic.createEvent('AddressChanged');
              actions.handleChangeUserAddress(values, getProfileId());
            }}
          />
        )}

        {forms.profileForm && (
          <ProfileForm
            className={styles.section}
            onSubmit={values => {
              Analytic.createEvent('ProfileSettingsChanged');
              actions.updateUserAccount(values);
            }}
          />
        )}

        {forms.statusForm && (
          <StatusForm
            className={styles.section}
            owner={owner}
            onSubmit={values => {
              Analytic.createEvent('ProfStatusChanged');
              actions.updateUserProfStatus({
                ...values,
                profile_id: !requiredSaleInfo
                  ? user.profile_id
                  : owner.profile_id,
              });
            }}
          />
        )}
      </div>
    </DefaultModal>
  );
};

RequiredSaleInfoModal.propTypes = {
  actions: PropTypes.object,
  forms: PropTypes.shape({
    addressForm: PropTypes.bool.isRequired,
    profileForm: PropTypes.bool.isRequired,
    statusForm: PropTypes.bool.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => {
  const {
    isRequiredSaleInfoModalOpen: isOpen,
    requiredSaleInfoModalForms: forms,
  } = state.artwork.artworkData;

  return {
    isOpen,
    user: state.user.account,
    owner: state.artwork.artworkData.currentArtwork.ownerInfo,
    forms,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setRequiredSaleInfoModalOpen,
      updateUserAccount,
      handleChangeUserAddress,
      updateUserProfStatus,
      setRequiredSaleInfoModalForms,
      change,
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequiredSaleInfoModal);
