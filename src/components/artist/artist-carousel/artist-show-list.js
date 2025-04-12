import React, { useRef } from 'react';

import { Artist } from 'models';
import ArtistLongCard from '../artist-long-card/artist-long-card';
import ArtistLongCardSkeleton from '../../skeletons/artist-long-card/artist-long-card-sk';
import { Link } from '../../link/link';
import { SEARCH_ARTISTS } from 'constants/routes/publicModule/artist';
import { ShowMore } from '../../carousel/show';
import styles from './artist-carousel.module.scss';

const ArtistShowList = ({
  list,
  onNext,
  onPrev,
  page,
  pages,
  title,
  loading,
}) => {
  const listRef = useRef();

  const scrollToStart = el => {
    el.scrollIntoView();
  };

  const data = loading
    ? [...list.map(Artist.create), ...Array.from(new Array(8))]
    : list.map(Artist.create);

  return (
    <section ref={listRef}>
      <div className={`container ${styles.container}`}>
        <h3 className="group-title">{title}</h3>

        <ShowMore
          list={data}
          limit={8}
          page={page}
          pages={pages}
          onNext={onNext}
          onPrev={onPrev}
          scrollToStart={() => scrollToStart(listRef.current)}
          item={(artist, i) =>
            artist ? (
              <ArtistLongCard artist={artist} key={artist.id} />
            ) : (
              <ArtistLongCardSkeleton key={i} />
            )
          }
          button={
            <Link url={SEARCH_ARTISTS} className="secondary-button">
              Discover all Artists
            </Link>
          }
        />
      </div>
    </section>
  );
};

export { ArtistShowList };
