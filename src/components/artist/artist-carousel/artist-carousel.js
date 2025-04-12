import { Artist } from 'models';
import ArtistLongCard from '../artist-long-card/artist-long-card';
import ArtistLongCardSkeleton from '../../skeletons/artist-long-card/artist-long-card-sk';
import { Carousel } from '../../carousel/carousel';
import { Link } from '../../link/link';
import React from 'react';
import { SEARCH_ARTISTS } from 'constants/routes/publicModule/artist';
import styles from './artist-carousel.module.scss';

// const getFullName = el => {
//   return `${el.first_name} ${el.last_name}`.trim();
// };

// const getProfileAvatar = el => {
//   return el.small_avatar || el.featured_background_url || el.avatar_url;
// };

const ArtistCarousel = ({
  list,
  onNext,
  onPrev,
  page,
  pages,
  title,
  loading,
}) => {
  const data = loading ? Array.from(new Array(8)) : list.map(Artist.create);

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <h3 className="group-title">{title}</h3>

        <Carousel
          list={data}
          limit={8}
          page={page}
          pages={pages}
          onNext={onNext}
          onPrev={onPrev}
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

export { ArtistCarousel };
