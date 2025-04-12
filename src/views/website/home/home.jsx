import {
  HOME_PAGE_META_HELMET_KEYWORDS,
  HOME_PAGE_META_HELMET_SCRIPT,
} from 'constants/components/home-page';
import { JoinUsCollector, Reasons, Spinner } from 'components/lib';
import React, { useEffect, useMemo } from 'react';
import {
  confirmPersonalSubscription,
  confirmSubscription,
  getInitialData,
} from 'redux/homepage/actions/homepageActions';
import { useDispatch, useSelector } from 'react-redux';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import ArtistCollectorModal from 'components/basic-modal/artist-collector-modal/artist-collector-modal';
import ArtworkPageUnloggedModal from 'components/artwork/artwork-page-unlogged-modal/artwork-page-unlogged-modal';
import { ArtworksFilters } from './artworksFilters';
import { ArtworksFiltersByPrice } from './artworksFiltersByPrice';
import { BannerSlider } from 'components/banner-slider/banner-slider';
import Helmet from 'components/helmet';
import HomepageBlog from 'components/homepage-blog/homepage-blog';
import HomepageJoinOur from 'components/homepage-join-sections/homepage-join-our';
import HomepageJoinUs from 'components/homepage-join-sections/homepage-join-us';
import HomepageNewsletterSubscribe from 'components/homepage-newsletter-subscribe/homepage-newsletter-subscribe';
import HomepageReviews from 'components/homepage-reviews/homepage-reviews';
import HomepageTrackShipment from 'components/homepage-track-shipment/homepage-track-shipment';
import PaintingsByArtists from 'components/homepage-paintings-by-artists/paintings-by-artists';
import ProfileLink from 'components/widgets/profileLink/profileLink';
import SignUpRoundedButton from 'components/signup/signup-rounded-button';
import { StylesList } from './stylesList';
import styles from './home.module.scss';
const Analytic = AnalyticHelper.create();

function HomePageComponent() {
  const dispatch = useDispatch();
  const { slider, loading } = useSelector(state => state.home.homepage);
  const { account: user, loader } = useSelector(state => state.user);
  const isUserLoading = loader.state;

  useEffect(() => {
    window.scrollTo(0, 0);

    Analytic.createEvent('PageView', { url: '/home' });

    const parsedUrl = new URL(window.location.href);
    const weekly_newsletter_id = parsedUrl.searchParams.get('newsletter-subscription');
    const personal_subscriptions_id = parsedUrl.searchParams.get('personal-subscriptions');

    if (weekly_newsletter_id) {
      dispatch(confirmSubscription(weekly_newsletter_id));
    }

    if (personal_subscriptions_id) {
      dispatch(confirmPersonalSubscription(personal_subscriptions_id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user.loading) window.scrollTo(0, 0);
  }, [user.loading]);

  useMemo(() => {
    dispatch(getInitialData());
  }, [dispatch]);

  const HomeSubButtons = (isLoading, token) => {
    if (isLoading) return null;

    if (token) return <ProfileLink />;

    return <SignUpRoundedButton />;
  };

  if (loading || user.loading) return <Spinner full />;

  return (
    <>
      <Helmet
        keywords={HOME_PAGE_META_HELMET_KEYWORDS}
        script={HOME_PAGE_META_HELMET_SCRIPT}
      />

      {!!slider && (
        <div className={styles.banner}>
          <BannerSlider slides={slider} />
        </div>
      )}

      {/*Latest paintings for sale*/}
      <ArtworksFilters />

      <HomepageTrackShipment />

      <ArtworksFiltersByPrice />

      <HomepageJoinUs />

      {/*Paintings by artists close by*/}
      <PaintingsByArtists />

      <HomepageReviews />

      <HomepageBlog />

      <HomepageNewsletterSubscribe />

      <StylesList />

      <HomepageJoinOur />

      <Reasons />

      <div className={styles.section_wrapper}>
        <JoinUsCollector />
      </div>

      <HomeSubButtons isLoading={isUserLoading} token={user.token} />

      <ArtworkPageUnloggedModal />

      <ArtistCollectorModal />
    </>
  );
}

export default HomePageComponent;
