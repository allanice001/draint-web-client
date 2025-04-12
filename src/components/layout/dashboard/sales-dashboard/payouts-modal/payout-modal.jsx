import BasicModal from '../../../../basic-modal/basic-modal';
import PayoutRequest from '../payout-request/payout-request';
import React from 'react';

function PayoutModal({ isOpen, setIsOpen, currentOrder, amount }) {
  function calculateAmount() {
    if (amount) return amount;
    if (currentOrder && Object.keys(currentOrder).length) {
      return Number(
        currentOrder.price - currentOrder.fee - currentOrder.fixedVAT
      ).toFixed(2);
    }

    return 0;
  }

  return (
    <BasicModal
      title="Payout request"
      isOpen={isOpen}
      handleClose={() => setIsOpen(false)}
    >
      <PayoutRequest
        amount={calculateAmount()}
        currentOrder={currentOrder}
        setIsOpen={setIsOpen}
      />
    </BasicModal>
  );
}

export default PayoutModal;
