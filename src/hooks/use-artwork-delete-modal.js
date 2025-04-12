import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import { MODAL_CONTENT } from 'constants/components/artwor-delete-modal/artwork-delete-modal';
import { useSelector } from 'react-redux';

function useArtworkDeleteModal() {
  const Analytic = AnalyticHelper.create();

  const { id: deletedByAccount, username: accountUserName } = useSelector(
    store => store.user.account
  );

  const { username: ownerUserName } = useSelector(
    store => store.artwork.artworkData.currentArtwork.ownerInfo
  );

  const isOwner = accountUserName === ownerUserName;

  return {
    isOwner,
    ownerUserName,
    deletedByAccount,
    Analytic,
    MODAL_CONTENT,
  };
}

export default useArtworkDeleteModal;
