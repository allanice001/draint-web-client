import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './payout-history-content.module.scss';

const useStyles = makeStyles({
  table: {
    minWidth: 375,
  },
});

function PayoutsHistoryContent({ payoutsHistory }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.header} align="center">
              Payment System
            </TableCell>
            <TableCell className={styles.header} align="center">
              Payment Account
            </TableCell>
            <TableCell className={styles.header} align="center">
              Status
            </TableCell>
            <TableCell className={styles.header} align="center">
              Amount
            </TableCell>
            <TableCell className={styles.header} align="center">
              Requested Date
            </TableCell>
            <TableCell className={styles.header} align="center">
              Payout Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payoutsHistory.map(row => (
            <TableRow key={row.created_at}>
              <TableCell className={styles.body} align="center">
                {row.payment_system}
              </TableCell>
              <TableCell className={styles.body} align="center">
                {row.payment_account}
              </TableCell>
              <TableCell className={styles.body} align="center">
                {row.status}
              </TableCell>
              <TableCell className={styles.body} align="center">
                {row.amount}
              </TableCell>
              <TableCell className={styles.body} align="center">
                {moment(row.created_at).format('DD.MM.YYYY')}
              </TableCell>
              <TableCell className={styles.body} align="center">
                {moment(row.updated_at).format('DD.MM.YYYY')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function mapStateToProps(store) {
  const {
    dashboard: { sales },
  } = store;

  return {
    payoutsHistory: sales.payoutsOrders.payoutHistory,
  };
}

export default connect(mapStateToProps, undefined)(PayoutsHistoryContent);
