import { artworkUpdated, initialRequest } from '../actions/artworkActions';

import { ARTWORK_UPLOADED } from 'constants/artwork';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import { ERROR } from '../../../constants/components/message-statuses';
import awsUpload from './aws-upload';
import displayMessage from '../../global/notiifcation/actions/displayMessage';
import errorMessageHandler from '../../global/notiifcation/actions/error-handler';
import { setArtworkUploading } from '../../user/loader/actions/setLoading';
import uploadArtworksRequest from 'dataLayer/artwork/upload-artworks-request';

const HelperForAnalytic = AnalyticHelper.create();

const handleUploadArtworks = (
  { added, deleted, changedIndex },
  files,
  callback
) => async (dispatch, getState) => {
  dispatch(setArtworkUploading(true));

  const {
    id: artworkId,
    authorInfo: { username: artistUsername },
  } = getState().artwork.artworkData.currentArtwork;
  const { new_permission: adminRole } = getState().user.account;
  const addedFiles = added.map(({ index }, itemIndex) => ({
    index,
    mimeType: files[itemIndex]?.type,
  }));

  uploadArtworksRequest(artworkId, {
    added: addedFiles,
    deleted,
    changedIndex,
    adminRole,
  })
    .then(response => {
      const { presignedUrls = [] } = response.data;
      const percent = 100 / files.length + 1;

      Promise.all(
        presignedUrls.map((url, index) => {
          return dispatch(awsUpload(percent, url, files[index]));
        })
      )
        .then(() => {
          dispatch(artworkUpdated(true));
          dispatch(displayMessage(ARTWORK_UPLOADED));

          HelperForAnalytic.createEvent('ArtworkImagesWasEdited', {
            artist_name: artistUsername,
            quantity: files.length,
          });

          dispatch(
            initialRequest({
              id: artworkId,
              cartHash: localStorage.cartId,
            })
          );

          callback();
          dispatch(setArtworkUploading(false));
        })
        .catch(error => {
          dispatch(setArtworkUploading(false));
          dispatch(errorMessageHandler(error, ERROR));
        });
    })
    .catch(error => {
      dispatch(setArtworkUploading(false));
      dispatch(errorMessageHandler(error, ERROR));
    });
};

export default handleUploadArtworks;
