import React, { useState } from 'react';
import { bool, func } from 'prop-types';
import {
  checkOverdue,
  disableConfirm,
  initialDate,
  setMaxDate,
} from 'services/pickup-service';
import Calendar from './pickup-layout/calendar/calendar';
import DefaultModal from 'components/basic-modal/basic-modal';
import classNames from 'classnames';
import { confirmPickUpDate } from 'redux/dashboard/actions/ordersActions';
import styles from './order-modal-signature.module.scss';
import { useDispatch } from 'react-redux';

function OrderModalPickupDate({
  isOpen,
  setOpen,
  order,
  orderPagination,
  resale = false,
}) {
  const {
    isManual,
    shipment: { created_at: createdAt },
  } = order;
  const [pickupDate, setPickupDate] = useState(initialDate(isManual));
  const confirmButtonClass = classNames('primary-button', styles.button);
  const dispatch = useDispatch();

  function onConfirm() {
    const today = new Date();
    setOpen(!isOpen);
    dispatch(
      confirmPickUpDate(
        {
          order: order,
          shipment: order.shipment,
          pickupDate: Date.parse(today),
          courierArrival: Date.parse(pickupDate),
        },
        orderPagination,
        resale
      )
    );
  }

  return (
    <DefaultModal
      isOpen={isOpen}
      title={'Select date of pickup'}
      handleClose={setOpen}
      footerClassName={styles.footer}
      maxWidth="sm"
      footer={
        <div className="d-flex j-center">
          <button
            type="button"
            className={confirmButtonClass}
            onClick={onConfirm}
            disabled={
              disableConfirm(pickupDate) || checkOverdue(pickupDate, isManual)
            }
          >
            Confirm
          </button>
        </div>
      }
    >
      <div className="d-flex d-col">
        <Calendar
          label="Date of pickup"
          value={pickupDate}
          onChange={setPickupDate}
          minDate={initialDate(isManual)}
          maxDate={setMaxDate(isManual, createdAt)}
        />
      </div>
    </DefaultModal>
  );
}

OrderModalPickupDate.propTypes = {
  isOpen: bool.isRequired,
  setOpen: func.isRequired,
};

export default OrderModalPickupDate;
