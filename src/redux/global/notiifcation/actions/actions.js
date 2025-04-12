import {
  CLOSE_SNACKBAR,
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR,
  SET_FEEDBACK_MODAL,
  SET_SUBS_MODAL,
  SET_WELCOME_MODAL,
} from 'constants/redux/global/messages';

export const setSubscriptionModal = payload => ({
  type: SET_SUBS_MODAL,
  payload,
});

export const setWelcomeModal = () => ({
  type: SET_WELCOME_MODAL,
});

export const setFeedbackModal = () => ({
  type: SET_FEEDBACK_MODAL,
});

export const enqueueSnackbar = notification => {
  const key = notification.options && notification.options.key;

  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const closeSnackbar = key => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key,
});
