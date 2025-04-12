import React, { useCallback } from 'react';
import {
  getMessages,
  setActiveMessage,
} from 'redux/dashboard/actions/contactToolActions';
import { useDispatch, useSelector } from 'react-redux';

import HistoryCard from '../history-card/history-card';
import ListFooter from '../shared/list-footer/list-footer';
import ListHeader from '../shared/list-header/list-header';
import SearchForm from '../shared/search-form/search-form';
import cx from 'classnames';
import styles from '../list.module.scss';

export const HistoryList = props => {
  const history = useSelector(
    store => store.dashboard.contactTool.history || []
  );
  const dispatch = useDispatch();

  const onChange = useCallback(id => dispatch(setActiveMessage(id)), [
    dispatch,
  ]);

  return (
    <div className={styles.component_wrapper}>
      <ListHeader count={history.length} title="History" countLabel="mails" />

      <SearchForm onChange={() => dispatch(getMessages())} />

      <div className={cx(styles.content)}>
        {history.map(({ id, ...message }) => (
          <HistoryCard
            key={id}
            id={id}
            data={message}
            onClick={() => onChange(id)}
          />
        ))}
      </div>

      <ListFooter
        handleCloseModal={props.handleCloseModal}
        setOpenModal={props.contactTool.setOpenModal}
        handleAddContact={props.handleAddContact}
        handleOpenModal={props.handleOpenModal}
      />
    </div>
  );
};
