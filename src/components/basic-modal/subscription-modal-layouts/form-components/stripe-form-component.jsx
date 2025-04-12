import Icon from 'components/icons';
import React from 'react';
import { TEST } from 'constants/components/pricing';
import { connect } from 'react-redux';
import styles from '../../subscription-modal.module.scss';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const PaymentIconsComponent = props => (
  <>
    <Icon.VisaCard param={props.iconSize} />
    <Icon.MasterCard param={props.iconSize} />
    <Icon.Amex param={props.iconSize} />
    <div
      style={{ height: props.iconSize, display: 'flex', alignItems: 'center' }}
    >
      <Icon.ApplePay height={props.iconSize / 2.5} />
    </div>
    <Icon.GooglePay height={props.iconSize} width={props.iconSize} />
  </>
);

function StripeFormComponent(props) {
  const mobile = useMediaQuery('(min-width:550px)');
  const pixel = useMediaQuery('(min-width:414px)');
  const iconSize = mobile ? 84 : pixel ? 64 : 52;
  return (
    <>
      {props.checkedPlan === TEST && (
        <div className={styles.unsubscribe_title}>
          Are you sure you really want to cancel your plan?
        </div>
      )}
      {props.checkedPlan !== TEST && (
        <div className={styles.payment_options}>
          <PaymentIconsComponent iconSize={iconSize} />
        </div>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  emailForm: state.form.userEmailInput,
  pricing: state.pricing,
  user: state.user.account,
});

export default connect(mapStateToProps, null)(StripeFormComponent);
