import {
  ACCOUNT_ARTWORKS,
  ARTIST,
  COLLECTOR,
  DELETED,
  NO_INSTAGRAM,
  PENDING,
  SUPER_ADMIN,
  USER,
} from 'constants/components/master/artists';
import { Button, Card, CardContent } from '@material-ui/core';
import { List, Record } from 'components/shared/list';
import React, { useEffect, useMemo, useState } from 'react';

import { bool, func, shape, string } from 'prop-types';
import { Artist } from 'models';
import ArtistCardDownloadButton from './artist-card-download-button';
import ArtistCertificate from 'components/icons/artist-certificate';
import ArtistLongCard from 'components/artist/artist-long-card/artist-long-card';
import ArtistVerificationButtons from './artist-verify-buttons';
import Icons from 'components/icons';
import RatingIcon from './rating-icon';
import cx from 'classnames';
import { hasInstagramLink } from 'helpers/instagram-url-checker';
import { permissions } from 'constants/permissions';
import styles from './artist-masters-card.module.scss';
import { updateArtistRating } from 'redux/master/actions/currentArtistActions';
import { useDispatch } from 'react-redux';

const format = date => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleString('en-US', options);
};

function ArtistMasterCard({
  account,
  onVerify,
  onSettings,
  onDownload,
  permission,
}) {
  const {
    id,
    email,
    rating,
    instagram,
    deleted_at,
    is_artist,
    is_activated,
    verification,
    small_avatar,
    featured_background_url,
    verification_image,
    avatar_url,
    country,
    IsArtistsHavePaidOrders,
    IsArtistsHaveVerifiedOrders,
  } = account;

  const dispatch = useDispatch();

  const [orderRating, setOrderRating] = useState(null);

  useEffect(() => {
    if (orderRating) {
      dispatch(updateArtistRating(id, orderRating));
    }
  }, [dispatch, id, orderRating]);

  const downloadDisabled = !(
    small_avatar ||
    featured_background_url ||
    verification_image ||
    avatar_url
  );

  const accountInstagram = useMemo(
    () =>
      hasInstagramLink(instagram) ? (
        <a href={instagram} target="_blank" rel="noopener noreferrer">
          Instagram profile
        </a>
      ) : (
        NO_INSTAGRAM
      ),
    [instagram]
  );

  function getUserRole() {
    return is_artist ? ARTIST : COLLECTOR;
  }

  const getUserAdminRole = account => {
    return (
      <>
        <span>Role: </span>
        <span className={styles.permission}>
          {account.permission === permissions.MASTER
            ? SUPER_ADMIN
            : account.new_permission === permissions.EDITOR_OLD
            ? USER
            : account.new_permission}
        </span>
      </>
    );
  };

  return (
    <Card key={`account-${id}`} className={styles.wrapper}>
      {!permission && (
        <ArtistCardDownloadButton
          onClick={onDownload}
          id={id}
          disabled={downloadDisabled}
        />
      )}
      <ArtistLongCard
        artist={Artist.create({
          ...account,
          artworks: [],
          locations: {
            country,
          },
        })}
      />
      <CardContent className={styles.content}>
        <div className={styles.rating_wrapper}>
          <RatingIcon
            rating={rating}
            Icon={props => <Icons.IconStar {...props} />}
            setOrderRating={setOrderRating}
          />
        </div>
        <a className={styles.email} href={`mailto:${email}`} title={email}>
          {email}
        </a>
        {!permission && (
          <div className={styles.instagram}>{accountInstagram}</div>
        )}
        <div className={`${styles.email}, ${permission && styles.role}`}>
          {!permission ? getUserRole() : getUserAdminRole(account)}
        </div>

        {verification !== DELETED && (
          <div
            className={cx(styles.verification, {
              [verification]: verification,
              pending: true,
            })}
          >
            {!verification ? PENDING : verification}
          </div>
        )}
        {!permission && (
          <List className={styles.list}>
            {ACCOUNT_ARTWORKS.map(el => (
              <Record className={cx(styles.artworks, el.status)} key={el.key}>
                {`${el.label} - ${account[el.key]}`}
              </Record>
            ))}
          </List>
        )}
        {permission ? (
          <Button
            variant="contained"
            className={styles.settings}
            onClick={onSettings}
            disabled={false}
          >
            <ArtistCertificate width={20} height={20} />
          </Button>
        ) : (
          <ArtistVerificationButtons
            id={id}
            onVerify={onVerify}
            onSettings={onSettings}
            verification={verification}
            disabled={(is_artist && !is_activated) || !!deleted_at}
            disabledAll={
              !!deleted_at ||
              IsArtistsHavePaidOrders ||
              IsArtistsHaveVerifiedOrders
            }
          />
        )}
        {deleted_at && (
          <div className={styles.delete}>
            {getUserRole()} deleted <br /> {format(deleted_at)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

ArtistMasterCard.propTypes = {
  onVerify: func,
  onSettings: func.isRequired,
  onDownload: func,
  account: shape({
    id: string,
    verification: string,
    first_name: string,
    last_name: string,
    username: string,
    small_avatar: string,
    featured_background_url: string,
    verification_image: string,
    avatar_url: string,
    country: string,
    instagram: string,
    email: string,
    arts_pending: string,
    arts_verified: string,
    arts_unverified: string,
    is_activated: bool,
  }).isRequired,
};

export default ArtistMasterCard;
