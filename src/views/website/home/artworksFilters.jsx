import {
  FIELD_TYPE,
  FILTERS,
  PAINTINGS_HEADER,
} from 'constants/components/homepage';
import React, { useState } from 'react';
import {
  defaultFilter,
  getOption,
  getPagination,
  transformFilters,
} from 'helpers/homepage/artworksFilters';
import { useDispatch, useSelector } from 'react-redux';
import { ArtworkCard } from 'components/artwork/artwork-card/artwork-card';
import ArtworkStyleList from 'components/artwork-style-list/artwork-style-list';
import { HomepageArtworksFilters } from 'components/filters/homepage-artworks-filters';
import { onArtworksChanged } from 'redux/homepage/actions/homepageActions';
import styles from 'views/website/home/home.module.scss';

export const ArtworksFilters = () => {
  const [filter, setFilter] = useState(defaultFilter(FILTERS));
  const dispatch = useDispatch();
  const { artworksPaginate } = useSelector(state => state.home.homepage);

  const handleArtworksPageChanged = (newPage = 1, type) => {
    const pagination = getPagination(newPage);
    setFilter(prevFilter => ({ ...prevFilter, ...pagination }));
    const newFilter = transformFilters({ filter, pagination });
    dispatch(onArtworksChanged(newFilter, type));
  };

  const handleArtworksFilterChanged = item => {
    const option = getOption({ filters: FILTERS, item });
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
    dispatch(onArtworksChanged(newFilter));
  };

  return artworksPaginate ? (
    <ArtworkStyleList
      Component={ArtworkCard}
      headers={PAINTINGS_HEADER}
      handlePage={handleArtworksPageChanged}
      list={artworksPaginate}
      page={filter.page}
    >
      <div className={styles.filter_delimiter}>
        <HomepageArtworksFilters
          filter={filter}
          setFilter={handleArtworksFilterChanged}
          filterList={FILTERS}
          type={FIELD_TYPE.SQUARE}
        />
      </div>
    </ArtworkStyleList>
  ) : null;
};
