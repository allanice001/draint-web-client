import {
  PAGE_SCROLL_DEFAULT,
  PAGE_SCROLL_WITH_ARTWORKS,
} from 'constants/components/subscribed-artist';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import { LIST_OF_PAGE_SIZE } from 'constants/components/homepage';
import Pagination from 'components/collector/collector-offers/components/pagination/pagination';
import SubscribedArtistList from 'components/collector/collector-subscribed/subscriptions-list';
import classnames from 'classnames';
import { getSubscribedArtist } from 'redux/dashboard/actions/gallaryActions';
import { pageScroll } from 'services/pageScroller';
import styles from './collector-subscriptions.module.scss';

const Analytic = AnalyticHelper.create();

const CollectorSubscriptions = () => {
  const [pageSize, setPageSize] = useState(6);
  const titleClasses = classnames('group-title', styles.title);
  const state = useSelector(store => store);
  const { account = {} } = state.user;
  const accountLoading = account.loading;
  const artworks = state.dashboard.gallery.artworks || [];
  const artists = state.dashboard.gallery.artistSubscribed || [];
  const pagination = state.dashboard.gallery.subscriptionsPagination;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscribedArtist());
    Analytic.createEvent('PageView');
  }, [dispatch]);

  const subscriptionsView = artists.map(subscription => (
    <li className={styles.artwork} key={subscription.id}>
      <SubscribedArtistList subscription={subscription} />
    </li>
  ));

  function handlePage(page) {
    pageScroll(
      artworks.length ? PAGE_SCROLL_WITH_ARTWORKS : PAGE_SCROLL_DEFAULT
    );
    dispatch(getSubscribedArtist(page, pageSize));
  }

  function handelPageSize(limit) {
    pageScroll(
      artworks.length ? PAGE_SCROLL_WITH_ARTWORKS : PAGE_SCROLL_DEFAULT
    );
    setPageSize(limit);
    dispatch(getSubscribedArtist(1, limit));
  }

  if (accountLoading) return null;

  return (
    <section className={styles.subscriptions}>
      <div className="container">
        <h3 className={titleClasses}>Subscribed artists</h3>
        <ul>{subscriptionsView}</ul>
        {pagination.rowCount > 6 && (
          <div className={styles.pagination_wrapper}>
            <Pagination
              listOfPageSize={LIST_OF_PAGE_SIZE}
              page={pagination.page}
              maxCount={pagination.rowCount}
              pages={pagination.pageCount}
              setPage={page => {
                handlePage(page);
              }}
              setCount={limit => {
                handelPageSize(limit);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CollectorSubscriptions;
