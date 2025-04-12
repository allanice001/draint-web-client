import {
  DELETE_MODAL,
  MODAL_EDIT_SLIDER_TITLE,
  PARAMS_SLIDES,
} from 'constants/components/homepage';
import React, { useMemo, useState } from 'react';
import AlertDialogDelete from 'components/alertDialog/alertDialogDelete';
import EditSlideForm from './editSlideForm';
import { List } from 'components/shared/list';
import { MasterSlideCard } from './masterSlideCard';
import { MasterSliderNav } from 'components/nav/sub/masterSliderNav';
import { NavTabs } from 'components/tabs';
import { Role } from 'constants/role';
import { getArtworkLink } from 'helpers/homepage/getArtworkLink';
import styles from './homepage.module.scss';
import { useMasterHomepage } from 'hooks/useMasterHomepage';

const getSlidesCurrentTub = (slides, currentTub) => {
  const role = Role.userRoleList.find(({ tab }) => tab === currentTub);
  return slides.filter(({ show_for_role }) => show_for_role === role.label);
};

export const MasterSlidesList = () => {
  const {
    allSlides: slides,
    handleChangeStatus,
    handleUpdateSlideSubmit,
    handleDeleteSlide,
  } = useMasterHomepage();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [currentTub, setCurrentTub] = useState(Role.userRoleList[0].tab);

  const form = ({ onEditFormSubmit, item }) => {
    return (
      <EditSlideForm
        onSubmit={onEditFormSubmit}
        editArtwork={!!item.artwork_id}
        initialValues={{
          ...item,
          artworkId: getArtworkLink(item.artwork_id, item.name),
          imageTitle: item.title,
        }}
      />
    );
  };

  const content = useMemo(() => {
    const slidesToShow = getSlidesCurrentTub(slides, currentTub);
    return slidesToShow.map(item => (
      <MasterSlideCard
        key={item.id}
        item={item}
        modalTitle={MODAL_EDIT_SLIDER_TITLE}
        fieldParams={PARAMS_SLIDES}
        handleUpdateSlideSubmit={handleUpdateSlideSubmit}
        handleChangeStatus={handleChangeStatus}
        setDeleteId={setDeleteId}
        setIsOpenDialog={setIsOpenDialog}
        setCurrentTub={setCurrentTub}
        editForm={form}
      />
    ));
  }, [slides, handleChangeStatus, handleUpdateSlideSubmit, currentTub]);

  return (
    <div className={styles.wrapper}>
      <MasterSliderNav />
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
          handleDeleteSlide(deleteId);
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
