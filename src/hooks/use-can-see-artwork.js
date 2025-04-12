import { ARTWORK_VERIFIED_STATUS } from '../constants/components/artwork-page';
import { MASTER_ROLE } from '../constants/permissions';
import { isEqual } from 'lodash';
import { useSelector } from 'react-redux';

const getState = state => {
  const {
    account,
    query: { fetching: isLoadingUser },
  } = state.user;
  const { currentArtwork } = state.artwork.artworkData;

  return {
    isLoadingArtwork: !currentArtwork.verification,
    isLoadingUser,
    isVerified: currentArtwork.verification === ARTWORK_VERIFIED_STATUS,
    isMaster: account.permission === MASTER_ROLE,
    isOwner: account.profile_id === currentArtwork.owner_profile_id,
    isEditor: account.new_permission === 'editor',
    isAdmin: account.new_permission === 'admin',
  };
};

function useCanSeeArtwork() {
  const {
    isLoadingUser,
    isLoadingArtwork,
    isVerified,
    isMaster,
    isOwner,
    isEditor,
    isAdmin,
  } = useSelector(getState, isEqual);

  return (
    !isLoadingUser &&
    !isLoadingArtwork &&
    (isVerified || isMaster || isOwner || isEditor || isAdmin)
  );
}

export default useCanSeeArtwork;
