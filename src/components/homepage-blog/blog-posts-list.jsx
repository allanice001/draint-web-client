import { getDate, splitHtmlTag } from 'services/global';
import { HOMEPAGE_BLOG_CONTENT } from 'constants/components/home-page';
import Icon from 'components/icons';
import { Link } from 'react-router-dom';
import React from 'react';
import { getBlogUrl } from 'helpers/blog/get-blog-url';
import styles from './homepage-blog.module.scss';

const BlogPostsList = ({ list }) => {
  return (
    <>
      {list.map((post, index) => (
        <div className={styles.blog_list_wrapper} key={index}>
          <h3 className={styles.post_title}>{post.title}</h3>
          <div className={styles.blog_content}>
            <p>{splitHtmlTag(post.content)}</p>
            <Link
              className={styles.link}
              to={getBlogUrl(post.uuid, post.title, post.username)}
            >
              {HOMEPAGE_BLOG_CONTENT.link_label}
            </Link>
          </div>
          <div className={styles.blog_author}>
            <Icon.BlogAuthor className={styles.icon_author} />
            <p>{HOMEPAGE_BLOG_CONTENT.author}</p>
            <p className={styles.divider} />
            <time>{getDate(post.created_at)}</time>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogPostsList;
