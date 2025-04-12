import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import SelectPaymentSystem from './selectPaymentSystem';
import StripeForm from '../../stripeForm/stripeForm';
import TextField from '@material-ui/core/TextField';

const TEST_NAME = 'Test';
const BASIC_NAME = 'Basic';
// const ALL_IN_ONE_NAME = 'All-In-One';
const PAYMENT_SYSTEM = 'PayPal';

export default function ModalSubscribeDialog(props) {
  const {
    open,
    handleCloseSubscribeModal,
    handleStripePlanSubscription,
    subscribedPlan,
    handleEmailChange,
    emailInput,
    paymentSystem,
    invalidEmail,
    checkEmptyEmail,
    handlePayPalPlanSubscription,
    handlePaymentSystem,
    disableSubscribe,
    load,
  } = props;
  return (
    <div>
      <Dialog
        className="subscription-dialog"
        open={open}
        onClose={handleCloseSubscribeModal}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {subscribedPlan}
        </DialogTitle>
        <DialogContent>
          {subscribedPlan === TEST_NAME ? (
            <div />
          ) : (
            <div>
              {subscribedPlan === BASIC_NAME ? (
                <div>
                  <SelectPaymentSystem
                    paymentSystem={paymentSystem}
                    handlePaymentSystem={handlePaymentSystem}
                  />
                  {paymentSystem === PAYMENT_SYSTEM ? (
                    <div className="paypal-input-email-wrapper">
                      <TextField
                        className="paypal-email-input"
                        error={invalidEmail}
                        fullWidth
                        id="paypal-email-helper-text"
                        // label="PayPal Account Email"
                        placeholder="PayPal Account Email"
                        value={emailInput}
                        onChange={handleEmailChange}
                        onBlur={checkEmptyEmail}
                        helperText={
                          invalidEmail
                            ? 'You have entered an invalid email address!'
                            : 'Enter You PayPal Account Email'
                        }
                        variant="outlined"
                      />
                    </div>
                  ) : (
                    <div>
                      <DialogContentText>
                        Please enter your card to subscribe
                      </DialogContentText>
                      <div className="dialog-form-control">
                        <StripeForm ref={props.stripeForm} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <DialogContentText>
                    Please enter your card to subscribe
                  </DialogContentText>
                  <div className="dialog-form-control">
                    <StripeForm ref={props.stripeForm} />
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseSubscribeModal} color="primary">
            Cancel
          </Button>
          <div className="subscribe-button-subs-wrapper">
            {paymentSystem === PAYMENT_SYSTEM &&
            subscribedPlan === BASIC_NAME ? (
              <Button
                className={disableSubscribe && 'subscribe-button-disabled'}
                onClick={handlePayPalPlanSubscription}
                color="primary"
                disabled={load}
              >
                Subscribe
              </Button>
            ) : (
              <Button color="primary" onClick={handleStripePlanSubscription}>
                Subscribe
              </Button>
            )}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
