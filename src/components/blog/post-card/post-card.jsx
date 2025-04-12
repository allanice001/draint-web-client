import { Image } from 'components/image/image';
import { Link } from 'react-router-dom';
import { PostPreviewContent } from 'services/blogService';
import React from 'react';
import cx from 'classnames';
import { getBlogUrl } from 'helpers/blog/get-blog-url';
import { getImage } from 'services/blogService';
import { imageSizes } from 'constants/media-query/image-sizes';
import { roles } from 'helpers/get-role';
import staticUrls from 'constants/images/static-urls';
import styles from './post-card.module.scss';

export const PostCard = ({ post, root_styles, fullName, username }) => {
  const { content } = PostPreviewContent(post);

  const profileRole =
    post &&
    roles({
      permission: post.profile.permission,
      new_permission: post.profile.new_permission,
    });

  const isAdminRole =
    profileRole?.isSuperAdmin || profileRole?.isEditor || profileRole?.isAdmin;

  return (
    <div className={cx(styles.post_card, root_styles.posts)}>
      <Link to={getBlogUrl(post.uuid, post.title, username)}>
        <div className={styles.featured_image}>
          <Image
            alt={post.title}
            srcSet={getImage(post)}
            sizes={imageSizes.ADAPTIVE}
            defaultSrc={staticUrls.image.defaultPost}
            title={post.title}
          />
        </div>
        <div className={styles.card_content}>
          <h2 className={styles.title}>{post.title}</h2>
          {!isAdminRole && <span className={styles.author}>{fullName}</span>}
          <div className={styles.post_content}>{content}</div>
        </div>
      </Link>
    </div>
  );
};
