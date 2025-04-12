import { SET_PAINTINGS } from 'constants/redux/publicHomepage';

const initialState = {
  paintings: [],
  paginations: {},
};
function homepagePaintingsByArtistsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAINTINGS: {
      return {
        ...state,
        paintings: action.payload.paintings,
        paginations: action.payload.pagination,
      };
    }

    default:
      return state;
  }
}

export default homepagePaintingsByArtistsReducer;
