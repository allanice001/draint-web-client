// import { CheckList } from 'components/lib';
import './plans.scss';

import { Backdrop, Fade, Modal, makeStyles } from '@material-ui/core';

import PlansList from 'components/pricing/layouts/plansList';
import React from 'react';
import { features } from 'views/website/pricing/mockPricing';
import styles from './modal.module.scss';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  button: {
    width: '25px',
    borderRadius: 15,
    color: 'white',
    backgroundColor: '#8CC57D',
    margin: '10px',
    padding: '5px',
  },

  card: {
    // boxShadow: '0px 0px 30px 7px rgb(112, 112, 112)'
  },
}));

export default function ModalPricing({ plan }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
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
        className={classes.modal}
        classes={{
          modal: styles.modal,
        }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {/* <Card className={classes.card}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            <span className='flex'>
                                <span className='header'>{plan.name}</span>
                                <span className='price'>
                                    {plan.currency}{plan.price} / {plan.period}
                                </span>
                            </span>
                            <br/>
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="span" className="CheckList">
                            <CheckList  items={plan.features}/>
                        </Typography>

                    </CardContent>
                </Card> */}
          <div className={styles.card}>
            <PlansList plan={plan} features={features} withButton={false} />
          </div>
        </Fade>
      </Modal>
    </span>
  );
}
