import React, { useEffect, useRef } from 'react';
import CollectorArtworks from 'components/collector/collector-artworks/collector-artworks';
import CollectorOffers from 'components/collector/collector-offers/collector-offers';
import CollectorProfile from 'components/collector/collector-profile/collector-profile';
import CollectorShippingDashboard from 'components/collector/collector-sales/collector-shipping-dashboard';
import CollectorSubscriptions from 'components/collector/subscriptions-of-artist/collector-subscriptions';
import CollectorWatchlist from 'components/collector/collector-watchlist/collector-watchlist';
import FeedbackPage from 'components/feedback/feedback-page';
import Footer from 'components/footer/footer';
import Helmet from 'components/helmet';
import MainNavbar from 'components/nav/home/main-navbar';
import MobileProfileNavigation from 'components/shared/mobile-profile-navigation/mobile-profile-navigation';
import ProfileNavigation from 'components/shared/profile-navigation/profile-navigation';
import SalesDashboard from 'components/layout/dashboard/sales-dashboard/sales-dashboard';
import { connect } from 'react-redux';
import { onDeleteCheck } from 'services/redirectCheckService';
import { pageScroll } from 'services/pageScroller';
import { useCollectorTheme } from 'hooks/use-theme';
import useWelcomeModal from 'hooks/use-welcome-modal/use-welcome-modal';
import withCollectorMobileNavigation from 'hoc/with-collector-mobile-navigation';
import withCollectorNavigation from 'hoc/with-collector-navigation';
import { withRouter } from 'react-router';

const Navigation = () => withCollectorNavigation(ProfileNavigation);
const MobileNavigation = () =>
  withCollectorMobileNavigation(MobileProfileNavigation);

const tabs = {
  artworks: () => {
    return (
      <>
        <CollectorArtworks />
        <CollectorSubscriptions />
      </>
    );
  },
  watchlist: () => <CollectorWatchlist />,
  orders: () => <CollectorShippingDashboard />,
  sales: () => <SalesDashboard />,
  settings: () => <CollectorProfile />,
  offers: () => <CollectorOffers />,
  feedback: () => <FeedbackPage />,
};

function CollectorDashboard(props) {
  const { user, match, history } = props;
  onDeleteCheck(user, history);
  const rootRef = useRef();
  useCollectorTheme(rootRef);

  useEffect(() => {
    pageScroll();
  }, []);

  useWelcomeModal();

  if (!user.account.id) {
    return null;
  }

  const tab = match.params.tab || 'artworks';

  if (!tabs[tab]) {
    history.push('artworks');
  }

  return (
    <>
      <Helmet />
      <MainNavbar />
      <div ref={rootRef}>
        <Navigation />
        <MobileNavigation />
        {tabs[tab] ? tabs[tab]() : null}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(CollectorDashboard));
