import {
  CLOSE_SNACKBAR,
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR,
  SET_FEEDBACK_MODAL,
  SET_SUBS_MODAL,
  SET_WELCOME_MODAL,
} from 'constants/redux/global/messages';

const defaultState = {
  notifications: [],
  welcomeModal: false,
  feedbackModal: false,
  subscriptionModal: false,
};

const notificationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_FEEDBACK_MODAL:
      return {
        ...state,
        feedbackModal: !state.feedbackModal,
      };
    case SET_WELCOME_MODAL:
      return {
        ...state,
        welcomeModal: !state.welcomeModal,
      };
    case ENQUEUE_SNACKBAR:
      return {
        ...state,

        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      };

    case CLOSE_SNACKBAR:
      return {
        ...state,

        notifications: state.notifications.map(notification =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };

    case REMOVE_SNACKBAR:
      return {
        ...state,

        notifications: state.notifications.filter(
          notification => notification.key !== action.key
        ),
      };

    case SET_SUBS_MODAL:
      return {
        ...state,
        subscriptionModal: action.payload,
      };

    default:
      return state;
  }
};

export default notificationReducer;
