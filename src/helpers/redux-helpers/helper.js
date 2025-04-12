export const success = action => `${action}_SUCCESS`;
export const error = action => `${action}_ERROR`;

export const successHandler = (action, payload) => ({
  type: success(action),
  payload,
  error: false,
});

export const errorHandler = (action, payload) => ({
  type: error(action),
  payload: payload,
  error: true,
});

export const initialState = data => ({
  loader: false,
  data,
  error: false,
});

export const updateInCart = ({ artworkId, list }) =>
  list.map(artwork => {
    if (artwork.id === artworkId) artwork.inCart = true;
    return artwork;
  });

export const updateInCartSearchArtworks = ({ artworkId, list }) => {
  return list.map(artworks =>
    artworks.map(artwork => {
      if (artwork.id === artworkId) artwork.inCart = true;
      return artwork;
    })
  );
};
