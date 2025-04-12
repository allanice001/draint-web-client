import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
} from '@material-ui/core';
import { DECLINED, PENDING, VERIFIED } from 'constants/global';
import React, { useEffect, useState } from 'react';
import {
  notifySeller,
  shippingOrderWrapperStep,
  updateShippingOrdersStatus,
} from 'redux/master/actions/shippingRequestsActions';

import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';
import { imageSizes } from 'constants/media-query/image-sizes';
import styles from 'views/master/shipping/shipments.module.scss';
import { useDispatch } from 'react-redux';

function WrappedSteps({ order, isAnalyst }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [buttonName, setButtonName] = useState('OPEN');
  const [steps, setSteps] = useState(
    order.stepsData.filter(stepData => stepData.imgPath)
  );
  const isPending = steps.filter(step => step.status === PENDING);
  const isDeclined = steps.filter(step => step.status === DECLINED);
  const isNotified = steps.filter(step => step.notified);

  useEffect(() => {
    if (order.stepsData) {
      setSteps(order.stepsData.filter(stepData => stepData.imgPath));
    }
  }, [order]);

  function buttonVerified(step) {
    return classNames(styles.status_button, {
      [`${styles.status_button__verified}`]: step.status === VERIFIED,
    });
  }

  function buttonDeclined(step) {
    return classNames(styles.status_button, {
      [`${styles.status_button__declined}`]: step.status === DECLINED,
    });
  }

  function buttonPending(step) {
    return classNames(styles.status_button, {
      [`${styles.status_button__pending}`]: step.status === PENDING,
    });
  }

  const buttonArrow = classNames(styles.button_arrow, {
    [`${styles.button_arrow__open}`]: expanded,
  });

  function iconPickUp(onWay = false, status = false) {
    return classNames(styles.icon_pickup, {
      [styles.icon_pickup__onWay]: Boolean(onWay),
      [styles.icon_pickup__status]: Boolean(status),
    });
  }

  const notifyButton = classNames(styles.send, {
    [`${styles.send__disabled}`]: isPending.length || isNotified.length,
  });

  function handleExpanded(panel) {
    if (steps.length === 6) {
      return (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setButtonName(isExpanded ? 'CLOSE' : 'OPEN');
      };
    }
  }

  function updateStatus(step, status) {
    dispatch(updateShippingOrdersStatus(status, step, order));
    order.stepStatus = { steps, stepId: step.id, status };
    setSteps(order.stepsData);
  }

  function sentMailToSeller(order) {
    const verifiedPhotos = order.stepsData.filter(
      steps => steps.status === VERIFIED
    );
    if (verifiedPhotos.length === steps.length) {
      dispatch(shippingOrderWrapperStep(order));
      return sendMail(order);
    }

    return sendMail(order, 'declined');
  }

  function sendMail(order, status) {
    dispatch(notifySeller(order, status));
    order.stepNotified = { steps, notified: true };
    setSteps(order.stepsData);
    setExpanded(false);
  }

  return (
    <Accordion
      className={styles.panel_wrapper}
      classes={{
        root: styles.expanded,
      }}
      expanded={Boolean(expanded)}
      onChange={handleExpanded('panel1')}
    >
      <AccordionSummary
        classes={{
          root: styles.summary,
        }}
      >
        <div className={styles.title_image_wrapper}>
          <img
            className={styles.title_image}
            srcSet={order.artwork.small_image}
            alt="order_wrapped_step"
          />
        </div>
        <div className={styles.info_wrapper}>
          <div className={styles.info}>
            <span>Title: {order.artwork.title}</span>
            <span>Price: &euro; {order.totalPrice}</span>
            <span>Seller email: {order.owner.email}</span>
          </div>
          <div className={styles.open_button}>
            <Button variant="contained" disabled={steps.length < 6}>
              {buttonName}
              <ExpandMoreIcon
                classes={{
                  root: buttonArrow,
                }}
              />

              {isDeclined.length > 0 && !Boolean(order.pickupScheduled) && (
                <CancelIcon
                  classes={{
                    root: styles.icon_declined,
                  }}
                />
              )}

              {isPending.length > 0 && isDeclined.length === 0 && (
                <WarningIcon
                  classes={{
                    root: styles.icon_warning,
                  }}
                />
              )}

              {isPending.length === 0 &&
                isDeclined.length === 0 &&
                Boolean(steps.length) &&
                !Boolean(order.pickupScheduled) && (
                  <CheckCircleIcon
                    classes={{
                      root: styles.icon_checked,
                    }}
                  />
                )}

              {Boolean(order.pickupScheduled && !order.shipment.status) && (
                <LocalShippingIcon
                  classes={{
                    root: iconPickUp(order.pickupScheduled, false),
                  }}
                />
              )}

              {Boolean(order.pickupScheduled && order.shipment.status) && (
                <LocalShippingIcon
                  classes={{
                    root: iconPickUp(false, order.shipment.status),
                  }}
                />
              )}
            </Button>
          </div>
        </div>
      </AccordionSummary>
      <div className={styles.stepper_wrapper}>
        <Grid container spacing={1} className={styles.photo_container}>
          {steps.map(step => {
            return (
              <Grid item xs={12} md={4} key={step.id}>
                <div className={styles.photo_wrapper}>
                  <img
                    className={styles.photo}
                    srcSet={step.imgPath}
                    sizes={imageSizes.SM}
                    alt={step.label}
                  />
                </div>
                {!isAnalyst && (
                  <div className={styles.buttons_group}>
                    <Button
                      classes={{
                        root: buttonVerified(step),
                      }}
                      onClick={() => updateStatus(step, VERIFIED)}
                      variant="contained"
                      disabled={order.pickupScheduled || isNotified.length}
                    >
                      VERIFY
                    </Button>
                    <div className={styles.middle_button}>
                      <Button
                        classes={{
                          root: buttonDeclined(step),
                        }}
                        onClick={() => updateStatus(step, DECLINED)}
                        variant="contained"
                        disabled={order.pickupScheduled || isNotified.length}
                      >
                        DECLINE
                      </Button>
                    </div>
                    <Button
                      classes={{
                        root: buttonPending(step),
                      }}
                      onClick={() => updateStatus(step, PENDING)}
                      variant="contained"
                      disabled={order.pickupScheduled || isNotified.length}
                    >
                      PENDING
                    </Button>
                  </div>
                )}
              </Grid>
            );
          })}
        </Grid>
      </div>
      {!isAnalyst && (
        <AccordionDetails>
          <div className={styles.send_wrapper}>
            {Boolean(!order.pickupScheduled) && (
              <Button
                classes={{
                  root: notifyButton,
                }}
                variant="contained"
                onClick={() => sentMailToSeller(order)}
                disabled={Boolean(isPending.length || isNotified.length)}
              >
                NOTIFY SELLER
              </Button>
            )}
          </div>
        </AccordionDetails>
      )}
    </Accordion>
  );
}

export default WrappedSteps;
