import { Artwork } from 'models';
import { ArtworkCard } from '../artwork-card/artwork-card';
import { Carousel } from '../../carousel/carousel';
import { Link } from '../../link/link';
import React from 'react';
import { SEARCH_ARTWORKS } from 'constants/routes/publicModule/artwork';
import styles from './artwork-carousel.module.scss';

const ArtworkCarousel = ({
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
  const data = loading ? Array.from(new Array(8)) : list.map(Artwork.create);

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <h3 className="group-title">{title}</h3>
        {subtitle && <p className="group-subtitle">{subtitle}</p>}

        <Carousel
          list={data}
          limit={8}
          item={(artwork, i) => (
            <ArtworkCard
              artwork={artwork}
              carousel
              key={artwork ? artwork.id : i}
            />
          )}
          page={page}
          pages={pages}
          onNext={onNext}
          onPrev={onPrev}
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

export { ArtworkCarousel };
