import ArtistVerification from './artist-verification';
import ArtworkVerification from './artwork-verification';
import React from 'react';
import { useSelector } from 'react-redux';

function VerificationButtons({
  artist = false,
  artwork = false,
  artworkId,
  artistId,
  status,
  artworkDeleted,
  isOwnerCanEditArtwork,
  isSold,
}) {
  const { permission, new_permission } = useSelector(
    store => store.user.account
  );

  function isMaster() {
    const isAdminRole = new_permission === 'admin';
    const isEditorRole = new_permission === 'editor';
    const isSuperAdmin = permission === 'master';

    return isAdminRole || isEditorRole || isSuperAdmin;
  }

  return (
    <>
      {isMaster() && artist && <ArtistVerification />}

      {isMaster() && artwork && (
        <ArtworkVerification
          artworkId={artworkId}
          artistId={artistId}
          status={status}
          artworkDeleted={artworkDeleted}
          isOwnerCanEditArtwork={isOwnerCanEditArtwork}
          isSold={isSold}
        />
      )}
    </>
  );
}

export default VerificationButtons;
