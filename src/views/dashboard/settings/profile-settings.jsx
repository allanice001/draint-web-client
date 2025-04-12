import React, { useEffect } from 'react';
import {
  getUserAccount,
  setLoading,
  updateUserAccount,
  updateUserPassword,
  updateUserProfStatus,
} from 'redux/dashboard/actions/settingsActions';
import AddressForm from 'components/settings-forms/address-form/address-form';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import DeleteForm from 'components/settings-forms/delete-form/delete-form';
import InstagramForm from 'components/settings-forms/instagram-form/instagram-form';
import PasswordForm from 'components/settings-forms/password-form/password-form';
import ProfileForm from 'components/settings-forms/profile-form/profile-form';
import { Spinner } from 'components/lib';
import StatusForm from 'components/settings-forms/status-form/status-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import handleChangeUserAddress from 'redux/user/account/actions/update-user-address';
import { pageScroll } from 'services/pageScroller';
import styles from './profile-settings.module.scss';
import { withRouter } from 'react-router';

const Analytic = AnalyticHelper.create();

function ProfileSettings({
  actions,
  loading,
  user,
  isHavePaidOrders,
  isHaveVerifiedOrders,
}) {
  useEffect(() => {
    pageScroll();
    actions.setLoading();
    actions.getUserAccount();
    Analytic.createEvent('PageView');
  }, [actions]);

  function handleUpdateProfStatus(formData) {
    formData.profile_id = user.profile_id;
    actions.updateUserProfStatus(formData);
  }

  if (user.loading) return <Spinner full />;

  return (
    <div className={`container ${styles.setting}`}>
      <div className={styles.row}>
        <div className={styles.column} style={{ flexGrow: 2 }}>
          <div className={styles.row}>
            <ProfileForm
              onSubmit={values => {
                Analytic.createEvent('ProfileSettingsChanged');
                actions.updateUserAccount(values);
              }}
              disabled={loading}
            />
            <StatusForm
              onSubmit={values => {
                Analytic.createEvent('ProfStatusChanged');
                handleUpdateProfStatus(values);
              }}
              disabled={loading}
            />
          </div>

          <AddressForm
            onSubmit={values => {
              Analytic.createEvent('AddressChanged');
              actions.handleChangeUserAddress(values, user.profile_id);
            }}
            disabled={loading}
          />
        </div>

        <div className={styles.column}>
          <PasswordForm
            onSubmit={values => {
              Analytic.createEvent('PasswordChanged');
              actions.updateUserPassword(values);
            }}
            disabled={loading}
          />

          <InstagramForm
            onSubmit={values => {
              Analytic.createEvent('InstagramLinkChanged');
              actions.updateUserAccount(values);
            }}
            disabled={loading}
          />

          <DeleteForm
            disabled={loading}
            isHavePaidOrders={isHavePaidOrders}
            isHaveVerifiedOrders={isHaveVerifiedOrders}
          />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(store) {
  const { dashboard, user } = store;
  return {
    user: user.account,
    loading: dashboard.settings.loading || user.query.loading,
    isHavePaidOrders: dashboard.settings.account?.isHavePaidOrders,
    isHaveVerifiedOrders: dashboard.settings.account?.isHaveVerifiedOrders,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setLoading,
        getUserAccount,
        updateUserAccount,
        updateUserPassword,
        updateUserProfStatus,
        handleChangeUserAddress,
      },
      dispatch
    ),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileSettings)
);
