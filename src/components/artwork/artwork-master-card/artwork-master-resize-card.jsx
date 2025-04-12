import { ARTWORK_ROOT, ID } from 'constants/routes/publicModule/artwork';
import { Button, Card, CardActions, CardContent } from '@material-ui/core';
import { bool, func, shape, string } from 'prop-types';
import { getName, sliceText } from 'services/global';

import { Link } from 'react-router-dom';
import React from 'react';
import getSaleStatus from 'services/artwork-sale-service';
import styles from './artwork-masters-card.module.scss';

function ArtworkMasterResizeCard({ artwork, onResize }) {
  const artworkTitle = artwork.title
    ? sliceText(artwork.title, 15, '...')
    : `Title isn't specified`;
  const saleStatus = getSaleStatus(artwork);
  const artworkName = getName(artwork.first_name, artwork.last_name);
  const artworkUsername = artwork.username.includes('/')
    ? `${artwork.username.replace('/', '%2F')}`
    : artwork.username;

  return (
    <Card key={`artwork-${artwork.id}`} className={styles.wrapper}>
      <Link to={`${ARTWORK_ROOT}${ID}/${artwork.id}`}>
        <img
          alt={artworkUsername}
          className={styles.img}
          src={artwork.small_image || artwork.primary_image}
          title={artworkUsername}
        />
      </Link>
      <CardContent>
        <div className="d-flex j-between">
          <div className={styles.title}>{artworkTitle}</div>
        </div>
        <div className={styles.name}>
          <span>{sliceText(artworkName, 20, '...')}</span>
        </div>
        <div className={styles.username}>({artworkUsername})</div>
        <div
          className={`${styles.verification} ${saleStatus &&
            styles[saleStatus]}`}
        >
          {saleStatus}
        </div>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            onResize(artwork.primary_image, artwork.id, artwork.profile_id)
          }
        >
          Resize
        </Button>
      </CardActions>
    </Card>
  );
}

ArtworkMasterResizeCard.propTypes = {
  onResize: func.isRequired,
  artwork: shape({
    id: string.isRequired,
    artist_id: string.isRequired,
    title: string.isRequired,
    for_sale: bool.isRequired,
    owner: string.isRequired,
    first_name: string.isRequired,
    last_name: string.isRequired,
    username: string.isRequired,
    small_image: string.isRequired,
    primary_image: string.isRequired,
  }).isRequired,
};

export default ArtworkMasterResizeCard;
