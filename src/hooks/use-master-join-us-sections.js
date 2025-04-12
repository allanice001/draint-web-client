import { UNVERIFIED, VERIFIED } from 'constants/statuses';
import {
  changeSectionStatus,
  createSection,
  editSection,
  removeSection,
} from 'redux/master/actions/master-join-us-actions';
import { useDispatch, useSelector } from 'react-redux';
import { parseArtworkURL } from 'helpers/homepage/parseArtworkURL';
import { permissions } from 'constants/permissions';
import { reset } from 'redux-form';

export const useMasterJoinUsSections = () => {
  const dispatch = useDispatch();

  const { account: user } = useSelector(state => state.user);
  const { sections } = useSelector(state => state.master.joinUsSections) || [];
  const { homepageJoinForm } = useSelector(state => state.form) || {};
  const { updateJoinSections } = useSelector(state => state.form) || {};
  const isAnalyst = user?.new_permission === permissions.ANALYST;

  const handleDeleteSection = sectionId => {
    dispatch(removeSection(sectionId));
  };

  const handleChangeStatus = (id, status) => {
    if (status === VERIFIED) {
      dispatch(changeSectionStatus(id, true));
    }

    if (status === UNVERIFIED) {
      dispatch(changeSectionStatus(id, false));
    }
  };

  const handleUpdateSection = () => {
    const artworkUrl = updateJoinSections.values?.artworkId;

    const values = {
      ...updateJoinSections.values,
      artworkId: parseArtworkURL(artworkUrl),
    };
    dispatch(editSection(values));
  };

  const handleCreateSection = () => {
    const artworkUrl = homepageJoinForm.values?.artworkId;

    const values = {
      ...homepageJoinForm.values,
      artworkId: parseArtworkURL(artworkUrl),
    };

    dispatch(createSection(values));
    dispatch(reset('homepageJoinForm'));
  };

  return {
    sections,
    isAnalyst,
    handleChangeStatus,
    handleCreateSection,
    handleDeleteSection,
    handleUpdateSection,
  };
};
