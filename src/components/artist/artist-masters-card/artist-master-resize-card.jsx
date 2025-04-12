import { Button, Card, CardActions, CardContent } from '@material-ui/core';
import { func, shape, string } from 'prop-types';
import { getName, sliceText } from 'services/global';

import { Link } from 'react-router-dom';
import React from 'react';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import styles from './artist-masters-card.module.scss';

function ArtistMasterResizeCard({ account, onResize }) {
  const accountName = getName(account.first_name, account.last_name);
  const username = encodeURIComponent(account.username);

  const accountUsername = account.username.includes('/')
    ? `${account.username.replace('/', '%2F')}`
    : account.username;

  const getSrc = () =>
    account.small_avatar ||
    account.featured_background_url ||
    account.verification_image ||
    account.avatar_url;

  return (
    <Card key={`account-${account.id}`} className={styles.wrapper}>
      <Link to={getArtistGalleryURL(username)}>
        <img
          alt={accountUsername}
          className={styles.img}
          src={getSrc()}
          title={accountUsername}
        />
      </Link>
      <CardContent>
        <div className={styles.name}>
          <span>{sliceText(accountName, 20, '...')}</span>
        </div>
        <div className={styles.username}>({accountUsername})</div>
        <a href={`mailto:${account.email}`}>{account.email}</a>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onResize(account, account.id)}
        >
          Resize
        </Button>
      </CardActions>
    </Card>
  );
}

ArtistMasterResizeCard.propTypes = {
  onResize: func.isRequired,
  account: shape({
    id: string.isRequired,
    first_name: string.isRequired,
    last_name: string.isRequired,
    username: string.isRequired,
    small_avatar: string.isRequired,
    featured_background_url: string.isRequired,
    verification_image: string.isRequired,
    avatar_url: string.isRequired,
    email: string.isRequired,
  }).isRequired,
};

export default ArtistMasterResizeCard;
