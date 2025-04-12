import React, { useRef } from 'react';

import { Artwork } from 'models';
import { HOVER_FROM } from 'constants/components/homepage';
import { Link } from 'components/link/link';
import { SEARCH_ARTWORKS } from 'constants/routes/publicModule/artwork';
import { ShowMore } from 'components/carousel/show';
import styles from './artwork-style-list.module.scss';

const ArtworkStyleList = ({
  children,
  list,
  page,
  handlePage,
  headers,
  Component,
}) => {
  const listRef = useRef();

  const { pageCount: pages } = list.pagination || {};

  const scrollToStart = el => {
    el.scrollIntoView();
  };

  return (
    <section ref={listRef} className="container">
      <h3 className="group-title">{headers.title}</h3>
      <p className="group-subtitle">{headers.text}</p>
      {children}
      <ShowMore
        button={
          <Link className="secondary-button" url={SEARCH_ARTWORKS}>
            Discover all Artworks
          </Link>
        }
        className={`${!!list.styles ? styles.wrapper : ''}`}
        item={item => {
          if (list?.artworks?.length) {
            return (
              <Component
                showMore
                fluid
                fullArtworkInfo={item}
                addToCartFrom={HOVER_FROM.artworkCard}
                artwork={Artwork.create(item)}
                key={`${item.id}StyleList`}
              />
            );
          }
          return item && <Component key={item.id} item={item} />;
        }}
        list={list.artworks || list.styles}
        onNext={() => handlePage(page + 1)}
        onPrev={() => handlePage(1, 'less')}
        page={page}
        pages={pages}
        scrollToStart={() => scrollToStart(listRef.current)}
      />
    </section>
  );
};

ArtworkStyleList.defaultProps = {
  stylesPaginate: {},
  artworksPaginate: {},
};

export default ArtworkStyleList;
