import { UNVERIFIED, VERIFIED } from 'constants/statuses';
import {
  changeSectionStatus,
  createSection,
  editSection,
  removeSection,
} from 'redux/master/actions/master-shipment-section-actions';
import { useDispatch, useSelector } from 'react-redux';
import { parseArtworkURL } from 'helpers/homepage/parseArtworkURL';
import { permissions } from 'constants/permissions';
import { reset } from 'redux-form';

export const useMasterShipmentSections = () => {
  const dispatch = useDispatch();

  const { account: user } = useSelector(state => state.user);
  const { sections } =
    useSelector(state => state.master.shipmentSections) || [];
  const { shipmentSectionForm } = useSelector(state => state.form) || {};
  const { updateShipmentSections } = useSelector(state => state.form) || {};
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
    const artworkUrl = updateShipmentSections.values?.artworkId;

    const values = {
      ...updateShipmentSections.values,
      artworkId: parseArtworkURL(artworkUrl),
    };
    dispatch(editSection(values));
  };

  const handleCreateSection = () => {
    const artworkUrl = shipmentSectionForm.values?.artworkId;

    const values = {
      ...shipmentSectionForm.values,
      artworkId: parseArtworkURL(artworkUrl),
    };
    dispatch(createSection(values));
    dispatch(reset('shipmentSectionForm'));
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
