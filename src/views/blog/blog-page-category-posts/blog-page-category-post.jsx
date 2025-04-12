import { AVATAR_PARAM, DRAINT_NAME } from 'constants/global';
import {
  deleteSpacesFromUrl,
  getFormattedDate,
  getUserName,
} from 'services/global';
import { Image } from 'components/image/image';
import { Link } from 'react-router-dom';
import { MY_ATELIER_TITLE } from 'constants/atelier';
import { PostPreviewContent } from 'services/blogService';
import React from 'react';
import { Record } from 'components/shared/list';
import { getArtistAtelierURL } from 'helpers/artist/get-artist-atelier-url';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getBlogUrl } from 'helpers/blog/get-blog-url';
import { roles } from 'helpers/get-role';
import staticUrls from 'constants/images/static-urls';
import styles from './blog-page-category-posts.module.scss';

const formatDescription = text => PostPreviewContent({ content: text });

export const BlogPageCategoryPost = ({ post, category, defaultBlogImage }) => {
  const profileRole =
    post &&
    roles({
      permission: post.profile.permission,
      new_permission: post.profile.new_permission,
    });

  const isAdminRole =
    profileRole?.isSuperAdmin || profileRole?.isEditor || profileRole?.isAdmin;

  const isAtelier = category.title === MY_ATELIER_TITLE;

  const username = !isAdminRole ? post.profile.username : DRAINT_NAME;

  const linkPath = !isAtelier
    ? getBlogUrl(post.uuid, deleteSpacesFromUrl(post.title), username)
    : getArtistAtelierURL(post.profile.username);

  return (
    <Record className={styles.item} key={post.uuid || post.id}>
      <div className={styles.post}>
        <Link to={linkPath}>
          <Image
            className={styles.image}
            srcSet={post.small_image || defaultBlogImage}
            alt="post featured"
            defaultSrc={staticUrls.image.defaultPost}
          />
        </Link>
        <div className={styles.content}>
          {!isAtelier && (
            <Link to={linkPath}>
              <h3 className={styles.label}>{post.title}</h3>
            </Link>
          )}
          <p className={styles.description}>
            {!isAtelier
              ? formatDescription(post.content).content
              : post.content}
          </p>
          <Link
            to={
              !isAdminRole &&
              (!isAtelier
                ? getArtistGalleryURL(post.profile.username)
                : getArtistAtelierURL(post.profile.username))
            }
            className={styles.author}
          >
            {post.profile.small_avatar && !isAdminRole && (
              <Image
                className={styles.avatar}
                srcSet={post.profile.small_avatar}
                alt="profile"
                width={AVATAR_PARAM}
                height={AVATAR_PARAM}
                defaultSrc={staticUrls.image.defaultArtist}
              />
            )}
            <div>
              {post.profile && !isAdminRole && (
                <div className={styles.name}>{getUserName(post.profile)}</div>
              )}
              <time className={styles.time}>
                {getFormattedDate(post.created_at)}
              </time>
            </div>
          </Link>
        </div>
      </div>
    </Record>
  );
};
