import { Card, CardActions, CardContent, IconButton } from '@material-ui/core';
import React, { useState } from 'react';

import ArtworkVerificationButtons from 'components/artwork/artwork-master-card/artwork-verify-buttons';
import BasicModal from 'components/basic-modal/basic-modal';
import DeleteIcon from 'components/icons/delete';
import EditIcon from 'components/icons/editPencilIcon';
import { Record } from 'components/shared/list';
import { Role } from 'constants/role';
import { SlideCard } from './slideCard';
import { getAuthorName } from 'services/global';
import styles from './homepage.module.scss';

export const MasterSlideCard = ({
  item,
  modalTitle,
  fieldParams,
  handleChangeStatus,
  handleUpdateSlideSubmit,
  setDeleteId,
  setIsOpenDialog,
  setCurrentTub,
  editForm,
}) => {
  const [editModal, setEditModal] = useState(false);

  const sliderCardItem = {
    ...item,
    author: getAuthorName(item)
  }
  const onEditFormSubmit = values => {
    handleUpdateSlideSubmit(values);
    setEditModal(!editModal);
    setCurrentTub(
      Role.userRoleList.find(({ label }) => label === values.show_for_role).tab
    );
  };

  return (
    <Record key={sliderCardItem.id} className={styles.element}>
      <Card>
        <CardContent>
          <SlideCard styles={styles} item={sliderCardItem} params={fieldParams} />
        </CardContent>
        <CardActions>
          <ArtworkVerificationButtons
            id={sliderCardItem.id}
            isBlog={true}
            onVerify={handleChangeStatus}
            disabled={false}
          />
          <IconButton
            onClick={() => {
              setEditModal(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setDeleteId(item.id);
              setIsOpenDialog(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <BasicModal
          title={modalTitle}
          isOpen={editModal}
          handleClose={() => setEditModal(false)}
        >
          {editForm({ onEditFormSubmit, item })}
        </BasicModal>
      </Card>
    </Record>
  );
};
