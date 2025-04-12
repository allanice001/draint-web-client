import {
  MAXIMUM_DIMENSION,
  MAXIMUM_DIMENSION_MESSAGE,
  MAXIMUM_LENGTH,
  MAXIMUM_LENGTH_MESSAGE,
  MAXIMUM_WEIGHT,
  MAXIMUM_WEIGHT_MESSAGE,
} from 'constants/components/artwork-page';
import { WARNING } from 'constants/components/message-statuses';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';

function setForm(artworkUpload, artworkDetail) {
  if (artworkUpload) return artworkUpload;

  if (artworkDetail) return artworkDetail;
}

function findLength(dimensions) {
  return Math.max(...dimensions);
}

function calculateGirth(dimensions, length) {
  const girthValues = dimensions.filter(dimension => dimension !== length);

  if (girthValues.length === 2) {
    return Number(2 * girthValues[0]) + 2 * Number(girthValues[1]);
  }

  if (girthValues.length === 1) {
    const girthValue = dimensions.filter(
      dimension => dimension !== girthValues[0]
    );

    return Number(2 * girthValues[0]) + 2 * Number(girthValue[0]);
  }

  if (!girthValues.length) {
    return Number(2 * dimensions[0]) + 2 * Number(dimensions[1]);
  }
}

const checkArtworkDimensions = (form = false, artworkSizes) => (
  dispatch,
  getState
) => {
  if (artworkSizes) {
    return checkDimensions(artworkSizes, dispatch);
  }

  const artworkUpload = getState().form.artworkUpload?.values;
  const artworkDetail = getState().form.artworkDetailForm?.values;
  const artwork = form
    ? setForm(artworkUpload, artworkDetail)
    : getState().artwork.artworkData.currentArtwork;

  return checkDimensions(artwork, dispatch);
};

function checkDimensions(artwork, dispatch) {
  const dimensions = [
    Number(artwork.width),
    Number(artwork.height),
    Number(artwork.thickness),
  ];

  const length = findLength(dimensions);
  const girth = calculateGirth(dimensions, length);
  const dimension = Number(length) + Number(girth);
  const weight = artwork.weight;

  if (weight > MAXIMUM_WEIGHT) {
    dispatch(displayMessage(MAXIMUM_WEIGHT_MESSAGE, WARNING));

    return true;
  }

  if (length > MAXIMUM_LENGTH) {
    dispatch(displayMessage(MAXIMUM_LENGTH_MESSAGE, WARNING));

    return true;
  }

  if (dimension > MAXIMUM_DIMENSION) {
    dispatch(displayMessage(MAXIMUM_DIMENSION_MESSAGE, WARNING));

    return true;
  }

  return false;
}

export default checkArtworkDimensions;
