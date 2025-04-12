import { TableCell, TableRow } from '@material-ui/core';

import { COMPLETED } from 'constants/statuses';
import React from 'react';
import classNames from 'classnames';
import { handleChangePayoutStatus } from 'redux/master/actions/payouts-actions';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import styles from 'views/master/master-payouts-requests.module.scss';
import { useDispatch } from 'react-redux';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function PayoutsRows({
  requestedPayout,
  disabled,
  isEditorOrAdmin,
  page,
  action = false,
}) {
  const classes = useRowStyles();
  const dispatch = useDispatch();
  const {
    status,
    amount,
    updated_at: requestedDate,
    payoutAccount,
    account,
    id,
  } = requestedPayout;
  const {
    payment_system: paymentSystem,
    payment_account: paymentAccount,
  } = payoutAccount;
  const {
    first_name: firstName,
    last_name: lastName,
    email,
    profile,
  } = account;
  const { username } = profile;

  const button = classNames(styles.request_btn, {
    [styles.disabled]: disabled,
  });

  function getUserName() {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }

    return `${username}`;
  }

  function getRequestedData() {
    if (requestedDate) {
      return moment(requestedDate).format('DD.MM.YYYY');
    }

    return '';
  }

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell className={styles.body} align={'center'}>
          {getUserName()}
        </TableCell>
        <TableCell className={styles.body} align={'center'}>
          {email}
        </TableCell>
        <TableCell className={styles.body} align={'center'}>
          {paymentSystem}
        </TableCell>
        <TableCell className={styles.body} align={'center'}>
          {paymentAccount}
        </TableCell>
        <TableCell className={styles.body} align={'center'}>
          {status}
        </TableCell>
        <TableCell className={styles.body} align={'center'}>
          {amount} €
        </TableCell>
        <TableCell className={styles.body} align={'center'}>
          {getRequestedData()}
        </TableCell>
        {action && isEditorOrAdmin && (
          <TableCell align={'center'}>
            <button
              type="button"
              className={button}
              // disabled={disabled}
              onClick={() =>
                dispatch(handleChangePayoutStatus(id, COMPLETED, page))
              }
            >
              Pay out
            </button>
          </TableCell>
        )}
      </TableRow>
    </>
  );
}

export default PayoutsRows;
