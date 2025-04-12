import * as Button from 'components/shared/button/button';
import { List, Record } from 'components/shared/list';
import React, { useEffect, useState } from 'react';
import {
  deleteHashtag,
  getHashtags,
  updateHashtag,
} from 'redux/master/actions/hashtagsActions';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from 'components/icons/delete';
import EditIcon from 'components/icons/editPencilIcon';
import { HashtagForm } from './hashtag-form';
import PaginationControlled from 'components/pagination/paginationNumbers';
import cx from 'classnames';
import { reset } from 'redux-form';
import styles from './hashtags.module.scss';

export const MasterHashtags = () => {
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { hashtags, pagination } = useSelector(store => store.master.hashtags);
  const { hashtag } = useSelector(store => store?.form);
  const { account: user } = useSelector(state => state.user);

  const isSuperAdmin = user?.permission === 'master';
  const isAnalyst = user?.new_permission === 'analyst' && !isSuperAdmin;

  useEffect(() => {
    dispatch(
      getHashtags({ name: hashtag?.values?.search, page, pageSize: 48 })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  const handleDeleteHashtag = id => {
    if (isAnalyst) {
      return null;
    }

    dispatch(deleteHashtag(id, hashtag?.values?.search, page));
  };

  const handleEditHashtag = tag => {
    if (isAnalyst) {
      return null;
    }

    setSelectedHashtag(tag);
  };

  const handleAcceptEdit = () => {
    const name = hashtag?.values.name;
    if (name.length) {
      const validTag = name.toLowerCase();
      dispatch(updateHashtag(selectedHashtag.id, validTag));
    }
    setSelectedHashtag(null);
  };

  const handleShowAll = () => {
    dispatch(reset('hashtag'));
    setPage(1);
    dispatch(getHashtags());
  };

  const findHashtags = () => {
    const searchName = hashtag?.values?.search;
    dispatch(getHashtags({ name: searchName }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <Button.Primary sm className={styles.showAll} onClick={handleShowAll}>
          Show All
        </Button.Primary>
        <HashtagForm search={true} findHashtags={findHashtags} />
      </div>
      <List className={styles.list}>
        {hashtags.map(item => (
          <Record
            key={item.id}
            className={cx(styles.item, {
              [styles['active']]: item.id === selectedHashtag?.id,
            })}
          >
            <div className={cx(styles.container)}>
              {selectedHashtag?.id === item.id ? (
                <HashtagForm
                  initialValues={{
                    name: selectedHashtag?.name,
                  }}
                  handleAcceptEdit={handleAcceptEdit}
                  handleCancelEdit={() => setSelectedHashtag(null)}
                />
              ) : (
                <>
                  <span className={styles.tag}>#{item.name}</span>
                  <Button.Primary
                    icon={<EditIcon />}
                    fill
                    xs
                    onClick={() => handleEditHashtag(item)}
                  />
                  <Button.Primary
                    icon={<DeleteIcon />}
                    fill
                    xs
                    onClick={() => handleDeleteHashtag(item.id)}
                  />
                </>
              )}
            </div>
          </Record>
        ))}
      </List>
      {pagination && (
        <PaginationControlled
          handler={setPage}
          page={page}
          style={['dark']}
          totalPages={pagination.pageCount}
        />
      )}
    </div>
  );
};
