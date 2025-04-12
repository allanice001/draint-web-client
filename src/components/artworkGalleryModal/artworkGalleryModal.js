import './artworkGalleryModal.scss';

import ArtworkComponent from './artworkComponent';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import React from 'react';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

export default class ArtworkGalleryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      open,
      handleOpen,
      handleClose,
      openButtonName,
      images,
      loading,
      uploadImageHandler,
      uploadArtworkHandler,
      getImageId,
    } = this.props;
    const checkImagesLength = Object.keys(images).length;
    return (
      <div>
        <div className="open-modal-button">
          <Button
            variant="outlined"
            size="large"
            color="primary"
            onClick={handleOpen}
          >
            {openButtonName}
          </Button>
        </div>
        <Dialog
          open={open}
          // fullScreen
          maxWidth="xl"
          TransitionComponent={Transition}
          // keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <div id="artwork-gallery-edit-content">
              {Object.values(images).map((src, i) => {
                const checkArtworkUrl = src.imgPath.includes('/artwork/');
                return (
                  <div key={i} className="artwork-component-wrapper">
                    {checkArtworkUrl ? (
                      <>
                        <ArtworkComponent src={src.imgPath} />
                        <div className="uploader-wrapper">
                          <input
                            className="upload-input"
                            accept="image/*"
                            id="artwork-gallery-edit"
                            multiple={false}
                            disabled={loading}
                            onChange={uploadArtworkHandler}
                            type="file"
                          />
                          <label htmlFor="artwork-gallery-edit">
                            <Button
                              className="upload-button"
                              variant="outlined"
                              color="primary"
                              component="span"
                            >
                              {!loading ? (
                                'Update artwork'
                              ) : (
                                <div className="progress-circular">
                                  <CircularProgress size={22} />
                                </div>
                              )}
                            </Button>
                          </label>
                        </div>
                      </>
                    ) : (
                      <>
                        <ArtworkComponent src={src.imgPath} />
                        <div className="uploader-wrapper">
                          <input
                            className="upload-input"
                            accept="image/*"
                            id="image-gallery-edit"
                            multiple={false}
                            disabled={loading}
                            onChange={uploadImageHandler}
                            type="file"
                          />
                          <label htmlFor="image-gallery-edit">
                            <Button
                              className="upload-button"
                              variant="outlined"
                              color="primary"
                              component="span"
                              onClick={() => getImageId(src.id)}
                            >
                              {!loading ? (
                                'Update image'
                              ) : (
                                <div className="progress-circular">
                                  <CircularProgress size={22} />
                                </div>
                              )}
                            </Button>
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </DialogContent>
          <DialogActions>
            {checkImagesLength < 5 ? (
              <>
                <div className="modal-add-image-button">
                  <input
                    className="upload-input"
                    accept="image/*"
                    id="image-gallery-upload"
                    multiple={false}
                    disabled={loading}
                    onChange={uploadImageHandler}
                    type="file"
                  />
                  <label htmlFor="image-gallery-upload">
                    <Button
                      className="add-new-image"
                      color="primary"
                      component="span"
                    >
                      {!loading ? (
                        'Add new image'
                      ) : (
                        <div className="progress-circular">
                          <CircularProgress size={22} />
                        </div>
                      )}
                    </Button>
                  </label>
                </div>
                <div className="modal-close-button">
                  <Button onClick={handleClose} color="secondary">
                    Close
                  </Button>
                </div>
              </>
            ) : (
              <div className="modal-close-button">
                <Button onClick={handleClose} color="secondary">
                  Close
                </Button>
              </div>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
