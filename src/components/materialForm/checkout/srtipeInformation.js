import './checkout.scss';

import React from 'react';
import StripeForm from '../stripeForm/stripeForm';

export default class StripeInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.stripeForm = React.createRef();
  }

  render() {
    return (
      <div id="checkout-material-wrapper">
        <StripeForm ref={this.stripeForm} />
      </div>
    );
  }
}
