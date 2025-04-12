import React, { useEffect, useState } from 'react';
import { bool, func, number, objectOf, shape, string } from 'prop-types';
import {
  getNavbarData,
  setIsNavBarMenuWithTimeout,
} from 'redux/global/navbar/navbarActions';
import { resetFilters, setFilter } from 'redux/global/filters/filtersActions';
import ArtistCardDownloadModal from 'components/basic-modal/artist-card-download-modal';
import { DELETED } from 'constants/components/master/artists';
import DesktopSearchBar from './components/desktop-search-bar';
import { HOME } from 'constants/routes/mainRout';
// import Icons from 'components/icons';
import { Logo } from 'components/lib';
import MobileSearchBar from './components/mobile-search-bar';
import NavAvatar from '../nav-avatar/nav-avatar';
import NavigationList from './components/navigation-list';
import { SEARCH_ARTISTS } from 'constants/routes/publicModule/artist';
import { SEARCH_ARTWORKS } from 'constants/routes/publicModule/artwork';
import { SEARCH_PATH } from 'constants/components/main-navbar';
import SignInBlock from './components/sign-in-block';
import { Socials } from '../socials/socials';
import SubNavigationList from './components/navigation-sub-list';
import { ToggleButton } from 'components/toggle-button/toggle-button';
import TopCornerButton from './components/top-corner-button';
import { User } from 'models/user';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import deleteUserData from 'redux/user/account/actions/deleteUserData';
// import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getPublicArtist } from 'redux/artists/actions/artistsActions';
import { initialRequest as getPublicArtwork } from 'redux/artwork/actions/artworkActions';
import { getPublicArtworks } from 'redux/artworks/actions/artworksActions';
import { setFeedbackModal } from 'redux/global/notiifcation/actions/actions';
import setInitialState from 'redux/checkout/actions/setInitialState';
import { setUserCartCounter } from 'redux/user/account/actions/setUserData';
import styles from './main-navbar.module.scss';
import { withRouter } from 'react-router-dom';

function MainNavbar({ actions, user, userLoading, history }) {
  const [isOpened, setIsOpened] = useState(false);
  const [search, setSearch] = useState(false);
  const [isOpenArtistModal, setIsOpenArtistModal] = useState(false);
  const {
    id: accountId,
    cartHash,
    is_artist: isArtist,
    is_activated: isActivated,
    verification,
    avatar,
    theme,
    cartCounter,
  } = user;

  useEffect(() => {
    actions.getNavbarData();

    window.Echo.on('cartItemsCount', ({ id }) => {
      if (id) {
        if (cartHash === id) {
          actions.setUserCartCounter(id);
        } else if (localStorage.cartId === id) {
          actions.setUserCartCounter(id);
        }
      }
    });
  }, [actions, cartHash]);

  useEffect(() => {
    if (isOpened) {
      actions.setIsNavBarMenuWithTimeout();
    }
  }, [isOpened, actions]);

  const logout = e => {
    setIsOpened(false);
    e.preventDefault();

    actions.deleteUserData();
    return false;
  };

  const onToggle = () => {
    actions.setIsNavBarMenuWithTimeout();
    setIsOpened(!isOpened);
  };

  const handleSearch = ({ type, search }) => {
    const value = search[0];

    if (!value) {
      history.push(`${SEARCH_PATH}/${type}`);
      return;
    }

    if (type === 'country') {
      return history.push(`${SEARCH_ARTISTS}?${type}=${value}`);
    }

    return history.push(`${SEARCH_ARTWORKS}?${type}=${value}`);
  };

  const path = window.location.pathname;
  const isHome = path === HOME;
  const isLogged = !!accountId;
  const isDeleted = verification === DELETED;

  return (
    <>
      <header
        className={`page-header ${styles.header} ${search ? styles.hide : ''}`}
      >
        <div
          style={{
            backgroundColor: '#fff',
            position: 'relative',
            zIndex: 3,
            height: '100%',
          }}
        >
          <div className={`container ${styles.container}`}>
            <span className={styles.logo__mobile}>
              <Logo
                className={`${styles.logo} ${isOpened ? styles.hide : ''}`}
                home={isHome}
              />
            </span>

            <div className={styles.search__desktop}>
              <DesktopSearchBar handleSearch={handleSearch} />
            </div>

            <div
              className={`${styles.navigation__wrapper} ${
                isOpened ? styles.opened : ''
              }`}
            >
              <ToggleButton
                className={styles.toggle__navigation}
                toggle={() => onToggle()}
                opened={isOpened}
              />

              <Logo className={`${styles.logo} ${styles.logo__nav}`} home />

              <NavAvatar
                className={styles.avatar}
                src={avatar || theme}
                name={User.create(user).fullName}
                onLogout={logout}
                setIsOpened={setIsOpened}
              />

              <nav>
                <NavigationList
                  onLogout={logout}
                  isLogged={isLogged}
                  isArtist={isArtist}
                  isDeleted={isDeleted}
                  isActivated={isActivated}
                  handleSearch={handleSearch}
                  onSearch={() => {
                    setSearch(!search);
                  }}
                  setIsOpened={setIsOpened}
                />
              </nav>

              {/*log in, sign up cart*/}
              <SubNavigationList
                isLoading={userLoading}
                isArtist={isArtist}
                isActivated={isActivated}
                isLogged={isLogged}
                cartCounter={cartCounter || 0}
                logout={logout}
                setFeedback={actions.setFeedbackModal}
              />

              <div
                className={`${styles.navigation__shadow} ${
                  isOpened ? styles.opened : ''
                }`}
              />

              <Socials className={styles.socials} />

              <SignInBlock isLogged={isLogged} setIsOpened={setIsOpened} />
            </div>

            <ToggleButton
              className={styles.toggle}
              toggle={() => onToggle()}
              opened={isOpened}
            />

            <TopCornerButton
              user={{ ...user }}
              loading={userLoading}
              isActivated={isActivated}
              isDeleted={isDeleted}
              onDownload={() => setIsOpenArtistModal(true)}
            />

            <div
              className={`${styles.backdrop} ${isOpened ? styles.show : ''}`}
              onClick={() => onToggle()}
            />
          </div>
        </div>
        <div className={styles.shadow} />
      </header>

      <div className={`${styles.search__mobile} ${search && styles.open}`}>
        <div>
          <MobileSearchBar
            handleSearch={handleSearch}
            onSearch={() => {
              setSearch(!search);
            }}
          />
        </div>
      </div>

      {isArtist && (
        <ArtistCardDownloadModal
          id={user.id}
          open={isOpenArtistModal}
          handleClose={() => setIsOpenArtistModal(false)}
        />
      )}
    </>
  );
}

function mapStateToProps(state) {
  const { artwork, navbar } = state;
  const loading = state.user.query.fetching;

  return {
    isNavBarMenuOpened: navbar.isNavBarMenuOpened,
    user: state.user.account,
    userLoading: loading,
    username: artwork
      ? artwork.artworkData.currentArtwork.authorInfo.username
      : '',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setFeedbackModal,
        getPublicArtworks,
        getPublicArtist,
        getPublicArtwork,
        getNavbarData,
        deleteUserData,
        setInitialState,
        setUserCartCounter,
        resetFilters,
        setFilter,
        setIsNavBarMenuWithTimeout,
      },
      dispatch
    ),
  };
}

MainNavbar.propTypes = {
  user: shape({
    token: string,
    cartCounter: number,
    is_artist: bool,
  }),
  userLoading: bool,
  username: string,
  actions: objectOf(func),
  history: shape({
    push: func,
  }),
  location: objectOf(string),
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainNavbar)
);
