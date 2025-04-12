import { Card, CardContent } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { bool, func, number, shape, string } from 'prop-types';

import ArtistCardDownloadButton from './artist-card-download-button';
import ArtistLongCard from 'components/artist/artist-long-card/artist-long-card';
import ArtistVerificationButtons from './artist-verify-buttons';
import BasicModal from 'components/basic-modal/basic-modal';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getCountryCodeByName } from 'services/global';
import { getValidName } from 'helpers/artist-card/get-valid-name';
import { hasInstagramLink } from 'helpers/instagram-url-checker';
import styles from './artist-masters-card.module.scss';

const format = date => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleString('en-US', options);
};

function ArtistMasterMediaCard({
  account,
  onVerify,
  onDownload,
  isEditorOrAdmin,
}) {
  const [open, setOpen] = useState(false);

  const {
    created_at,
    instagram,
    id,
    image_url,
    image_urls,
    status,
    description,
    username,
    first_name,
    last_name,
  } = account;
  const createdAt = `Created at: ${format(created_at)}`;
  const instagramView = useMemo(
    () =>
      hasInstagramLink(instagram) ? (
        <a
          alt="Instagram profile"
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram profile
        </a>
      ) : (
        'No Instagram profile'
      ),
    [instagram]
  );

  const artistData = {
    fullName:
      !first_name && !last_name ? username : first_name + ' ' + last_name,
    country: getCountryCodeByName(account.country),
    avatar: image_urls[0] === null ? image_url : image_urls[0],
    artworks: [],
  };

  return (
    <>
      <Card key={id} className={styles.wrapper}>
        {image_urls[0] === null && isEditorOrAdmin && (
          <ArtistCardDownloadButton
            onClick={() => onDownload(image_url, id)}
            id={id}
          />
        )}
        <div onClick={() => setOpen(!open)}>
          <ArtistLongCard artist={artistData} />
        </div>
        <CardContent className={styles.content}>
          <div className={styles.instagram}>{instagramView}</div>
          <Link
            className={styles.draintProfile}
            to={getArtistGalleryURL(username)}
            target="_blank"
          >
            Draint profile
          </Link>
          <div>{createdAt}</div>
          <div className={cx(styles.verification, status)}>
            {!status ? 'Pending' : status}
          </div>
          {isEditorOrAdmin && (
            <ArtistVerificationButtons id={id} onVerify={onVerify} />
          )}
        </CardContent>
      </Card>
      {image_urls[0] !== null && (
        <BasicModal
          title={getValidName(
            `${account.first_name} ${account.last_name}`,
            username
          )}
          footer={description || ''}
          footerClassName={styles.modalFooter}
          isOpen={open}
          handleClose={() => setOpen(!open)}
          className={styles.cardWrapper}
        >
          {image_urls.map(imageURL => (
            <Card key={imageURL}>
              {isEditorOrAdmin && (
                <ArtistCardDownloadButton
                  onClick={() => onDownload(imageURL, id)}
                  id={id}
                />
              )}
              <ArtistLongCard
                artist={{
                  fullName: '',
                  avatar: imageURL,
                  artworks: [],
                }}
              />
            </Card>
          ))}
        </BasicModal>
      )}
    </>
  );
}

ArtistMasterMediaCard.propTypes = {
  onVerify: func.isRequired,
  onDownload: func.isRequired,
  image: shape({
    id: string.isRequired,
    verification: string.isRequired,
    first_name: string.isRequired,
    last_name: string.isRequired,
    username: string.isRequired,
    small_avatar: string.isRequired,
    featured_background_url: string.isRequired,
    verification_image: string.isRequired,
    avatar_url: string.isRequired,
    country: string.isRequired,
    instagram: string.isRequired,
    email: string.isRequired,
    arts_pending: number.isRequired,
    arts_verified: number.isRequired,
    arts_unverified: number.isRequired,
    is_activated: bool.isRequired,
  }).isRequired,
};

export default ArtistMasterMediaCard;
