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

import { EMPTY_REQUESTED_PAYOUTS } from 'constants/empty-message';
import EmptyMessage from './layouts/payouts-requests/empty-mesage';
import PaginationControlled from 'components/pagination/paginationNumbers';
import PayoutsRequestsNav from 'components/nav/sub/payouts-requests';
import PayoutsRows from './layouts/payouts-requests/payouts-rows';
import { roles } from 'helpers/get-role';
import styles from './master-payouts-requests.module.scss';

function MasterPayoutsRequests() {
  const dispatch = useDispatch();

  const { permission, new_permission, id: accountId } = useSelector(
    store => store.user.account
  );
  const { page, pages, requestedPayouts, fetching } = useSelector(
    store => store.master.payoutsRequests
  );

  const role = roles({ permission, new_permission });

  useEffect(() => {
    if ((role.isEditorOrAdmin || role.isAnalyst) && accountId) {
      dispatch(getRequestedPayouts(page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, permission, new_permission, page]);

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
                Requested Date
              </TableCell>
              <TableCell className={styles.header} align={'center'}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(requestedPayouts.length) &&
              requestedPayouts.map(requestedPayout => (
                <PayoutsRows
                  isEditorOrAdmin={role.isEditorOrAdmin}
                  key={requestedPayout.id}
                  requestedPayout={requestedPayout}
                  page={page}
                  action
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!Boolean(requestedPayouts.length) && !fetching && (
        <EmptyMessage message={EMPTY_REQUESTED_PAYOUTS} />
      )}
    </>
  );
}

export default MasterPayoutsRequests;
