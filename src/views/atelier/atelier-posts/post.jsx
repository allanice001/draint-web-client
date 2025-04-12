import * as Button from 'components/shared/button';

import { List, Record } from 'components/shared/list';

import { ATELIER } from 'constants/routes/masterModule/dashboard';
import { BLOG } from 'constants/routes/userModule/gallery';
import DeleteIcon from 'components/icons/delete';
import { Image } from 'components/lib';
import { KEYWORD } from 'constants/blog';
import { Link } from 'react-router-dom';
import React from 'react';
import { Tag } from 'components/shared/tag/tag';
import cx from 'classnames';
import { getArtistAtelierURL } from 'helpers/artist/get-artist-atelier-url';
import { getSrcValue } from 'helpers/atelier/get-src-value';
import staticUrls from 'constants/images/static-urls';
import styles from './atelier-posts.module.scss';
import { useHistory } from 'react-router';

export const Post = React.memo(
  ({
    small_image,
    content,
    tags,
    username,
    id,
    isAdmin,
    isAdminPage,
    onDeletePostClick,
    canEdit,
  }) => {
    const history = useHistory();

    const onTagClick = keyword => {
      history.push(`${BLOG + ATELIER}?${KEYWORD}=${keyword}`);
    };

    return (
      <>
        <Link to={getArtistAtelierURL(username)}>
          <Image
            className={styles.image}
            srcSet={getSrcValue(small_image)}
            maxSize="md"
            defaultSrc={staticUrls.image.defaultPost}
            alt="Atelier"
          />
          <p className={styles.description}>
            {content || 'User doesn’t have a post yet'}
          </p>
        </Link>
        {tags && (
          <List
            className={cx(styles.list, {
              [styles.empty]: !tags.length,
            })}
            horizontal
          >
            {tags.map(tag => (
              <Record key={tag.id}>
                <Tag
                  onClick={() => onTagClick(tag.name)}
                  className={isAdmin && styles.buttons}
                >
                  {tag.name}
                </Tag>
              </Record>
            ))}
          </List>
        )}
        {canEdit && !isAdminPage && (
          <Button.Warning
            sm
            className={styles.delete}
            icon={<DeleteIcon />}
            onClick={() => onDeletePostClick(id)}
          />
        )}
      </>
    );
  }
);
