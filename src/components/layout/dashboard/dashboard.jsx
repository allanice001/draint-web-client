import {
  PROFILE_CONTACTS,
  PROFILE_FEEDBACK,
  PROFILE_GALLERY,
  PROFILE_ORDERS,
  PROFILE_SALES,
  PROFILE_SETTINGS,
  PROFILE_SOCIAL_MEDIA,
  PROFILE_SUBSCRIPTIONS,
  profileTabs,
} from 'constants/routes/artist-profile';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { setBlogTab, setIsArtist } from 'redux/dashboard/actions/layoutActions';
import Artist from 'components/layout/artist/artist';
import AuctionModal from 'components/order/auction-modal/auction-modal';
import Billing from 'views/dashboard/settings/billing';
import ContactTool from './contact-tool/contact-tool';
import FeedbackPage from 'components/feedback/feedback-page';
import Footer from 'components/footer/footer';
import Helmet from 'components/helmet';
import MainNavbar from 'components/nav/home/main-navbar';
import MobileProfileNavigation from 'components/shared/mobile-profile-navigation/mobile-profile-navigation';
import NotFoundPage from 'pages/not-found';
import Orders from 'components/order/orders';
import PinterestTag from 'external-lib/pinterestTag';
import ProfileNavigation from 'components/shared/profile-navigation/profile-navigation';
import ProfileSettings from 'views/dashboard/settings/profile-settings';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import SalesDashboard from './sales-dashboard/sales-dashboard';
import { SocialMedia } from 'views/dashboard/socailMedia/social-media';
import { TAB } from 'constants/routes/parameters/parameters';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getParameterValues } from 'helpers/routes/get-parameter-values';
import { onDeleteCheck } from 'services/redirectCheckService';
import { pageScroll } from 'services/pageScroller';
import withArtistMobileNavigation from 'hoc/with-artist-mobile-navigation';
import withArtistNavigation from 'hoc/with-artist-navigation';
import { withRouter } from 'react-router';
const Navigation = () => withArtistNavigation(ProfileNavigation);
const MobileNavigation = () =>
  withArtistMobileNavigation(MobileProfileNavigation);

const DashboardLayout = ({ history, user }) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    // ReactPixel.pageView();
    PinterestTag.pageView();
    pageScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onDeleteCheck(user, history);
  });

  return (
    <>
      <Helmet />
      <MainNavbar />
      <Navigation />
      <MobileNavigation />
      <Switch>
        <Route exact path={PROFILE_GALLERY}>
          <Redirect to={PROFILE_GALLERY + '/' + profileTabs.PAINTINGS} />
        </Route>

        <Route exact path={PROFILE_GALLERY}>
          <Redirect to={PROFILE_GALLERY + '/' + profileTabs.PAINTINGS} />
        </Route>

        <Route
          exact
          path={
            PROFILE_GALLERY +
            TAB +
            getParameterValues(...Object.values(profileTabs))
          }
        >
          <Artist />
          <AuctionModal />
        </Route>

        <Route exact path={PROFILE_SALES}>
          <SalesDashboard />
          <AuctionModal />
        </Route>

        <Route exact path={PROFILE_ORDERS}>
          <Orders />
          <AuctionModal />
        </Route>

        <Route exact path={PROFILE_SETTINGS}>
          <ProfileSettings />
          <AuctionModal />
        </Route>

        <Route exact path={PROFILE_SUBSCRIPTIONS}>
          <Billing />
          <AuctionModal />
        </Route>

        <Route exact path={PROFILE_SOCIAL_MEDIA}>
          <SocialMedia />
          <AuctionModal />
        </Route>

        <Route exact path={PROFILE_CONTACTS}>
          <div className="container">
            <ContactTool />
            <AuctionModal />
          </div>
        </Route>

        <Route exact path={PROFILE_FEEDBACK}>
          <FeedbackPage />
          <AuctionModal />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

DashboardLayout.propTypes = {
  actions: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
  isActivatedUser: PropTypes.bool,
  isArtist: PropTypes.bool,
  isFirstCheck: PropTypes.bool,
  user: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = state => ({
  user: state.user,
  isArtist: state.user.account.is_artist,
  accountId: state.user.account.id,
  cartHash: state.user.account.cartHash,
  isLoading: state.dashboard.layout.loading,
  isFirstCheck: state.dashboard.layout.firstCheck,
  isActivatedUser: state.user.account.is_activated,
  isRoleChanged: state.user.account.isRoleChanged,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setIsArtist,
      displayMessage,
      setBlogTab,
    },
    dispatch
  ),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardLayout)
);
