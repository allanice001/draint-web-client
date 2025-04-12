import React, { useState } from 'react';
import { array, bool, func, object, shape } from 'prop-types';

import Icons from 'components/icons';
import { Link } from 'react-router-dom';
import NavButton from './nav-button';
import { SEARCH_ARTWORKS } from 'constants/routes/publicModule/artwork';
import SignInBlock from './sign-in-block';
import Tab from './tab';
import { artworksLinks } from 'constants/components/navbar/links';
import { connect } from 'react-redux';
import cx from 'classnames';
import styles from './sub-menu.module.scss';

function ArtworksSubMenu({
  handleSearch = () => {},
  navbar: {
    mediums = [],
    hashtags = [],
    styles: style = [],
    allProperties = {},
  },
  onBack = () => {},
  isLogged,
  setIsOpened,
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className={styles.header}>
        <button type="button" className={styles.arrow} onClick={onBack}>
          <Icons.ArrowRight className={styles.arrow__icon} />
        </button>
        Artworks
      </div>
      <div className={`${styles.column} ${styles.main}`}>
        {artworksLinks.map(({ to, title, subtitle, Icon }, i) => (
          <div
            className={`${styles.title_block} ${i === 0 ? styles.first : ''}`}
            key={title}
          >
            <Link
              to={to}
              className={styles.title}
              onClick={() => setIsOpened(false)}
            >
              {title}
              {Icon && <Icon className={styles.linkIcon} />}
            </Link>
            <div className={cx(styles.subtitle, styles.default)}>
              {subtitle}
            </div>
          </div>
        ))}

        <div className={`${styles.title_block} ${styles.main}`}>
          <Link
            to={SEARCH_ARTWORKS}
            className={styles.title}
            onClick={() => setIsOpened(false)}
          >
            Artworks page
          </Link>
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.popular_block}>
          <div className={cx(styles.subtitle, styles.dot)}>Style</div>
          {style.map(item => (
            <NavButton
              search={[item.style]}
              type="style"
              handleSearch={handleSearch}
              label={item.style}
              key={item.style}
              isLast={false}
              isNoPlus={false}
            />
          ))}
          <NavButton
            search={[]}
            type="style"
            handleSearch={handleSearch}
            label="Browse all Styles"
            setActiveTab={() => setActiveTab(1)}
            isNoPlus={false}
            isLast
            setIsOpened={setIsOpened}
          />

          <Tab
            list={allProperties.styles}
            tabLabel="Browse styles"
            isActive={activeTab === 1}
            isArtist={false}
            handleSearch={handleSearch}
            type="style"
            getSearch={key => [key]}
            onBack={() => setActiveTab('')}
            setIsOpened={setIsOpened}
          />
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.popular_block}>
          <div className={cx(styles.subtitle, styles.dot)}>Medium</div>
          {mediums.map(item => (
            <NavButton
              search={[item.medium]}
              type="medium"
              handleSearch={handleSearch}
              label={item.medium}
              key={item.medium}
              isLast={false}
              isNoPlus={false}
              setIsOpened={setIsOpened}
            />
          ))}
          <NavButton
            search={[]}
            type="medium"
            handleSearch={handleSearch}
            label="Browse all Mediums"
            setActiveTab={() => setActiveTab(2)}
            isNoPlus={false}
            isLast
            setIsOpened={setIsOpened}
          />

          <Tab
            list={allProperties.mediums}
            tabLabel="Browse Mediums"
            isActive={activeTab === 2}
            isArtist={false}
            handleSearch={handleSearch}
            type="medium"
            getSearch={key => [key]}
            onBack={() => setActiveTab('')}
            setIsOpened={setIsOpened}
          />
        </div>
      </div>

      <div className={`${styles.column} ${styles.last}`}>
        <div className={styles.popular_block}>
          <div className={cx(styles.subtitle, styles.dot)}>Hashtags</div>
          {hashtags.map(item => (
            <NavButton
              search={[item.name]}
              type="hashtag"
              handleSearch={handleSearch}
              label={`#${item.name}`}
              key={item.name}
              isLast={false}
              isNoPlus={false}
              setIsOpened={setIsOpened}
            />
          ))}
          <NavButton
            search={[]}
            type="hashtag"
            handleSearch={handleSearch}
            label="Browse all Hashtags"
            setActiveTab={() => setActiveTab(3)}
            isNoPlus={false}
            isLast
            setIsOpened={setIsOpened}
          />

          <Tab
            list={hashtags.map((el, id) => ({
              label: `#${el.name}`,
              key: el.name,
              id,
            }))}
            tabLabel="Browse Hashtags"
            isActive={activeTab === 3}
            isArtist={false}
            handleSearch={handleSearch}
            type="hashtag"
            getSearch={key => key}
            onBack={() => setActiveTab('')}
            setIsOpened={setIsOpened}
          />
        </div>
      </div>

      <SignInBlock isLogged={isLogged} setIsOpened={setIsOpened} />
    </>
  );
}

ArtworksSubMenu.propTypes = {
  navbar: shape({
    mediums: array,
    hashtags: array,
    styles: array,
    allProperties: object,
  }).isRequired,
  handleSearch: func.isRequired,
  onBack: func.isRequired,
  isLogged: bool.isRequired,
};

const mapStateToProps = state => ({
  navbar: state.navbar,
  isLogged: !!state.user.account.token,
});

export default connect(mapStateToProps)(ArtworksSubMenu);
