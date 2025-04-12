import { Image } from 'components/image/image';
import { Link } from 'react-router-dom';
import { PostPreviewContent } from 'services/blogService';
import React from 'react';
import { deleteSpacesFromUrl } from 'services/global';
import { getBlogUrl } from 'helpers/blog/get-blog-url';
import { imageSizes } from 'constants/media-query/image-sizes';
import staticUrls from 'constants/images/static-urls';
import styles from './blog-page-main-post.module.scss';

export const BlogPageMainPost = ({
  src,
  title,
  description,
  postId,
  username,
}) => {
  const { content } = PostPreviewContent({ content: description });

  return (
    <Link
      to={getBlogUrl(postId, deleteSpacesFromUrl(title), username)}
      className={styles.root}
    >
      <Image
        className={styles.image}
        srcSet={src}
        sizes={imageSizes.LG}
        defaultSrc={staticUrls.image.defaultPost}
        alt=""
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{content}</p>
    </Link>
  );
};
