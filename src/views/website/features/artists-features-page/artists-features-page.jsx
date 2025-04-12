import { Breadcrumb, JoinAsArtist, Reasons } from 'components/lib';
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ARTIST_SIGN_UP } from 'constants/links';
import { ArtistsExperienceCard } from 'components/artists-experience/artists-experience';
import { CardSlider } from 'components/card-slider/card-slider';
import { Feature } from 'models/feature-artist';
import JoinUsButton from 'components/join-us/join-us-button';
import Pricing from 'views/website/pricing/pricing';
import ProfileLink from 'components/widgets/profileLink/profileLink';
import { SEARCH_ARTISTS } from 'constants/routes/publicModule/artist';
import { SingleSlide } from 'components/artist/artist-feature-carousel/artist-feature-carousel';
import { getLimitedFeaturesCards } from 'redux/artists/actions/artistsActions';
import { pageScroll } from 'services/pageScroller';
import styles from './artists-features-page.module.scss';
import { withRouter } from 'react-router';

const breadcrumbs = [
  { url: SEARCH_ARTISTS, label: 'Artists' },
  { url: '/features/artists', label: 'Pricing' },
];

function ArtistsFeaturesPage(props) {
  const isArtist = props.user.is_artist;
  const dispatch = useDispatch();
  const { cards } = useSelector(store => store.artists.publicArtists);

  useEffect(() => {
    pageScroll();
    dispatch(getLimitedFeaturesCards());
  }, [dispatch]);

  return (
    <>
      <Breadcrumb list={breadcrumbs} />

      <Pricing onlyPrice />

      <div className="container">
        <div className={styles.title_block}>
          <h2 className={styles.title}>New features for Artists</h2>
          <p className={styles.sub_title}>
            Get to know, and use our new features to build your brand and sell
            art.
          </p>
        </div>

        <div className={styles.slide_block}>
          <SingleSlide slide={1} />
          <SingleSlide slide={2} reverse hasPadding />
          <SingleSlide slide={3} hasPadding />
          <SingleSlide slide={4} reverse />
          <SingleSlide slide={5} hasPadding />
        </div>

        {!isArtist && (
          <div className={styles.joinButton}>
            <JoinUsButton name={'Join as Artist'} url={ARTIST_SIGN_UP} />
          </div>
        )}
      </div>

      {!!cards.length && (
        <CardSlider
          title="Draint artists share their experience"
          list={cards}
          Model={Feature}
          isFeature
          limitOnDesktop={3}
          item={(data, i, changeSlideHeight) => {
            if (!data) {
              return null;
            }
            return (
              <div className={styles.card}>
                <ArtistsExperienceCard
                  changeSlideHeight={changeSlideHeight}
                  data={data}
                  key={data.id}
                />
              </div>
            );
          }}
        />
      )}

      <Reasons page="Artists" showFooter is_artist={isArtist} />

      <JoinAsArtist
        showFooter={false}
        image={2}
        description={
          <>
            <p>
              In recent years we have listened closely when artists talked about
              their Needs, Desires and Ideas on how to build a personal Artist
              Brand. Draint was founded on these principles. We are here to put
              the Artist into the center of action.
            </p>
            <p>
              Our Software as a Service fully compensates for do-it-yourself
              websites or other online galleries.
            </p>
            <p>
              Draint establishes the Single-Hub for artists to show up online
              besides social media.
            </p>
          </>
        }
      />

      <div className={styles.joinButton__upgrade}>
        {!isArtist && (
          <JoinUsButton name={'Upgrade your profile'} url={ARTIST_SIGN_UP} />
        )}
      </div>

      {props.user.id && <ProfileLink />}
    </>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.user.loader.state,
    user: state.user.account,
  };
}

export default withRouter(connect(mapStateToProps)(ArtistsFeaturesPage));
