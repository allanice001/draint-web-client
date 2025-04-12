import { NavLink } from 'react-router-dom';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import styles from './artwork-card.module.scss';

export const ArtworkCardDescription = ({ maxWidth, artwork }) => {
  return (
    <div style={{ maxWidth }}>
      <h1 className={styles.title} title={artwork.title}>
        {artwork.title}
      </h1>
      <NavLink
        to={getArtistGalleryURL(artwork.artist.username)}
        className={styles.artist__name}
      >
        {artwork.artist.fullName}
      </NavLink>
      <i
        className={styles.artwork__details}
        title={`${artwork.size} ${artwork.mediumAndSurface}`}
      >
        {artwork.size}, {''}
        {artwork.medium ? artwork.mediumOnSurface : artwork.mediumAndSurface}
      </i>
    </div>
  );
};
