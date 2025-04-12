import { SEPA, SOFORT, STRIPE, TEST } from 'constants/components/pricing';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import Icons from 'components/icons';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames/bind';
import { handlePaymentSystem } from 'redux/pricing/actions/pricingActions';
import styles from './basic-modal.module.scss';

const classNames = classnames.bind(styles);

function SubscriptionWrapperModal({
  isOpen,
  isMobile,
  title,
  handleClose,
  children,
  className,
  handleSubscriptions,
  paymentSystem,
  disabled,
  price,
  isTrial,
}) {
  const dispatch = useDispatch();
  const { load } = useSelector(state => state.pricing);

  function setButtonType() {
    if (
      (paymentSystem === SEPA || paymentSystem === SOFORT) &&
      title !== TEST
    ) {
      return 'submit';
    }

    return 'button';
  }

  function setButtonName() {
    if (title === TEST) {
      return 'Confirm';
    }

    if (!isTrial) {
      return 'Buy Now';
    }

    return 'Start Free-Trial';
  }

  return (
    <Dialog
      classes={{
        root: styles.dialog,
        paper: styles.paper,
        container: styles.backdrop,
      }}
      maxWidth="md"
      onClose={handleClose}
      open={isOpen}
    >
      <div className={styles.header_subscription}>
        <div className={styles.header_subscription__mobile}>
          {title === TEST ? '' : title}
          <span>{title === TEST ? '' : price}</span>
        </div>

        <button className={styles.close} onClick={handleClose} type="button">
          <Icons.Cancel className={styles.icon} />
        </button>
      </div>

      <div className={className || styles.body_wrapper}>{children}</div>

      {(isMobile ? paymentSystem : true) && (
        <>
          <div className={styles.footer_button_wrapper}>
            <div className={styles.subscribe_button_wrapper}>
              {isMobile && paymentSystem && (
                <button
                  className={classNames('secondary-button', 'back_button')}
                  onClick={() => dispatch(handlePaymentSystem())}
                >
                  <Icons.SimpleArrowBack />
                  <span>Back</span>
                </button>
              )}

              <button
                className="primary-button"
                disabled={disabled || load}
                form="stripe_iban_form"
                onClick={() =>
                  handleSubscriptions(paymentSystem || STRIPE, title)
                }
                type={setButtonType()}
              >
                {setButtonName()}
              </button>
            </div>
          </div>
        </>
      )}

      {isMobile && title === TEST && (
        <>
          <div className={styles.footer_button_wrapper}>
            <div className={styles.subscribe_button_wrapper}>
              <button
                className="primary-button"
                disabled={disabled}
                form="stripe_iban_form"
                onClick={() =>
                  handleSubscriptions(paymentSystem || STRIPE, title)
                }
                type={setButtonType()}
              >
                Confirm
              </button>
            </div>
          </div>
        </>
      )}
    </Dialog>
  );
}

SubscriptionWrapperModal.defaultProps = {
  className: '',
  disabled: false,
  isOpen: false,
};

SubscriptionWrapperModal.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleSubscriptions: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool,
  paymentSystem: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SubscriptionWrapperModal;
