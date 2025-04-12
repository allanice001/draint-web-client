import { getDate, getFullName, splitHtmlTag } from 'services/global';
import Icon from '../icons';
import { Image } from 'components/lib';
import React from 'react';
import cx from 'classnames';
import { getBlogUrl } from 'helpers/blog/get-blog-url';
import { imageSizes } from 'constants/media-query/image-sizes';
import staticUrls from 'constants/images/static-urls';
import styles from './blog-posts-card.module.scss';

const BlogPostsCard = ({ post, index }) => {
  return (
    <div className={styles.card_wrapper} key={index}>
      <div className={styles.card_img}>
        <Image
          srcSet={post.primary_image}
          maxSize={imageSizes.LG}
          defaultSrc={staticUrls.image.defaultPost}
          alt="Blog post"
        />
      </div>
      <div className={styles.card_content_wrapper}>
        <div className={styles.card_content}>
          <div className={styles.date}>
            <Icon.Calendar className={styles.icon_calendar} />
            <time>{getDate(post.created_at)}</time>
          </div>
          <h3 className={styles.post_title}>
            <a href={getBlogUrl(post.uuid, post.title, post.username)}>
              {post.title}
            </a>
          </h3>
          <div className={styles.author}>
            <Icon.BlogAuthor className={styles.icon_author} />
            <p>
              {'By ' +
                getFullName(
                  post.first_name,
                  post.last_name,
                  post.username,
                  post.is_username
                )}
            </p>
          </div>
          <div className={styles.blog_content}>
            <p>{splitHtmlTag(post.content)}</p>
          </div>
        </div>
        <div className={styles.card_footer}>
          <div className={styles.instagram}>
            <a
              className={cx({ [styles.insta_link]: !post.instagram })}
              href={post.instagram}
            >
              <Icon.Instagram className={styles.icon_instagram} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostsCard;
