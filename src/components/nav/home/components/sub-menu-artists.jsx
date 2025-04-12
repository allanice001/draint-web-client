import React, { useState } from 'react';
import { any, arrayOf, bool, func, shape } from 'prop-types';

import { Artist } from 'models/artist';
import Icons from 'components/icons';
import JoinUsButton from 'components/join-us/join-us-button';
import { Link } from 'react-router-dom';
import NavButton from './nav-button';
import { SEARCH_ARTISTS } from 'constants/routes/publicModule/artist';
import SignInBlock from './sign-in-block';
import Tab from './tab';
import { artistLinks } from 'constants/components/navbar/links';
import { connect } from 'react-redux';
import cx from 'classnames';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getRandomCountries } from 'helpers/navbar/getRandomCountries';
import styles from './sub-menu.module.scss';
import theme from 'config/mui-theme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function ArtistsSubMenu({
  isArtist,
  isLogged,
  handleSearch,
  onBack,
  setIsOpened,
  navbar: { latest, featured },
}) {
  const [countries] = useState(getRandomCountries());
  const [activeTab, setActiveTab] = useState(0);
  const maxMediaTablet = useMediaQuery(
    theme.breakpoints.down(theme.breakpoints.values.md)
  );

  return (
    <>
      <div className={styles.header}>
        <button type="button" className={styles.arrow} onClick={onBack}>
          <Icons.ArrowRight className={styles.arrow__icon} />
        </button>
        Artists
      </div>
      <div className={`${styles.column__wrapper}`}>
        <div className={`${styles.column} ${styles.main}`}>
          <div className={styles.sub_header}>For artists</div>

          {artistLinks(isArtist).map(({ to, title, subtitle }, i) => (
            <div
              className={cx(styles.title_block, {
                [styles.first]: i === 0,
              })}
              key={title}
            >
              {!isArtist ? (
                title !== 'Upgrade your Profile' ? (
                  <Link
                    to={to}
                    className={styles.title}
                    onClick={() => setIsOpened(false)}
                  >
                    {title}
                  </Link>
                ) : (
                  <JoinUsButton
                    name={title}
                    link={styles.title}
                    url={to}
                    setIsOpened={setIsOpened}
                  />
                )
              ) : (
                <Link
                  to={to}
                  className={styles.title}
                  onClick={() => setIsOpened(false)}
                >
                  {title}
                </Link>
              )}

              <div className={cx(styles.subtitle, styles.default)}>
                {subtitle}
              </div>
            </div>
          ))}

          <div className={`${styles.title_block} ${styles.main}`}>
            <Link
              to={SEARCH_ARTISTS}
              className={styles.title}
              onClick={() => setIsOpened(false)}
            >
              Artists Page
            </Link>
          </div>
        </div>

        <div className={`${styles.column} ${styles.artist}`}>
          <div className={styles.sub_header}>For collectors</div>

          <div className={styles.row}>
            <div className={styles.popular_block}>
              <div className={styles.subtitle}>Latest Artists on Draint</div>

              {latest.map(Artist.create).map(item => (
                <Link
                  to={getArtistGalleryURL(item.username)}
                  className={styles.item}
                  key={item.fullName}
                  onClick={() => setIsOpened(false)}
                >
                  {item.fullName}
                </Link>
              ))}

              <NavButton
                type="artist"
                label="See all latest artists"
                isLast
                isNoPlus={false}
                handleSearch={handleSearch}
                setActiveTab={() => setActiveTab(1)}
                search={[]}
                setIsOpened={setIsOpened}
              />

              {maxMediaTablet && (
                <Tab
                  list={latest.map(Artist.create)}
                  isActive={activeTab === 1}
                  isArtist
                  tabLabel="Latest Artists"
                  onBack={() => setActiveTab('')}
                  setIsOpened={setIsOpened}
                />
              )}
            </div>

            <div className={styles.popular_block}>
              <div className={styles.subtitle}>Featured artists</div>

              {featured.map(Artist.create).map(item => (
                <Link
                  to={getArtistGalleryURL(item.username)}
                  className={styles.item}
                  key={item.fullName}
                >
                  {item.fullName}
                </Link>
              ))}

              <NavButton
                type="artist"
                label="See all featured artists"
                isLast
                isNoPlus={false}
                handleSearch={handleSearch}
                setActiveTab={() => setActiveTab(2)}
                search={[]}
                setIsOpened={setIsOpened}
              />

              <Tab
                list={featured.map(Artist.create)}
                isActive={activeTab === 2}
                isArtist
                tabLabel="Featured Artists"
                onBack={() => setActiveTab('')}
                setIsOpened={setIsOpened}
              />
            </div>

            <div className={styles.popular_block}>
              <div className={styles.subtitle}>By Countries</div>

              {countries.map(country => (
                <NavButton
                  key={country.ccode}
                  type="country"
                  isLast={false}
                  isNoPlus={false}
                  search={[country.ccode]}
                  handleSearch={handleSearch}
                  label={country.cname}
                />
              ))}

              <NavButton
                type="artist"
                handleSearch={handleSearch}
                isLast
                label="Search by Country"
                search={[]}
                isNoPlus
                setIsOpened={setIsOpened}
              />
            </div>
          </div>
        </div>
      </div>
      <SignInBlock isLogged={isLogged} setIsOpened={setIsOpened} />
    </>
  );
}

ArtistsSubMenu.propTypes = {
  navbar: shape({
    latest: arrayOf(any).isRequired,
    featured: arrayOf(any).isRequired,
  }).isRequired,
  handleSearch: func.isRequired,
  onBack: func.isRequired,
  isLogged: bool.isRequired,
};

const mapStateToProps = state => ({
  navbar: state.navbar,
  isLogged: !!state.user.account.token,
});

export default connect(mapStateToProps)(ArtistsSubMenu);
