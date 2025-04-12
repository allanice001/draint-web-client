import {
  LENGTH_MESSAGE,
  MAX_LENGTH,
  MAX_MEASUREMENT,
  MEASUREMENT_MESSAGE,
} from '../constants/artworks-dimensions';

import displayMessage from 'redux/global/notiifcation/actions/displayMessage';

export function checkDimensions(artworkData, dispatch) {
  const artwork = getArtworkParameters(artworkData);
  const measurement = getMeasurement(artwork);

  if (artwork.length > MAX_LENGTH) {
    dispatch(displayMessage(LENGTH_MESSAGE, 'warning'));

    return false;
  }

  if (measurement > MAX_MEASUREMENT) {
    dispatch(displayMessage(MEASUREMENT_MESSAGE, 'warning'));

    return false;
  }

  return true;
}

function getArtworkLength(artworkData) {
  if (artworkData.width > artworkData.height) return artworkData.width;

  if (artworkData.width === artworkData.height) return artworkData.width;

  return artworkData.height;
}

function getArtworkHeight(artworkData) {
  if (artworkData.width > artworkData.height) return artworkData.height;

  if (artworkData.width === artworkData.height) return artworkData.height;

  return artworkData.width;
}

function getMeasurement(parameters) {
  const girth = getGirth(parameters);

  return Number(parameters.length) + Number(girth);
}

function getGirth(parameters) {
  const girthWidth = Number(parameters.width * 2);
  const girthHeight = Number(parameters.height * 2);

  return Number(girthWidth) + Number(girthHeight);
}

function getArtworkParameters(artworkData) {
  const artworkLength = getArtworkLength(artworkData);
  const artworkWidth = artworkData.thickness;
  const artworkHeight = getArtworkHeight(artworkData);

  return {
    length: artworkLength,
    width: artworkWidth,
    height: artworkHeight,
  };
}
