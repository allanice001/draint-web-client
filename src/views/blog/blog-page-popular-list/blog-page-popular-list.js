import { List, Record } from 'components/shared/list';
import { deleteSpacesFromUrl, getFormattedDate } from 'services/global';

import { DRAINT_NAME } from 'constants/global';
import { Link } from 'react-router-dom';
import React from 'react';
import { getBlogUrl } from 'helpers/blog/get-blog-url';
import { permissions } from 'constants/permissions';
import staticUrls from 'constants/images/static-urls';
import styles from './blog-page-popular-list.module.scss';

export const BlogPagePopularList = ({ list }) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Most popular</h2>
      <List>
        {list.map(post => {
          const username =
            post.profile.permission !== permissions.MASTER
              ? post.profile.username
              : DRAINT_NAME;

          return (
            <Record className={styles.item} key={post.uuid}>
              <img
                className={styles.image}
                srcSet={post.small_image || staticUrls.image.defaultPost}
                alt=""
              />

              <Link
                to={getBlogUrl(
                  post.uuid,
                  deleteSpacesFromUrl(post.title),
                  username
                )}
                className={styles.content}
              >
                <h3 className={styles.label}>{post.title}</h3>
                <time className={styles.time}>
                  {getFormattedDate(post.created_at)}
                </time>
              </Link>
            </Record>
          );
        })}
      </List>
    </div>
  );
};
