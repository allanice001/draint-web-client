import { enqueueSnackbar as enqueueSnackbarAction } from './actions';

export default function displayMessage(message, style = 'success') {
  return dispatch => {
    const enqueueSnackbar = (...args) =>
      dispatch(enqueueSnackbarAction(...args));

    enqueueSnackbar({
      message,

      options: {
        key: new Date().getTime() + Math.random(),
        variant: style,
      },
    });
  };
}
