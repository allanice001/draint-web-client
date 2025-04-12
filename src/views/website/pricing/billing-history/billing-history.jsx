import * as Button from 'components/shared/button';
import { List, Record } from 'components/shared/list';
import React, { useMemo } from 'react';
import { BillingHistoryTable } from '../billing-history-table/billing-history-table';
import FileIcon from 'components/icons/file';
import Pagination from 'components/collector/collector-offers/components/pagination/pagination';
import cx from 'classnames';
import formatDate from 'services/billing/format-date';
import styles from './billing-history.module.scss';
import { useBilling } from 'hooks/use-billing';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function HistoryDesktop({
  history,
  pagination,
  handlePage,
  loading,
  formatDate,
}) {
  return (
    <div className={styles.wrapper}>
      <BillingHistoryTable
        history={history}
        pagination={pagination}
        handlePage={handlePage}
        loading={loading}
        formatDate={formatDate}
      />
    </div>
  );
}

const HistoryMobile = ({ history, pagination, handlePage, loading }) => {
  function handleInvoicePDF(path) {
    window.open(path, '_blank');
  }

  return (
    <List className={styles.list}>
      {history.map(item => (
        <Record className={styles.item} key={item.id}>
          <div className={styles.itemHeader}>
            <h4>{item.billing_reason}</h4>
            <time>
              <b>{formatDate(item.start_date)}</b>
            </time>
          </div>

          <table className={styles.historyTable}>
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Plan</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{item.invoice_number}</td>
                <td>{item.plan_name}</td>
                <td>&euro;{item.amount}</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.itemFooter}>
            <Button.Secondary
              sm
              icon={<FileIcon />}
              iconPlacement={Button.IconPlacement.Right}
              onClick={() => handleInvoicePDF(item.invoice_url)}
            >
              View PDF
            </Button.Secondary>
          </div>
        </Record>
      ))}

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
    </List>
  );
};

export const BillingHistory = () => {
  const { billingHistory, pages, handlePage, loading } = useBilling();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const content = useMemo(() => {
    if (isDesktop) {
      return (
        <HistoryDesktop
          history={billingHistory}
          pagination={pages}
          handlePage={handlePage}
          loading={loading}
        />
      );
    }

    return (
      <HistoryMobile
        history={billingHistory}
        pagination={pages}
        handlePage={handlePage}
        loading={loading}
      />
    );
  }, [isDesktop, billingHistory, pages, handlePage, loading]);

  return (
    !!billingHistory.length && (
      <div className={styles.root}>
        <h2 className={cx(styles.title)}>Billing history</h2>

        {content}
      </div>
    )
  );
};
