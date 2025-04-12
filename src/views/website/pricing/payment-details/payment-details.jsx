import { PaymentContent } from './payment-content';
import { PaymentDetailsModal } from './payment-details-modal';
import React from 'react';

export function PaymentDetails() {
  return (
    <section>
      <PaymentDetailsModal />
      <PaymentContent />
    </section>
  );
}
