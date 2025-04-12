import './subscribeDialog.scss';

import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import SelectPaymentSystem from '../materialForm/auth/components/selectPaymentSystem';
import StripeForm from '../materialForm/stripeForm/stripeForm';
import TextField from '@material-ui/core/TextField';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import displayMessage from '../../redux/global/notiifcation/actions/displayMessage';

const TEST = 'Test';
const PAYPAL = 'PayPal';

class SubscribeDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleConfirmButton = async () => {
    const { props } = this;
    const stripe =
      props.pricing.checkedPlan === TEST
        ? {}
        : await props.stripeForm.current.cardForm.current.wrappedInstance.handleSubmit();
    if (!props.pricing.userCountry) {
      props.displayMessage('Chose your country first', 'error');
    } else if (stripe.error) {
      props.displayMessage(stripe.error.message, 'error');
    } else {
      await props.handleStripeSubscription(stripe);
    }
  };

  render() {
    const {
      handleCloseSubscribeModal,
      countries,
      handleChangeUserCountry,
      handlePayPalPlanSubscription,
      disableSubscribe,
      emailInput,
      handleEmailChange,
      invalidEmail,
      checkEmptyEmail,
      handlePaymentSystem,
    } = this.props;
    const {
      userCountry,
      checkedPlan,
      paymentSystem,
      load,
    } = this.props.pricing;
    return (
      <div className="dialog-subscription-wrapper">
        <Dialog
          id="dialog-subscription-wrapper"
          onClose={handleCloseSubscribeModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{checkedPlan}</DialogTitle>
          <DialogContent>
            <div id="stripe-subscription">
              {checkedPlan === TEST ? (
                <div>
                  <FormControl variant="outlined" className="country-form">
                    <InputLabel htmlFor="last_name">Country</InputLabel>
                    <Select
                      labelId="subscription_plan"
                      id="subscription_plan"
                      value={userCountry}
                      onChange={handleChangeUserCountry}
                      labelWidth={47}
                    >
                      {countries.map((c, i) => (
                        <MenuItem key={i} value={c.ccode}>
                          {c.cname}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div className="stripe-form">
                    <FormControl variant="outlined" className="button-wrapper">
                      <Button
                        className="subscribe-button"
                        variant="contained"
                        color="primary"
                        onClick={handleCloseSubscribeModal}
                      >
                        Cancel
                      </Button>
                      <Button
                        className={
                          load
                            ? 'subscribe-button-disabled'
                            : 'subscribe-button-subs'
                        }
                        variant="contained"
                        color="primary"
                        disabled={load}
                        onClick={this.handleConfirmButton}
                      >
                        Subscribe
                      </Button>
                    </FormControl>
                  </div>
                </div>
              ) : (
                <div>
                  <SelectPaymentSystem
                    paymentSystem={paymentSystem}
                    handlePaymentSystem={handlePaymentSystem}
                  />
                  {paymentSystem === PAYPAL ? (
                    <div className="stripe-form">
                      <div className="paypal-input-email-wrapper">
                        <TextField
                          className="paypal-email-input"
                          error={invalidEmail}
                          fullWidth
                          id="paypal-email-helper-text"
                          label="PayPal Account Email"
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
                      <FormControl
                        variant="outlined"
                        className="button-wrapper"
                      >
                        <Button
                          className="subscribe-button"
                          variant="contained"
                          color="primary"
                          onClick={handleCloseSubscribeModal}
                        >
                          Cancel
                        </Button>
                        <Button
                          className={
                            disableSubscribe || load
                              ? 'subscribe-button-disabled'
                              : 'subscribe-button-subs'
                          }
                          variant="contained"
                          color="primary"
                          disabled={disableSubscribe || load}
                          onClick={handlePayPalPlanSubscription}
                        >
                          Subscribe
                        </Button>
                      </FormControl>
                    </div>
                  ) : (
                    <div>
                      <FormControl variant="outlined" className="country-form">
                        <InputLabel htmlFor="last_name">Country</InputLabel>
                        <Select
                          labelId="subscription_plan"
                          id="subscription_plan"
                          value={userCountry}
                          onChange={handleChangeUserCountry}
                          labelWidth={47}
                        >
                          {countries.map((c, i) => (
                            <MenuItem key={i} value={c.ccode}>
                              {c.cname}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <div className="stripe-form">
                        <StripeForm ref={this.props.stripeForm} />
                        <FormControl
                          variant="outlined"
                          className="button-wrapper"
                        >
                          <Button
                            className="subscribe-button"
                            variant="contained"
                            color="primary"
                            onClick={handleCloseSubscribeModal}
                          >
                            Cancel
                          </Button>
                          <Button
                            className={
                              load
                                ? 'subscribe-button-disabled'
                                : 'subscribe-button-subs'
                            }
                            variant="contained"
                            color="primary"
                            disabled={load}
                            onClick={this.handleConfirmButton}
                          >
                            Subscribe
                          </Button>
                        </FormControl>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      displayMessage,
    },
    dispatch
  );
}

const mapStateToProps = state => ({
  pricing: state.pricing,
  user: state.user.account,
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeDialog);
