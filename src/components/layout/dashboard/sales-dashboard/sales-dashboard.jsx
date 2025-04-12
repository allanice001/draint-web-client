import React, { useEffect } from 'react';
import {
  getPayoutsOrders,
  handleSetPage,
  handleSetPageSize,
} from 'redux/dashboard/actions/salesActions';
import PayoutFAQ from './payouts/faq';
import PayoutPlatforms from './payouts/payout-platforms';
import Payouts from './payouts/payouts';
import PayoutsList from './payouts-list/payouts-list';
import PinterestTag from 'external-lib/pinterestTag';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { Spinner } from 'components/lib';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './salesDashboard.module.scss';

function SalesDashboard({
  actions,
  user,
  payoutsOrders,
  loading,
  pagination,
  payouts,
  payoutsSoFar,
  payoutsHistory,
  payoutHistoryPreview,
}) {
  ReactGA.pageview(window.location.pathname);
  ReactPixel.pageView();
  PinterestTag.pageView();

  const { page, pageSize } = pagination;

  useEffect(() => {
    if (user.id) {
      actions.getPayoutsOrders(page, pageSize);
    }
  }, [page, pageSize, user.id, actions]);

  if (user.loading) return <Spinner full />;

  return (
    <div className={styles.wrapper}>
      <Payouts
        payouts={payouts}
        payoutsSoFar={payoutsSoFar}
        payoutsHistory={payoutsHistory}
        payoutHistoryPreview={payoutHistoryPreview}
      />

      <div>
        <PayoutsList
          loading={loading}
          orders={payoutsOrders}
          handelPageSize={actions.handleSetPageSize}
          handlePage={actions.handleSetPage}
          pagination={pagination}
        />
      </div>

      <PayoutPlatforms />

      <PayoutFAQ />
    </div>
  );
}

function mapStateToProps(store) {
  const {
    user,
    dashboard: { sales },
  } = store;

  return {
    loading: sales.payoutsOrders.fetching,
    user: user.account,
    payoutsOrders: sales.payoutsOrders.orders,
    payoutsHistory: sales.payoutsOrders.payoutHistory,
    payoutHistoryPreview: sales.payoutsOrders.payoutHistoryPreview,
    pagination: {
      page: sales.payoutsOrders.page,
      pageSize: sales.payoutsOrders.pageSize,
      maxCount: sales.payoutsOrders.maxCount,
      pages: sales.payoutsOrders.pages,
    },
    payouts: sales.payoutsOrders.payoutAmount,
    payoutsSoFar: sales.payoutsOrders.payoutSoFarAmount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getPayoutsOrders,
        handleSetPage,
        handleSetPageSize,
      },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesDashboard);
