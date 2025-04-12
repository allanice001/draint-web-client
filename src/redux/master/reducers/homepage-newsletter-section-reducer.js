import { SET_NEWSLETTER_SECTION } from 'constants/redux/publicHomepage';

const initialState = {
  section: {},
  isNewsletterRoleModal: false,
};
function homepageNewsletterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEWSLETTER_SECTION: {
      return {
        ...state,
        section: action.payload,
      };
    }
    default:
      return state;
  }
}

export default homepageNewsletterReducer;
