import './modal.scss';

import { Backdrop, Button, Fade, Modal, makeStyles } from '@material-ui/core';

import Plans from 'components/pricing/plans';
import React from 'react';

const useStyles = makeStyles(() => ({
  modal: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    overflow: 'scroll',
    height: '100%',
    display: 'block',
    margin: '5px',
  },

  button: {
    width: '25px',
    borderRadius: 15,
    color: 'white',
    backgroundColor: '#806BFF',
    padding: '5px',
  },

  images: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  text: {
    maxWidth: '600px',
  },

  card: {
    height: '200px',
    width: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px',
  },
}));

export default function ModalForSale({ subscriptionChecked }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    subscriptionChecked();
    setOpen(false);
  };

  return (
    <span>
      <button type="button" onClick={handleOpen} className={classes.button}>
        ?
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        disableAutoFocus
        disableEnforceFocus
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="wrapper-pricing">
            <div className="close-btn">
              <Button size="large" onClick={handleClose}>
                Close
              </Button>
            </div>
            <div className={`container`}>
              <Plans />
            </div>
          </div>
        </Fade>
      </Modal>
    </span>
  );
}
