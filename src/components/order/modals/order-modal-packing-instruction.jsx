import { bool, func } from 'prop-types';

import DefaultModal from 'components/basic-modal/basic-modal';
import PackingInstruction from './packing-instruction';
import React from 'react';
import styles from './order-modal-signature.module.scss';

function OrderModalPackingInstruction({ isOpen, setOpen }) {
  return (
    <DefaultModal
      isOpen={isOpen}
      title={'Packaging Instruction'}
      handleClose={setOpen}
      footerClassName={styles.footer}
    >
      <PackingInstruction />
    </DefaultModal>
  );
}

OrderModalPackingInstruction.propTypes = {
  isOpen: bool.isRequired,
  setOpen: func.isRequired,
};

export default OrderModalPackingInstruction;
