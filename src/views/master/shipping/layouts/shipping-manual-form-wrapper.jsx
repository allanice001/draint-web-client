import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShippingManualForm from 'components/reduxForm/shipping-manual/shipping-manual-form';
import * as FIELDS from 'constants/components/master/shipping-manual-form';
import { getFormSyncErrors, getFormValues } from 'redux-form';
import { MASTER_MANUAL_SHIPMENT_FORM } from 'constants/components/forms';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from 'redux-form';
import {
  finalizeManualOrder,
  updateManualOrder,
} from 'redux/master/actions/shippingRequestsActions';
import _ from 'lodash';
import styles from 'views/master/shipping/shipments.module.scss';

export default function ShippingManualFormWrapper({ order, currentPage }) {
  const {
    id: orderId,
    pickupScheduled,
    courierArrival,
    delivered,
    shipment: {
      tracker_id: trackerId,
      from_address: sellerData,
      to_address: buyerData,
      delivery_company: deliveryCompany,
      tracker_link: trackerLink,
    },
  } = order;
  const dispatch = useDispatch();
  const form = `${MASTER_MANUAL_SHIPMENT_FORM}_${orderId}`;
  const state = useSelector(store => store);
  const formSyncErrors = getFormSyncErrors(form)(state);
  const formValues = getFormValues(form)(state);
  const isValidForm = !!Object.keys(formSyncErrors).length;
  const [expanded, setExpanded] = useState('');
  const isChanged = _.isEqual(formValues, getInitialValues());

  function getInitialValues() {
    const from = parseUserData(FIELDS.FROM, sellerData);
    const to = parseUserData(FIELDS.TO, buyerData);

    return {
      [FIELDS.TRACKER_ID]: trackerId || '',
      [FIELDS.COURIER_DATE]: courierArrival ? courierArrival : pickupScheduled,
      [FIELDS.DELIVERY_COMPANY]: deliveryCompany || '',
      [FIELDS.TRACKER_LINK]: trackerLink || '',
      ...from,
      ...to,
    };
  }

  function parseUserData(prefix, data) {
    const {
      address,
      secondAddress,
      city,
      countryCode,
      email,
      name,
      phone,
      postalCode,
      stateName,
    } = JSON.parse(data);

    return {
      [`${prefix}${FIELDS.LINE_1}`]: address,
      [`${prefix}${FIELDS.LINE_2}`]: secondAddress,
      [`${prefix}${FIELDS.CITY}`]: city,
      [`${prefix}${FIELDS.COUNTRY}`]: countryCode,
      [`${prefix}${FIELDS.USER_EMAIL}`]: email,
      [`${prefix}${FIELDS.USER_NAME}`]: name.split(' ')[0],
      [`${prefix}${FIELDS.USER_SURNAME}`]: name.split(' ')[1],
      [`${prefix}${FIELDS.USER_PHONE}`]: phone === FIELDS.NULL ? null : phone,
      [`${prefix}${FIELDS.ZIPCODE}`]: postalCode,
      [`${prefix}${FIELDS.STATE}`]: stateName,
    };
  }

  function onSave() {
    dispatch(updateManualOrder(order, formValues, currentPage));
  }

  function onClear() {
    dispatch(reset(form));
  }

  function onFinalize() {
    dispatch(finalizeManualOrder(order, currentPage));
  }

  const onAccordion = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === orderId}
        onChange={onAccordion(orderId)}
      >
        <AccordionSummary
          classes={{
            root: styles.expanded_manual,
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>Edit order</h3>
        </AccordionSummary>
        <AccordionDetails>
          <ShippingManualForm
            form={form}
            order={order}
            initialValues={getInitialValues()}
            onSave={onSave}
            onClear={onClear}
            onFinalize={onFinalize}
            isValidForm={isValidForm}
            isChanged={isChanged}
            isDisabled={!!delivered}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
