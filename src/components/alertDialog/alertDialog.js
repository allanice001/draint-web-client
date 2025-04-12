import './alertDialog.scss';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default class AlertDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { openDialog, handleDialog, dialogSettings } = this.props;
    return (
      <div className="alert-dialog-wrapper">
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {dialogSettings.headerDialog}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {dialogSettings.titleDialog}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialog} color="primary">
              {dialogSettings.buttonValue}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
