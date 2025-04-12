import { Card, CardContent } from '@material-ui/core';
import { INVENTORY, SOLD } from 'constants/artwork-sale-statuses';
import { bool, func, shape, string } from 'prop-types';

import { Artwork } from 'models';
import { ArtworkCard } from 'components/artwork/artwork-card/artwork-card';
import ArtworkVerificationButtons from './artwork-verify-buttons';
import Button from '@material-ui/core/Button';
import React from 'react';
import { RecoverButton } from 'components/artwork/artwork-page-deleted/recover-button';
import cx from 'classnames';
import getSaleStatus from 'services/artwork-sale-service';
import { roles } from 'helpers/get-role';
import styles from './artwork-masters-card.module.scss';
import { useSelector } from 'react-redux';

const format = date => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleString('en-US', options);
};

function ArtworkMasterCard({
  onVerify,
  artwork,
  isCatalog,
  addToCatalog,
  className,
  onRecover,
}) {
  const { permission, new_permission } = useSelector(
    store => store.user.account
  );
  const role = roles({ permission, new_permission });
  const {
    deleted_at: deletedArtwork,
    account_deleted: accountDeleted,
    verification,
  } = artwork;
  const saleStatus = getSaleStatus(artwork);
  const {
    id,
    first_name,
    email,
    username,
    last_name,
    avatar_url,
    small_avatar,
    IsArtworkHaveActiveOrders,
  } = artwork;

  function isBeforeDeadline(deletedAt) {
    const today = Date.now();
    const deadline = Date.parse(deletedAt);
    return today > deadline;
  }

  return (
    <Card key={id} className={className || styles.wrapper}>
      <ArtworkCard
        fluid
        artworkMasterCard
        artwork={Artwork.create({
          ...artwork,
          profile: {
            first_name,
            email,
            username,
            last_name,
            avatar_url,
            small_avatar,
          },
        })}
      />

      <CardContent className={styles.content}>
        <div className={styles.status}>
          <div className={cx(styles.verification, verification)}>
            {!verification ? 'Pending' : verification}
          </div>
          <div className={cx(styles.verification, saleStatus)}>
            {saleStatus}
          </div>
        </div>

        {deletedArtwork && !accountDeleted && (
          <div className={styles.deleted_date}>
            Restore until: {format(deletedArtwork)}
          </div>
        )}

        {!isCatalog && !deletedArtwork && !accountDeleted && (
          <ArtworkVerificationButtons
            id={artwork.id}
            onVerify={onVerify}
            verification={verification}
            disabled={Boolean(deletedArtwork)}
            disableAll={
              Boolean(deletedArtwork) ||
              Boolean(accountDeleted) ||
              IsArtworkHaveActiveOrders ||
              saleStatus === SOLD ||
              saleStatus === INVENTORY
            }
          />
        )}

        {!isCatalog && deletedArtwork && !accountDeleted && (
          <RecoverButton
            artworkId={artwork.id}
            accountId={artwork.account_id}
            onRecover={onRecover}
          />
        )}

        {isCatalog && (
          <Button
            disabled={!role.isEditorOrAdmin}
            variant="contained"
            color="primary"
            className="resize-artwork-button"
            onClick={() => addToCatalog(artwork.id)}
          >
            Add To Catalog
          </Button>
        )}
      </CardContent>

      {accountDeleted && (
        <div className={styles.delete}>
          Account deleted <br /> {format(accountDeleted)}
        </div>
      )}

      {!accountDeleted &&
        deletedArtwork &&
        isBeforeDeadline(deletedArtwork) && (
          <div className={styles.delete}>Artwork deleted</div>
        )}
    </Card>
  );
}

ArtworkMasterCard.propTypes = {
  onVerify: func,
  artwork: shape({
    id: string,
    artist_id: string,
    account_id: string,
    title: string,
    for_sale: bool,
    owner: string,
    price: string,
    primary_image: string,
    small_image: string,
    verification: string,
    first_name: string,
    last_name: string,
    username: string,
  }).isRequired,
};

export default ArtworkMasterCard;
