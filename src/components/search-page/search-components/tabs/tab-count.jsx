import React from 'react';
import { getShowResultFor } from 'redux/search/selectors';
import styles from '../../search-page.module.scss';
import { useSelector } from 'react-redux';

export const TabCount = ({ count, type }) => {
  const showResultFor = useSelector(getShowResultFor);
  const query = useSelector(store => store.filters.provedSearchQuery);

  const body = count ? <span className={styles.counter}>({count})</span> : null;

  if (!!query) {
    return body;
  }

  if (type === showResultFor) {
    return body;
  }

  return null;
};
