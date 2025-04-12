import {
  DEVICE,
  FIELD_TYPE,
  HOVER_FROM,
  INITIAL_ARTWORKS_LIMIT_BY_PRICE,
  LIST_OF_PAGE_SIZE,
  PAINTINGS_HEADER_FILTER_BY_PRICE,
  PRICE_FILTER,
} from 'constants/components/homepage';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Artwork } from 'models';
import { ArtworkCard } from 'components/artwork/artwork-card/artwork-card';
import { HomepageArtworksFilters } from 'components/filters/homepage-artworks-filters';
import Pagination from 'components/collector/collector-offers/components/pagination/pagination';
import { onArtworksChanged } from 'redux/homepage/actions/homepageActions';
import styles from './home.module.scss';

export const ArtworksFiltersByPrice = () => {
  const [filter, setFilter] = useState({
    sortByUserCountry: true,
    page: 1,
    pageSize: INITIAL_ARTWORKS_LIMIT_BY_PRICE[DEVICE],
    price: PRICE_FILTER.options[0],
  });
  const dispatch = useDispatch();
  const listRef = useRef();

  const { artworksByPrice } = useSelector(state => state.home.homepage);

  const handleArtworksFilterChanged = item => {
    const option = PRICE_FILTER.options.find(({ key }) => key === item.value);
    const newFilter = { ...filter, price: option, page: 1 };
    setFilter(newFilter);
    dispatch(onArtworksChanged({ ...newFilter, price: option.res }));
  };

  const handleArtworksPageChanged = (page = 1) => {
    setFilter(prevFilter => ({ ...prevFilter, page }));
    dispatch(onArtworksChanged({ ...filter, page, price: filter.price.res }));
    scrollToStart(listRef.current);
  };

  const handleListOfPageSizeChanged = (pageSize = 16) => {
    setFilter(prevFilter => ({ ...prevFilter, page: 1, pageSize }));
    dispatch(
      onArtworksChanged({
        ...filter,
        pageSize,
        page: 1,
        price: filter.price.res,
      })
    );
    scrollToStart(listRef.current);
  };

  const scrollToStart = el => {
    el.scrollIntoView();
  };

  return artworksByPrice ? (
    <div ref={listRef} className={styles.filter_wrapper}>
      <h3 className="group-title">{PAINTINGS_HEADER_FILTER_BY_PRICE.title}</h3>
      <p className="group-subtitle">{PAINTINGS_HEADER_FILTER_BY_PRICE.text}</p>
      <div className={styles.filter_container}>
        <HomepageArtworksFilters
          centerLabel={true}
          filter={filter}
          type={FIELD_TYPE.SQUARE}
          setFilter={handleArtworksFilterChanged}
          filterList={[PRICE_FILTER]}
        />
      </div>

      {artworksByPrice.artworks.length ? (
        <div className={styles.filter_wrapper__list}>
          {artworksByPrice.artworks.map(artwork => (
            <ArtworkCard
              fluid
              showMore
              fullArtworkInfo={artwork}
              addToCartFrom={HOVER_FROM.artworkCard}
              artwork={Artwork.create(artwork)}
              key={`${artwork.id}filterByPrice`}
            />
          ))}
          <Pagination
            listOfPageSize={LIST_OF_PAGE_SIZE}
            page={+artworksByPrice.pagination?.page}
            setPage={handleArtworksPageChanged}
            count={artworksByPrice.artworks.length}
            maxCount={artworksByPrice.pagination?.rowCount}
            pages={artworksByPrice.pagination?.pageCount}
            setCount={handleListOfPageSizeChanged}
            type={'artworkList'}
            countForm
          />
        </div>
      ) : null}
    </div>
  ) : null;
};
