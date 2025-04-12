import { ARTIST_FILTERS, FIELD_TYPE } from 'constants/components/homepage';
import React, { useRef, useState } from 'react';
import {
  defaultArtistFilter,
  getOption,
  getPagination,
  transformFilters,
} from 'helpers/homepage/artworksFilters';
import { useDispatch, useSelector } from 'react-redux';
import ArtistLongCard from 'components/artist/artist-long-card/artist-long-card';
import { HomepageArtworksFilters } from 'components/filters/homepage-artworks-filters';
import Icons from 'components/icons';
import { PAINTINGS_BY_ARTISTS } from 'constants/components/home-page';
import cx from 'classnames';
import { getPaintingsByArtist } from 'redux/master/actions/homepage-paintings-by-artists-actions';
import styles from './paintings-by-artists.module.scss';
import useTheme from 'hooks/use-theme';

const PaintingsByArtists = () => {
  const dispatch = useDispatch();
  const paintingsRef = useRef();
  const { isDesktop, isTablet } = useTheme();

  const { paintings } = useSelector(state => state.home.paintings);
  const { paginations } = useSelector(state => state.home.paintings);

  const [filter, setFilter] = useState(defaultArtistFilter(ARTIST_FILTERS));
  const [isShow, setShow] = useState(false);
  const [newFilter, setNewFilter] = useState(false);

  const scrollToStart = el => {
    window.scrollTo({
      top: el.offsetTop - 100 > 0 ? el.offsetTop - 100 : 0,
      left: 0,
    });
    el.scrollTo({ top: 0, left: 0 });
  };

  const handlePageChanged = () => {
    const pagination = {
      page: paginations.page,
      pageSize: paginations.pageSize + 8,
    };

    setFilter(prevFilter => ({ ...prevFilter, ...pagination }));
    const newFilter = transformFilters({ filter, pagination });
    dispatch(getPaintingsByArtist(newFilter));
  };

  const handleBackToStart = () => {
    scrollToStart(paintingsRef.current);
    setShow(false);
    const pagination = getPagination(paginations.page);
    setFilter(prevFilter => ({ ...prevFilter, ...pagination }));
    const newFilter = transformFilters({ filter, pagination });
    dispatch(getPaintingsByArtist(newFilter));
  };

  const handleFilterChanged = item => {
    const option = getOption({ filters: ARTIST_FILTERS, item });
    const pagination = getPagination(1, filter);
    setFilter(prevFilter => ({
      ...prevFilter,
      [item.key]: option,
      ...pagination,
    }));

    const newFilter = transformFilters({
      filter,
      item,
      pagination,
      option,
    });
    setNewFilter(newFilter);
  };

  const handleAutoFilterChanged = item => {
    const option = getOption({ filters: ARTIST_FILTERS, item });
    const pagination = getPagination(1, filter);
    setFilter(prevFilter => ({
      ...prevFilter,
      [item.key]: option,
      ...pagination,
    }));

    const newFilter = transformFilters({
      filter,
      item,
      pagination,
      option,
    });
    setNewFilter(newFilter);
    dispatch(getPaintingsByArtist(newFilter));
  };

  const handleSearch = () => {
    dispatch(getPaintingsByArtist(newFilter));
  };

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.text_container}>
          <h2 className={styles.title}>{PAINTINGS_BY_ARTISTS.title}</h2>
        </div>
        <div>
          {isDesktop || isTablet ? (
            <div className={styles.form_wrapper}>
              <HomepageArtworksFilters
                centerLabel={true}
                filter={filter}
                setFilter={handleFilterChanged}
                filterList={ARTIST_FILTERS}
                isCountry
                type={FIELD_TYPE.NO_BORDER}
              />
              <button
                type="button"
                className={cx('primary-button', styles.input_button)}
                onClick={handleSearch}
              >
                <Icons.SearchContactIcon />
              </button>
            </div>
          ) : (
            <div className={styles.wrapper}>
              <HomepageArtworksFilters
                centerLabel={true}
                filter={filter}
                setFilter={handleAutoFilterChanged}
                filterList={ARTIST_FILTERS}
                isCountry
                type={FIELD_TYPE.SQUARE}
              />
            </div>
          )}
        </div>
        {paintings.length ? (
          <div className={styles.card_container} ref={paintingsRef}>
            {paintings.map(artist => {
              return (
                <div className={styles.card_wrapper} key={artist.id}>
                  <ArtistLongCard artist={artist} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.text_container}>
            <h3 className={styles.title}>{PAINTINGS_BY_ARTISTS.no_found}</h3>
          </div>
        )}
        {paintings.length >= paginations.pageSize && (
          <div className={styles.button_container}>
            <button
              type="button"
              className={cx('primary-button', styles.show_more_button)}
              onClick={() => {
                setShow(true);
                handlePageChanged();
              }}
            >
              {PAINTINGS_BY_ARTISTS.button_show}
            </button>

            {isShow && (
              <button
                type="button"
                className="secondary-button"
                onClick={handleBackToStart}
              >
                {PAINTINGS_BY_ARTISTS.button_back}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PaintingsByArtists;
