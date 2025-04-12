import { APPROVED, DISAPPROVED, WAITING } from 'constants/statuses';
import ArtworkVerificationButtons from 'components/artwork/artwork-master-card/artwork-verify-buttons';
import Icons from 'components/icons';
import { Post } from './post';
import { Primary } from 'components/shared/button';
import React from 'react';
import { UploadCardButton } from 'components/shared/upload-card-button/upload-card-button';
import cx from 'classnames';
import styles from './atelier-posts.module.scss';

export const AtelierPosts = React.memo(
  ({
    username,
    posts,
    onAddNewPost,
    isOwner,
    isAdmin,
    onStatusButtonClick,
    isAdminPage,
    onDeletePostClick,
    handleCategoryChange,
    status,
    canEdit,
  }) => {
    const canAddNewPost = isOwner && posts.length !== 6 && status !== WAITING;
    const canAddToPublic = post => {
      return !post.public && post.status === APPROVED && post.small_image;
    };

    if (!isOwner && !posts.length) {
      return null;
    }

    return (
      <div className={styles.wrapper}>
        {posts.map(post => {
          return (
            <div
              className={cx(styles.post, {
                [styles.upload]: post.upload,
              })}
            >
              <Post
                isAdmin={isAdmin}
                isAdminPage={isAdminPage}
                canEdit={canEdit}
                username={username}
                onDeletePostClick={onDeletePostClick}
                {...post}
              />
              {isAdminPage && (
                <>
                  <span className={cx(styles.status, styles[post.status])}>
                    {post.status}
                    {!isAdmin &&
                      post.status === DISAPPROVED &&
                      ', please edit post'}
                  </span>
                  <div
                    className={cx(styles.verify, {
                      [styles.empty]: !post?.tags,
                    })}
                  >
                    <ArtworkVerificationButtons
                      id={{ id: post.aid, postId: post?.id }}
                      isBlog={true}
                      onVerify={onStatusButtonClick}
                      disabled={false}
                    />
                    {canAddToPublic(post) && (
                      <Primary
                        className={styles.category}
                        onClick={() =>
                          handleCategoryChange({
                            id: post.aid,
                            postId: post.id,
                          })
                        }
                      >
                        <div className={styles.helperText}>
                          Add&nbsp;to&nbsp;public&nbsp;page
                        </div>
                        <Icons.Add />
                      </Primary>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
        {canAddNewPost && (
          <div className={styles.addNewPost}>
            <UploadCardButton onClick={onAddNewPost}>
              Click here to <br /> upload new post
            </UploadCardButton>
          </div>
        )}
      </div>
    );
  }
);
