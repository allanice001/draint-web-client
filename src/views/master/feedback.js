import * as Button from 'components/shared/button';

import { Card, CardContent } from '@material-ui/core';
import React, { useEffect } from 'react';
import {
  deleteFeedback,
  getFeedback,
  markAsRead,
  setDateFilter,
  setFilter,
  setPage,
} from 'redux/master/actions/feedbackActions';
import { useDispatch, useSelector } from 'react-redux';

import Icons from 'components/icons';
import { Link } from 'react-router-dom';
import MasterDateFilter from 'components/filters/masterDateFilter';
import MasterFeedbackFilter from 'components/filters/masterFeedbackFilter';
import { MasterFeedbackNav } from 'components/nav/sub/masterFeedback';
import PaginationControlled from 'components/pagination/paginationNumbers';
import { Spinner } from 'components/lib';
import cx from 'classnames';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getFullName } from 'services/global';
import moment from 'moment';
import styles from './feedback.module.scss';

const getDate = date => moment(date).format('YYYY/MM/DD hh:mm a');

const getTypeText = type => type.replace(/_/g, ' ');

const FeedbackCard = ({ data, handleDelete, handleMarkAsRead, isAnalyst }) => {
  const {
    id,
    first_name,
    last_name,
    is_username,
    email,
    type,
    message,
    read,
    created_at,
    mark,
    username,
  } = data;

  return (
    <Card className={styles.card__wrapper}>
      <CardContent className={cx(styles.card, { [styles.read]: read })}>
        <div className={styles.header}>
          <table>
            <tbody>
              <tr>
                <td>Author</td>
                <td>
                  <Link to={getArtistGalleryURL(username)}>
                    {getFullName(first_name, last_name, username, is_username)}
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <a href={`mailto:${email}`}>{email}</a>
                </td>
              </tr>
              <tr>
                <td>User mark</td>
                <td>{+mark === 0 ? "Isn't specified" : mark}</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.type}>{getTypeText(type)}</div>
        </div>

        <div className={styles.body}>{message}</div>

        <div className={styles.footer}>
          <time className={styles.created_date}>{getDate(created_at)}</time>

          <div className={styles.actions}>
            <div className={styles.created_date}>
              {read ? 'Already read' : 'Mark as "read"'}
            </div>

            {!read && !isAnalyst && (
              <Button.Primary
                xs
                onClick={() => handleMarkAsRead(id, read)}
                icon={<Icons.Check />}
              />
            )}
            {!isAnalyst && (
              <Button.Danger
                xs
                onClick={() => handleDelete(id)}
                icon={<Icons.Delete />}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MasterFeedback = () => {
  const dispatch = useDispatch();
  const {
    loading,
    feedback,
    date,
    onlyNew,
    filter,
    totalPages,
    page,
    totalFeedback,
  } = useSelector(store => store.master.feedback);

  const { account: user } = useSelector(state => state.user);

  const isSuperAdmin = user?.permission === 'master';
  const isAnalyst = user?.new_permission === 'analyst' && !isSuperAdmin;

  const baseFilters = {
    onlyNew,
    filter,
    date,
    page,
  };

  useEffect(() => {
    dispatch(getFeedback());
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deleteFeedback(id, feedback));
  };

  const handleMarkAsRead = (id, read) => {
    dispatch(markAsRead(id, !read, feedback));
  };

  const handleSetFilter = (type, value) => {
    dispatch(setFilter(type, value));
    dispatch(getFeedback({ ...baseFilters, [type]: value, page: 1 }));
    dispatch(setPage(1));
  };

  const handleDateOptionChange = (type, value) => {
    const newDate = { ...date, [type]: value };
    dispatch(setDateFilter(newDate));
    dispatch(getFeedback({ ...baseFilters, date: newDate, page: 1 }));
    dispatch(setPage(1));
  };

  const handlePageChange = page => {
    dispatch(setPage(page));
    dispatch(getFeedback({ ...baseFilters, page }));
  };

  return (
    <div className={styles.wrapper}>
      <MasterFeedbackNav />
      <div className={styles.row}>
        <div className={styles.filters}>
          <MasterFeedbackFilter
            loading={loading}
            onlyNew={onlyNew}
            filter={filter}
            setFilter={handleSetFilter}
            count={totalFeedback}
          />
          <MasterDateFilter
            loading={loading}
            dateSelected={date.dateSelected}
            from={date.from}
            to={date.to}
            onDateSelected={val => handleDateOptionChange('dateSelected', val)}
            changeFrom={val => handleDateOptionChange('from', val)}
            changeTo={val => handleDateOptionChange('to', val)}
          />
        </div>
        <div className={styles.content}>
          <PaginationControlled
            style={['dark']}
            totalPages={totalPages}
            page={page}
            handler={handlePageChange}
          />
          {loading ? (
            <Spinner full />
          ) : (
            feedback.map(el => (
              <FeedbackCard
                data={el}
                handleDelete={handleDelete}
                handleMarkAsRead={handleMarkAsRead}
                isAnalyst={isAnalyst}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterFeedback;
