import './proceedCheckout.scss';

import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { ProceedModalInput } from '../../../inputs/proceedModal/proceedModalInput';
import React from 'react';

export class ProceedCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <>
        <div>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.handleOpen}
          >
            Proceed to checkout
          </Button>
          <Dialog className={`modal-wrapper`} open={open}>
            <MuiDialogTitle>
              <IconButton aria-label="close" onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>
            <MuiDialogContent>
              <ProceedModalInput label={'First name'} />
              <ProceedModalInput label={'Last name'} />
              <ProceedModalInput label={'Country'} />
              <ProceedModalInput label={'Region'} />
              <ProceedModalInput label={'City'} />
              <ProceedModalInput label={'Street'} />
              <ProceedModalInput label={'Building'} />
              <ProceedModalInput label={'Unit'} />
              <ProceedModalInput label={'Number'} />
              <ProceedModalInput label={'Zip Code'} />
            </MuiDialogContent>
          </Dialog>
        </div>
      </>
    );
  }
}
