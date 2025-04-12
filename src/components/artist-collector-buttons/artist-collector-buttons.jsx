import {
  ARTIST,
  BUTTON_TYPE,
  COLLECTOR,
  TITLE,
} from 'constants/components/artist-collector-button';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import style from './artist-collector-buttons.module.scss';
import updateUserProfileRole from 'redux/user/account/thunks/update-user-profile-role';
import { useCollectorTheme } from 'hooks/use-theme';
import { useHistory } from 'react-router';

export function ArtistCollectorButtons({ mobile, setIsOpened }) {
  const collectorArtistRef = useRef();
  useCollectorTheme(collectorArtistRef);

  const {
    account: { is_artist: isArtist, id: accountId, loading },
    account,
  } = useSelector(store => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isArtistUser, setIsArtistUser] = useState(isArtist);

  useEffect(() => {
    if (accountId) {
      setIsArtistUser(isArtist);
    }
  }, [accountId, isArtist]);

  function handleClick() {
    setIsArtistUser(!isArtist);
    // mobile nav menu
    mobile && setIsOpened(false);

    dispatch(updateUserProfileRole(account, history));
  }

  if (!accountId) return null;

  return (
    <>
      <div
        className={cx(style.artist_collector_header, {
          [style.artist_collector_header_desktop]: !mobile,
        })}
      >
        <span>{TITLE}</span>
      </div>
      <div
        className={cx(style.wrapper, {
          [style.wrapper_mobile]: mobile,
        })}
        ref={collectorArtistRef}
      >
        <button
          type={BUTTON_TYPE}
          name={ARTIST}
          className={cx(style.button, {
            [style.button_active]: isArtistUser,
            [style.button_mobile]: mobile,
          })}
          disabled={loading || !!isArtistUser}
          onClick={handleClick}
        >
          {ARTIST}
        </button>
        <button
          type={BUTTON_TYPE}
          name={COLLECTOR}
          className={cx(style.button, {
            [style.button_active]: !isArtistUser,
            [style.button_mobile]: mobile,
          })}
          disabled={loading || !!!isArtistUser}
          onClick={handleClick}
        >
          {COLLECTOR}
        </button>
      </div>
    </>
  );
}
