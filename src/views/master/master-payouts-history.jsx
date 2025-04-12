import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import {
  getRequestedPayouts,
  handleSetPage,
} from 'redux/master/actions/payouts-actions';
import { useDispatch, useSelector } from 'react-redux';

import { EMPTY_REQUESTED_PAYOUTS_HISTORY } from 'constants/empty-message';
import EmptyMessage from './layouts/payouts-requests/empty-mesage';
import PaginationControlled from 'components/pagination/paginationNumbers';
import PayoutsRequestsNav from 'components/nav/sub/payouts-requests';
import PayoutsRows from './layouts/payouts-requests/payouts-rows';
import { roles } from 'helpers/get-role';
import styles from './master-payouts-requests.module.scss';

function MasterPayoutsHistory() {
  const dispatch = useDispatch();

  const { permission, new_permission, id: accountId } = useSelector(
    store => store.user.account
  );

  const { page, pages, payoutsHistory, fetching } = useSelector(
    store => store.master.payoutsRequests
  );

  const role = roles({ permission, new_permission });

  useEffect(() => {
    if ((role.isEditorOrAdmin || role.isAnalyst) && accountId) {
      dispatch(getRequestedPayouts(page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, accountId, permission, new_permission, page]);

  function handlePageChange(pageValue) {
    dispatch(handleSetPage(pageValue));
  }

  return (
    <>
      <PayoutsRequestsNav />

      <PaginationControlled
        style={['dark']}
        totalPages={pages}
        page={page}
        handler={handlePageChange}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={styles.header} align={'center'}>
                Seller
              </TableCell>
              <TableCell className={styles.header} align={'center'}>
                Email
              </TableCell>
              <TableCell className={styles.header} align={'center'}>
                Payment System
              </TableCell>
              <TableCell className={styles.header} align={'center'}>
                Payment Account
              </TableCell>
              <TableCell className={styles.header} align={'center'}>
                Status
              </TableCell>
              <TableCell className={styles.header} align={'center'}>
                Amount
              </TableCell>
              <TableCell className={styles.header} align={'center'}>
                Payout Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(payoutsHistory.length) &&
              payoutsHistory.map(payoutHistory => (
                <PayoutsRows
                  key={payoutHistory.id}
                  requestedPayout={payoutHistory}
                  page={page}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!Boolean(payoutsHistory.length) && !fetching && (
        <EmptyMessage message={EMPTY_REQUESTED_PAYOUTS_HISTORY} />
      )}
    </>
  );
}

export default MasterPayoutsHistory;
