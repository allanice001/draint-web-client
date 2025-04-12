import './modal.scss';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { MasterModalNav, Spinner } from 'components/lib';
import React, { useEffect, useState } from 'react';
import {
  deleteModal,
  deleteModalDialog,
  getModalsMedia,
  uploadModal,
  uploadModalError,
} from 'redux/master/actions/modalActions';
import { useDispatch, useSelector } from 'react-redux';

import AlertDialogDelete from 'components/alertDialog/alertDialogDelete';
import { getBase64FromFile } from 'services/images/imageService';

const dialogSettings = {
  headerDialog: 'Are you sure?',
  titleDialog: 'The image will be deleted permanently',
  buttonConfirmValue: 'Confirm',
  buttonRejectValue: 'Cancel',
};

const Modal = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [image64, setImage64] = useState(null);

  const { loading, mediaList, imageId, openDialog } = useSelector(
    state => state.master.modals
  );

  const { account: user } = useSelector(state => state.user);

  const isSuperAdmin = user?.permission === 'master';

  let isAnalyst = true;

  if (user?.new_permission) {
    isAnalyst = user?.new_permission === 'analyst' && !isSuperAdmin;
  }

  const uploadRef = React.createRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getModalsMedia());
  }, [dispatch]);

  const uploadFileHandler = async event => {
    const newFile = event.target.files;

    if (newFile[0]) {
      const base64 = await getBase64FromFile(newFile[0]);
      setImage64(base64);
    }

    setSelectedFile(newFile);
  };

  const handleDialog = id => {
    dispatch(deleteModalDialog(id));
  };

  const deleteModalHandler = id => {
    dispatch(deleteModal(id));
  };

  const saveModalHandler = async () => {
    if (!selectedFile)
      return dispatch(uploadModalError('Please, upload an image first'));

    dispatch(uploadModal(selectedFile[0]));

    setSelectedFile(null);
    setImage64(null);
  };

  const previewImage = image64 && <img src={image64} alt="Modal preview" />;

  return (
    <div id="modal-master-wrapper">
      <MasterModalNav />

      <AlertDialogDelete
        openDialog={openDialog}
        dialogSettings={dialogSettings}
        handleDialog={handleDialog}
        deleteBackground={() => deleteModalHandler(imageId)}
      />

      <div className="image-cards-list">
        <Card>
          <CardContent classes={{ root: 'form' }}>
            <FormControl>
              <input
                ref={uploadRef}
                accept="image/*"
                onChange={uploadFileHandler}
                type="file"
                hidden
              />
              <Button
                disabled={loading || isAnalyst}
                color="primary"
                onClick={() => uploadRef.current.click()}
              >
                {previewImage || 'Upload'}
              </Button>
              <FormHelperText id="artist_background_helper" />
            </FormControl>
          </CardContent>
          <CardActions>
            <Button
              disabled={loading || isAnalyst}
              color="primary"
              size="medium"
              variant="contained"
              onClick={saveModalHandler}
            >
              Save Image
            </Button>
          </CardActions>
        </Card>
        {loading ? (
          <Spinner full />
        ) : (
          mediaList.map(image => (
            <Card key={image.id}>
              <CardContent>
                <img
                  alt={image.id}
                  className="image-content"
                  src={image.content_media_url}
                  title={image.id}
                  width="200"
                  height="200"
                />
              </CardContent>
              <CardActions>
                <Button
                  disabled={isAnalyst}
                  variant="contained"
                  color="secondary"
                  size="medium"
                  onClick={() => handleDialog(image.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Modal;
