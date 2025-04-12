import {
  DELETE_MODAL,
  EDIT_MODAL,
} from 'constants/components/homepage-join-us';

import React, { useEffect, useMemo, useState } from 'react';
import AlertDialogDelete from 'components/alertDialog/alertDialogDelete';
import EditSectionForm from './join-edit-section-form';
import { List } from 'components/shared/list';
import { MasterJoinUsNav } from 'components/nav/sub/masterJoinUsNav';
import { MasterSlideCard } from 'views/master/homepage/masterSlideCard';
import { NavTabs } from 'components/tabs';
import { PARAMS_SECTIONS } from 'constants/components/homepage';
import { Role } from 'constants/role';
import { getAllSections } from 'redux/master/actions/master-join-us-actions';
import { getArtworkLink } from 'helpers/homepage/getArtworkLink';
import styles from 'views/master/homepage/homepage.module.scss';
import { useDispatch } from 'react-redux';
import { useMasterJoinUsSections } from 'hooks/use-master-join-us-sections';

const getSlidesCurrentTub = (sections, currentTub) => {
  const role = Role.userRoleList.find(({ tab }) => tab === currentTub);
  return sections.filter(({ show_for_role }) => show_for_role === role.label);
};

export const MasterJoinUsSections = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSections());
  }, [dispatch]);

  const {
    sections,
    handleChangeStatus,
    handleUpdateSection,
    handleDeleteSection,
  } = useMasterJoinUsSections();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [currentTub, setCurrentTub] = useState(Role.userRoleList[0].tab);

  const form = ({ onEditFormSubmit, item }) => {
    return (
      <EditSectionForm
        onSubmit={onEditFormSubmit}
        initialValues={{
          ...item,
          use_artwork: !!item.artwork_id,
          artworkId: getArtworkLink(item.artwork_id, item.artwork_title),
        }}
      />
    );
  };

  const content = useMemo(() => {
    const slidesToShow = getSlidesCurrentTub(sections, currentTub);
    return slidesToShow.map(item => (
      <MasterSlideCard
        key={item.id}
        item={item}
        modalTitle={EDIT_MODAL.title}
        fieldParams={PARAMS_SECTIONS}
        handleUpdateSlideSubmit={handleUpdateSection}
        handleChangeStatus={handleChangeStatus}
        setDeleteId={setDeleteId}
        setIsOpenDialog={setIsOpenDialog}
        setCurrentTub={setCurrentTub}
        editForm={form}
      />
    ));
  }, [sections, currentTub, handleUpdateSection, handleChangeStatus]);

  return (
    <div className={styles.wrapper}>
      <MasterJoinUsNav />
      <AlertDialogDelete
        openDialog={isOpenDialog}
        dialogSettings={{
          titleDialog: DELETE_MODAL.title,
          buttonConfirmValue: DELETE_MODAL.buttonConfirm,
          buttonRejectValue: DELETE_MODAL.buttonReject,
          headerDialog: DELETE_MODAL.headerDialog,
        }}
        deleteBackground={() => {
          setIsOpenDialog(false);
          handleDeleteSection(deleteId);
          setDeleteId(null);
        }}
        handleDialog={() => {
          setIsOpenDialog(false);
        }}
      />
      <NavTabs
        tabs={Role.userRoleList.map(role => role.tab)}
        value={currentTub}
        handleChange={setCurrentTub}
        classes={styles.tabs}
      />
      <List className={styles.list}>{content}</List>
    </div>
  );
};
