import React, { useEffect, useRef } from 'react';
import Icons from 'components/icons';
import { Image } from 'components/lib';
import { NavLink } from 'react-router-dom';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import staticUrls from 'constants/images/static-urls';
import styles from './artists-experience.module.scss';

export const ArtistsExperienceCard = ({
  data,
  editable,
  isEditorOrAdmin,
  handleUpdate,
  handleDelete,
  changeSlideHeight,
}) => {
  const itemRef = useRef();
  useEffect(() => {
    if (changeSlideHeight && itemRef.current) {
      changeSlideHeight(itemRef.current.offsetHeight);
    }
  }, [itemRef, changeSlideHeight]);

  const artistUrl = getArtistGalleryURL(data.username);

  return (
    <div className={styles.card} ref={itemRef}>
      <NavLink to={data.is_artist ? artistUrl : false}>
        <Image
          alt={data.username}
          className={styles.card__img}
          src={data.url}
          defaultSrc={staticUrls.image.defaultArtist}
          title={data.username}
        />
      </NavLink>
      <div className={styles.title_wrapper}>
        <Icons.Quote className={styles.quote} />
        <h3 className={styles.card__title}>{data.title}</h3>
      </div>
      <p className={styles.card__description}>{data.description}</p>
      {editable && isEditorOrAdmin && (
        <div className={styles.card__buttons}>
          <button
            type="button"
            className={styles.button}
            onClick={() => handleUpdate(data.id)}
          >
            <Icons.Edit />
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => handleDelete(data.id)}
          >
            <Icons.Trash />
          </button>
        </div>
      )}
    </div>
  );
};
