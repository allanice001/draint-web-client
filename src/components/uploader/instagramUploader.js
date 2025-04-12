import React, { useEffect, useState } from 'react';
import {
  deleteSocMediaData,
  getSocMediaData,
  uploadSocMediaData,
} from 'redux/dashboard/actions/socialMediaActions';
import { useDispatch, useSelector } from 'react-redux';

import AlertDialogDelete from '../alertDialog/alertDialogDelete';
import PinterestTag from 'external-lib/pinterestTag';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import SocialMediaForm from 'components/reduxForm/dashboard/socialMediaForm';
import { getSocialMedia } from 'redux/dashboard/selectors';
import styles from './instagramUploader.module.scss';
import { useHistory } from 'react-router';

const InstagramUploader = () => {
  const dispatch = useDispatch();
  const { location } = useHistory();
  const { loading, instagramImageList } = useSelector(getSocialMedia);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [imageID, setImageID] = useState('');

  const dialogSettings = {
    headerDialog: 'Are you sure?',
    titleDialog: '',
    buttonConfirmValue: 'Confirm',
    buttonRejectValue: 'Cancel',
  };

  useEffect(() => {
    ReactGA.pageview(location.pathname);
    ReactPixel.pageView();
    PinterestTag.pageView();

    if (instagramImageList.length === 0) {
      dispatch(getSocMediaData());
    }
  }, [dispatch, instagramImageList.length, location.pathname]);

  const handleDialog = id => {
    setOpenDialog(!openDialog);
    setImageID(id);
  };

  const deleteBackgroundHandler = id => {
    dispatch(deleteSocMediaData(id, instagramImageList));
    setOpenDialog(!openDialog);
  };

  const onSocialMediaFormSubmit = () => {
    dispatch(uploadSocMediaData({ selectedFiles }));
    setSelectedFiles([]);
  };

  return (
    <div>
      <AlertDialogDelete
        openDialog={openDialog}
        dialogSettings={dialogSettings}
        handleDialog={handleDialog}
        deleteBackground={() => deleteBackgroundHandler(imageID)}
      />

      <div className={styles.form_wrapper}>
        <SocialMediaForm
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          onSubmit={onSocialMediaFormSubmit}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default InstagramUploader;
