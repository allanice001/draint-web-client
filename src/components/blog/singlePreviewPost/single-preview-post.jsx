import './singlePreviewPost.scss';
import * as Button from 'components/shared/button';
import { APPROVED, DISAPPROVED } from 'constants/statuses';
import { DELETE_DIALOG, PLEASE_EDIT_POST } from 'constants/blog';
import React, { useMemo, useState } from 'react';
import { deleteSpacesFromUrl, getFormattedDate } from 'services/global';
import AlertDialogDelete from 'components/alertDialog/alertDialogDelete';
import { CardMedia } from '@material-ui/core';
import { DRAINT_NAME } from 'constants/global';
import DeleteIcon from 'components/icons/delete';
import EditIcon from 'components/icons/editPencilIcon';
import { Image } from 'components/lib';
import { Link } from 'react-router-dom';
import { PostPreviewContent } from 'services/blogService';
import cx from 'classnames';
import { getBlogUrl } from 'helpers/blog/get-blog-url';
import { imageSizes } from 'constants/media-query/image-sizes';
import { permissions } from 'constants/permissions';
import staticUrls from 'constants/images/static-urls';
import styles from './singlePreviewPost.module.scss';
import { useSelector } from 'react-redux';

const SinglePostItem = ({
  post,
  deleteSinglePostBlogPost,
  handleEditModeChange,
  isDesktop,
  isAdmin,
  category,
  isAnalyst,
}) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const username =
    post?.profile?.new_permission === permissions.ADMIN ||
    post?.profile?.permission === permissions.MASTER
      ? DRAINT_NAME
      : post?.profile?.username;

  const { content } = PostPreviewContent(post);
  const { profile_id: profileId } = useSelector(store => store.user.account);

  const isOwner = profileId === post.author_profile_id;
  const isVisible = isOwner || isAdmin || post.status === APPROVED;

  const titleUrl = deleteSpacesFromUrl(post.title);

  const status = useMemo(() => {
    if (!isAdmin && !isOwner) {
      return null;
    }

    return (
      <div className={styles.status_container}>
        <span className={cx(styles.status, styles[post.status])}>
          {post.status}
          {!isAdmin && post.status === DISAPPROVED && PLEASE_EDIT_POST}
        </span>
        {category && (
          <span className={cx(styles.status, styles.category)}>{category}</span>
        )}
      </div>
    );
  }, [isAdmin, isOwner, post.status, category]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.blog_single_post}>
      <AlertDialogDelete
        openDialog={isOpenDialog}
        dialogSettings={DELETE_DIALOG}
        deleteBackground={e => {
          setIsOpenDialog(false);
          deleteSinglePostBlogPost(e);
        }}
        handleDialog={e => {
          setIsOpenDialog(false);
        }}
      />
      {((isOwner && !post.is_community) || isAdmin) && (
        <div
          className={
            isDesktop
              ? cx(styles.buttons_wrap, styles.actions)
              : styles.mob_actions
          }
        >
          {(post.status === DISAPPROVED || isAdmin) && (
            <Button.Primary
              icon={<EditIcon />}
              fill
              xs
              onClick={handleEditModeChange}
            />
          )}

          <Button.Primary
            icon={<DeleteIcon />}
            fill
            xs
            onClick={() => {
              if (!isAnalyst) {
                return setIsOpenDialog(true);
              }
            }}
          />
        </div>
      )}
      <Link to={getBlogUrl(post.uuid, titleUrl, username)}>
        <div className={styles.blog_single_post_wrapper}>
          {post.small_image && (
            <CardMedia
              className="media"
              image={post.small_image}
              title="Contemplative Reptile"
            />
          )}
          <div className={styles.content_wrapper}>
            {post.small_image && (
              <div className={styles.img_wrap}>
                <Image
                  srcSet={post.small_image}
                  alt="post featured"
                  sizes={imageSizes.ADAPTIVE}
                  defaultSrc={staticUrls.image.defaultPost}
                />
              </div>
            )}
            <div
              className={cx(styles.text_wrapper, {
                [styles.without_image]: !post.small_image,
              })}
            >
              <div className={styles.post_title_wrapper}>
                <h2 className={styles.post_title}>{post.title}</h2>
              </div>

              <time className={styles.post_date}>
                {getFormattedDate(post.created_at)}
              </time>

              <p className={styles.post_content}>{content}</p>

              {status}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SinglePostItem;
