import * as Button from 'components/shared/button/button';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import FileIcon from 'components/icons/file';
import Pagination from 'components/collector/collector-offers/components/pagination/pagination';
import React from 'react';
import formatDate from 'services/billing/format-date';
import { makeStyles } from '@material-ui/core/styles';
import styles from './billing-history-table.module.scss';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export function BillingHistoryTable({
  history,
  pagination,
  handlePage,
  loading,
}) {
  const classesRow = useRowStyles();

  function handleInvoicePDF(path) {
    window.open(path, '_blank');
  }

  return (
    <TableContainer component={Paper}>
      <Table className={styles.table_wrapper}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.tCellHeader}>Date</TableCell>
            <TableCell className={styles.tCellHeader}>Type</TableCell>
            <TableCell className={styles.tCellHeader}>Order #</TableCell>
            <TableCell className={styles.tCellHeader}>Plan</TableCell>
            <TableCell className={styles.tCellHeader}>Amount</TableCell>
            <TableCell className={styles.tCellHeader}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map(row => (
            <TableRow key={row.id} className={classesRow.root}>
              <TableCell className={styles.tCell}>
                {formatDate(row.start_date)}
              </TableCell>
              <TableCell className={styles.tCell}>
                {row.billing_reason}
              </TableCell>
              <TableCell className={styles.tCell}>
                {row.invoice_number}
              </TableCell>
              <TableCell className={styles.tCell}>{row.plan_name}</TableCell>
              <TableCell className={styles.tCell}>{row.amount}</TableCell>
              <TableCell className={styles.tCell}>
                <div className={styles.tButtons}>
                  <Button.Secondary
                    sm
                    icon={<FileIcon />}
                    iconPlacement={Button.IconPlacement.Right}
                    onClick={() => handleInvoicePDF(row.invoice_url)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={styles.pagination_wrapper}>
        {Boolean(pagination.pageCount > 1) && (
          <Pagination
            page={pagination.page}
            pages={pagination.pageCount}
            setPage={handlePage}
            countForm
            pageLoad={loading}
            type={'billing-history'}
          />
        )}
      </div>
    </TableContainer>
  );
}
