import {
  DIALOG_SETTINGS,
  EMPTY_COUNTRY,
  UNSUBSCRIBE_BUTTON,
} from 'constants/components/subscribed-artist';
import React, { useState } from 'react';
import AlertDialogDelete from 'components/alertDialog/alertDialogDelete';
import { Artist } from 'models';
import ArtistLongCard from 'components/artist/artist-long-card/artist-long-card';
import { ButtonRounded } from 'components/button-rounded/button-rounded';
import CountryRoundedFlag from 'components/artist/artist-country-flag/artist-country-flag';
import { Image } from 'components/image/image';
import { Link } from 'react-router-dom';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getFullName } from 'services/global';
import staticUrls from 'constants/images/static-urls';
import styles from './subscriptions-list.module.scss';
import { unsubscribeOfArtist } from 'redux/dashboard/actions/gallaryActions';
import { useDispatch } from 'react-redux';
import useTheme from 'hooks/use-theme';

const SubscribedArtistList = ({ subscription }) => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  const {
    username,
    avatar_url,
    first_name,
    last_name,
    is_username,
  } = subscription.profile;

  const locations = subscription.profile.locations;
  const countArtworks = subscription.profile.artworks.length;
  const url = getArtistGalleryURL(username);
  const fullName = getFullName(first_name, last_name, username);
  const { isDesktop } = useTheme();

  const handleUnsubscribe = () => {
    dispatch(unsubscribeOfArtist(subscription.id));
    setOpen(false);
  };

  return (
    <>
      <AlertDialogDelete
        openDialog={isOpen}
        dialogSettings={DIALOG_SETTINGS}
        handleDialog={() => {
          setOpen(false);
        }}
        deleteBackground={handleUnsubscribe}
      />
      {!isDesktop ? (
        <>
          <ArtistLongCard
            key={subscription.profile.id}
            artist={Artist.create({
              ...subscription.profile,
            })}
          />
          <div className={styles.unsubscribe_button}>
            <ButtonRounded
              classname={UNSUBSCRIBE_BUTTON.style}
              text={UNSUBSCRIBE_BUTTON.label}
              onClick={() => setOpen(true)}
            />
          </div>
        </>
      ) : (
        <div className={styles.container}>
          <div className={styles.user_wrapper}>
            <Link to={url}>
              <Image
                alt={fullName}
                className={styles.subscription_image}
                srcSet={avatar_url}
                defaultSrc={staticUrls.image.defaultArtist}
                title={fullName}
              />
            </Link>

            <div className={styles.name}>
              <Link to={url}>
                <span>
                  {getFullName(first_name, last_name, username, is_username)}
                </span>
              </Link>
            </div>
          </div>

          <div className={styles.country_section}>
            {locations ? (
              <CountryRoundedFlag
                className={styles.country}
                country={locations.country}
                city={locations.city}
                showCountryIso
                size={26}
              />
            ) : (
              <span>{EMPTY_COUNTRY}</span>
            )}
          </div>

          <span>{countArtworks} paintings</span>

          <ButtonRounded
            classname={UNSUBSCRIBE_BUTTON.style}
            text={UNSUBSCRIBE_BUTTON.label}
            disable={false}
            onClick={() => setOpen(true)}
          />
        </div>
      )}
    </>
  );
};

export default SubscribedArtistList;
