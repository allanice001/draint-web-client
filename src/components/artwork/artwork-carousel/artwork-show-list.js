import React, { useRef } from 'react';

import { Artwork } from 'models';
import { ArtworkCard } from '../artwork-card/artwork-card';
import { Link } from '../../link/link';
import { SEARCH_ARTWORKS } from 'constants/routes/publicModule/artwork';
import { ShowMore } from '../../carousel/show';
import styles from './artwork-carousel.module.scss';

const ArtworkShowList = ({
  list,
  onNext,
  onPrev,
  page,
  pages,
  title,
  subtitle,
  button = true,
  loading,
}) => {
  const listRef = useRef();
  const scrollToStart = el => {
    el.scrollIntoView();
  };
  const data = !loading
    ? list.map(Artwork.create)
    : list.map(Artwork.create).concat(Array.from(new Array(8)));

  return (
    <section ref={listRef}>
      <div className={`container ${styles.container}`}>
        <h3 className="group-title">{title}</h3>
        {subtitle && <p className="group-subtitle">{subtitle}</p>}

        <ShowMore
          list={data}
          limit={8}
          item={(artwork, i) => (
            <ArtworkCard artwork={artwork} key={artwork ? artwork.id : i} />
          )}
          page={page}
          pages={pages}
          onNext={onNext}
          onPrev={onPrev}
          scrollToStart={() => scrollToStart(listRef.current)}
          button={
            button ? (
              <Link url={SEARCH_ARTWORKS} className="secondary-button">
                Discover all Artworks
              </Link>
            ) : (
              ''
            )
          }
        />
      </div>
    </section>
  );
};

export { ArtworkShowList };
