import { Artwork } from 'models/artwork';
import CountryRoundedFlag from 'components/artist/artist-country-flag/artist-country-flag';
import { NavLink } from 'react-router-dom';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { imageSizes } from 'constants/media-query/image-sizes';
import styles from './artwork-card.module.scss';

export const ArtistPopup = ({ artist }) => {
  if (!artist.artworks) {
    return null;
  }

  const list = artist.artworks.slice(0, 6).map(Artwork.create);
  const leftCount = artist.artworks.length - 6;

  return (
    <div className={styles.artistpopup__wrapper}>
      <div className={styles.artistpopup__artworks}>
        {list.map((artwork, i) => (
          <div className={styles.img__wrapper} key={artwork.id}>
            <img
              alt={artist.title}
              className={styles.img}
              srcSet={artwork.small_image || artwork.primary_image}
              sizes={imageSizes.SM}
              title={artist.title}
            />
            {leftCount > 0 && i === 5 && (
              <div className={styles.count}>+{leftCount}</div>
            )}
          </div>
        ))}
      </div>
      <NavLink to={getArtistGalleryURL(artist.username)}>
        <img
          alt={artist.fullName}
          className={styles.artistpopup__image}
          srcSet={artist.avatar}
          sizes={imageSizes.SM}
          title={artist.fullName}
        />
        <h5 className={styles.artistpopup__title}>{artist.fullName}</h5>
      </NavLink>
      <div style={{ margin: '10px' }}>
        <CountryRoundedFlag
          country={artist.country || artist.locationCountry}
          size={24}
          className={styles.country}
        />
      </div>
      <p className={styles.artistpopup__description}>{artist.description}</p>
    </div>
  );
};
