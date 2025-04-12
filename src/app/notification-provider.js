import FeedbackModal from 'components/basic-modal/feedback-modal';
import Icons from 'components/icons';
import Notifier from 'components/notifier/notifier';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { closeSnackbar as closeSnackbarAction } from 'redux/global/notiifcation/actions/actions';
import { makeStyles } from '@material-ui/core/styles';
import { useDisabledTapHighLight } from 'hooks/use-disabled-tap-highlight';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  warning: { backgroundColor: '#ff9800', fontSize: '14px' },
  success: { backgroundColor: '#806BFF', fontSize: '14px' },
  error: { backgroundColor: '#F44336', fontSize: '14px' },
});

const NOTIFICATION_DURATION = 5000;
const MAX_NOTIFICATION_STACK = 6;

const NotificationProvider = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));
  useDisabledTapHighLight();

  const dismissButton = key => (
    <button type="button" onClick={() => closeSnackbar(key)}>
      <Icons.Cancel fill="#fff" width={10} />
    </button>
  );

  return (
    <>
      <SnackbarProvider
        maxSnack={MAX_NOTIFICATION_STACK}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        classes={{
          variantSuccess: classes.success,
          variantError: classes.error,
          variantWarning: classes.warning,
        }}
        action={dismissButton}
        autoHideDuration={NOTIFICATION_DURATION}
      >
        <FeedbackModal />
        <Notifier />
        {children}
      </SnackbarProvider>
    </>
  );
};

export default NotificationProvider;
