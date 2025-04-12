import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  getUserAccount,
  setLoading,
  updateUserAccount,
  updateUserPassword,
  updateUserProfStatus,
} from 'redux/dashboard/actions/settingsActions';
import AddressForm from 'components/settings-forms/address-form/address-form';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import CollectorProfileForm from 'components/settings-forms/collector-profile/collector-profile';
import DeleteForm from 'components/settings-forms/delete-form/delete-form';
import PasswordForm from 'components/settings-forms/password-form/password-form';
import PropTypes from 'prop-types';
import { Spinner } from 'components/lib';
import { bindActionCreators } from 'redux';
import handleChangeUserAddress from 'redux/user/account/actions/update-user-address';
import { pageScroll } from 'services/pageScroller';
import styles from './collector-profile.module.scss';
import { withRouter } from 'react-router';

const Analytic = AnalyticHelper.create();

function CollectorProfile({
  actions,
  loading,
  isHavePaidOrders,
  isHaveVerifiedOrders,
}) {
  useEffect(() => {
    actions.setLoading();
    actions.getUserAccount();
  }, [actions]);

  useEffect(() => {
    pageScroll();
    Analytic.createEvent('PageView');
  }, []);

  const { profile_id: profileId, loading: accountLoading } = useSelector(
    store => store.user.account
  );

  if (accountLoading) return <Spinner full />;

  return (
    <div className={`container ${styles.setting}`}>
      <div className={styles.row}>
        <div className={styles.column} style={{ flexGrow: 2 }}>
          <CollectorProfileForm
            onSubmit={values => {
              Analytic.createEvent('CollectorProfileSettingsChanged');
              actions.updateUserAccount(values);
            }}
          />

          <AddressForm
            disabled={loading}
            onSubmit={values => {
              Analytic.createEvent('CollectorAddressChanged');
              actions.handleChangeUserAddress(values, profileId);
            }}
          />
        </div>

        <div className={styles.column}>
          <PasswordForm
            disabled={loading}
            onSubmit={values => {
              Analytic.createEvent('CollectorPasswordChanged');
              actions.updateUserPassword(values);
            }}
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

CollectorProfile.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  getUserAccount: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func,
};

function mapStateToProps(store) {
  const { dashboard, user } = store;

  return {
    location: user.account.location,
    loading: dashboard.settings.loading || user.query.fetching,
    isHavePaidOrders: dashboard.settings.account?.isHavePaidOrders,
    isHaveVerifiedOrders: dashboard.settings.account.isHaveVerifiedOrders,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setLoading,
        getUserAccount,
        handleChangeUserAddress,
        updateUserAccount,
        updateUserPassword,
        updateUserProfStatus,
      },
      dispatch
    ),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CollectorProfile)
);
